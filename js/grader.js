/**
 * Blockly Games 1 - Auto-grader.
 *
 * Loads a student's exported puzzleN.json files and grades them against the
 * answer key in data.js.  The grade is split equally across the 8 puzzles, and
 * equally across the blocks within each puzzle:
 *
 *   puzzleScore = correctUnits / totalUnits          (0 .. 1)
 *   finalGrade  = average(puzzleScore over all 10)  (a missing file scores 0)
 *
 * A gradable unit is each answer-field drop-down, each picture, and each trait.
 */
'use strict';

(function() {
  const t = function(v) { return window.I18N.t(v); };
  const msg = function(k, p) { return window.I18N.msg(k, p); };

  // level (1-based) -> graded result, for files that have been loaded.
  const loaded = {};
  // Student identity captured from the loaded files.
  const student = {id: '', name: ''};

  /** Authoritatively grade one parsed puzzle file against the answer key. */
  function gradeFile(fileObj) {
    const level = fileObj.puzzle;
    const key = PUZZLES[level - 1];
    if (!key) {
      return null;
    }
    const items = key.items;
    const nItems = items.length;

    const fileItems = {};
    const filePics = {};
    const fileTraits = {};
    for (const b of (fileObj.blocks || [])) {
      if (b.kind === 'item') {
        fileItems[b.item] = b;
      } else if (b.kind === 'picture') {
        filePics[b.item] = b;
      } else if (b.kind === 'trait') {
        fileTraits[b.item + '_' + b.trait] = b;
      }
    }

    let total = 0;
    let correct = 0;

    // Answer fields: each drop-down is graded separately.
    for (let i = 0; i < nItems; i++) {
      const b = fileItems[i];
      for (const attr of key.attributes) {
        total++;
        if (b && b.answers &&
            b.answers[attr.key] === items[i].attrs[attr.key]) {
          correct++;
        }
      }
    }
    // Pictures: must be plugged into their own item.
    for (let i = 0; i < nItems; i++) {
      total++;
      const b = filePics[i];
      if (b && b.pluggedInto === i) {
        correct++;
      }
    }
    // Traits: must be stacked under their own item.
    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < items[i].traits.length; j++) {
        total++;
        const b = fileTraits[i + '_' + j];
        if (b && b.under === i) {
          correct++;
        }
      }
    }

    return {level: level, total: total, correct: correct, topic: key.topic};
  }

  function readFile(file) {
    return new Promise(function(resolve) {
      const reader = new FileReader();
      reader.onload = function() {
        try {
          const obj = JSON.parse(reader.result);
          if (obj && Number.isInteger(obj.puzzle)) {
            resolve(obj);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      };
      reader.onerror = function() { resolve(null); };
      reader.readAsText(file);
    });
  }

  async function handleFiles(fileList) {
    const files = Array.from(fileList);
    for (const f of files) {
      const obj = await readFile(f);
      if (obj) {
        if (obj.studentId) {
          student.id = String(obj.studentId);
        }
        if (obj.fullName) {
          student.name = String(obj.fullName);
        }
        const graded = gradeFile(obj);
        if (graded) {
          loaded[graded.level] = graded;
        }
      }
    }
    renderReport();
  }

  function computeGrade() {
    const n = PUZZLES.length;
    const rows = [];
    let sumScore = 0;
    for (let level = 1; level <= n; level++) {
      const g = loaded[level];
      const score = g ? (g.total ? g.correct / g.total : 0) : 0;
      sumScore += score;
      rows.push({
        level: level,
        topic: PUZZLES[level - 1].topic,
        present: !!g,
        correct: g ? g.correct : 0,
        total: g ? g.total : 0,
        score: score,
      });
    }
    const percent = (sumScore / n) * 100;
    return {rows: rows, percent: percent, outOf10: percent / 10, weight: 100 / n};
  }

  function renderReport() {
    const grade = computeGrade();
    const hasAny = Object.keys(loaded).length > 0;

    const si = document.getElementById('studentInfo');
    if (si) {
      if (student.name || student.id) {
        si.textContent = msg('studentLabel') + ': ' +
            (student.name || '') + (student.id ? ' (' + student.id + ')' : '');
        si.style.display = '';
      } else {
        si.style.display = 'none';
      }
    }

    const tbody = document.getElementById('reportBody');
    tbody.innerHTML = '';
    for (const r of grade.rows) {
      const tr = document.createElement('tr');
      if (!r.present) {
        tr.className = 'missing';
      }
      const blocksText = r.present ? (r.correct + ' / ' + r.total) : msg('gradeMissing');
      const scoreText = r.present ? (Math.round(r.score * 100) + '%') : '0%';
      tr.innerHTML =
        '<td>' + msg('puzzle') + ' ' + r.level + '</td>' +
        '<td>' + t(r.topic) + '</td>' +
        '<td>' + blocksText + '</td>' +
        '<td>' + scoreText + '</td>' +
        '<td>' + grade.weight.toFixed(1) + '%</td>';
      tbody.appendChild(tr);
    }

    document.getElementById('totalPercent').textContent =
        msg('gradeTotal') + ': ' + grade.percent.toFixed(1) + '%';
    document.getElementById('total10').textContent =
        msg('gradeOutOf10') + ': ' + grade.outOf10.toFixed(2) + ' / 10';

    document.getElementById('report').style.display = hasAny ? '' : 'none';
    document.getElementById('noFiles').style.display = hasAny ? 'none' : '';
    document.getElementById('downloadButton').disabled = !hasAny;
  }

  function downloadReport() {
    const grade = computeGrade();
    const report = {
      app: 'Blockly Games 1',
      studentId: student.id,
      fullName: student.name,
      gradedAt: new Date().toISOString(),
      gradingScheme: 'Equal weight per puzzle; equal weight per block within a puzzle.',
      puzzles: grade.rows.map(function(r) {
        return {
          puzzle: r.level,
          topic: r.topic.en,
          present: r.present,
          correctBlocks: r.correct,
          totalBlocks: r.total,
          puzzleScorePercent: Math.round(r.score * 1000) / 10,
        };
      }),
      finalGradePercent: Math.round(grade.percent * 100) / 100,
      finalGradeOutOf10: Math.round(grade.outOf10 * 100) / 100,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grade-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
  }

  function init() {
    document.getElementById('graderTitle').textContent = msg('graderTitle');
    document.getElementById('graderIntro').textContent = msg('graderIntro');
    document.getElementById('chooseLabel').textContent = msg('chooseFiles');
    document.getElementById('noFiles').textContent = msg('noFiles');
    document.getElementById('downloadButton').textContent = msg('downloadReport');
    document.getElementById('thPuzzle').textContent = msg('gradeColPuzzle');
    document.getElementById('thTopic').textContent = msg('gradeColTopic');
    document.getElementById('thBlocks').textContent = msg('gradeColBlocks');
    document.getElementById('thScore').textContent = msg('gradeColScore');
    document.getElementById('thWeight').textContent = msg('gradeColWeight');
    window.I18N.renderToggle(document.getElementById('langToggle'));

    const input = document.getElementById('fileInput');
    input.addEventListener('change', function() {
      handleFiles(input.files);
    });

    const drop = document.getElementById('dropzone');
    ['dragenter', 'dragover'].forEach(function(ev) {
      drop.addEventListener(ev, function(e) {
        e.preventDefault();
        drop.classList.add('over');
      });
    });
    ['dragleave', 'drop'].forEach(function(ev) {
      drop.addEventListener(ev, function(e) {
        e.preventDefault();
        drop.classList.remove('over');
      });
    });
    drop.addEventListener('drop', function(e) {
      if (e.dataTransfer && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    });

    document.getElementById('downloadButton').addEventListener('click', downloadReport);

    renderReport();
  }

  window.addEventListener('load', init);
})();
