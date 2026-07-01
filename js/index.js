/**
 * Blockly Games 1 - Index page.
 * Builds a card for each puzzle, localised, and shows a tick for solved ones.
 */
'use strict';

(function() {
  const STORAGE_PREFIX = 'bg1';
  const t = function(v) { return window.I18N.t(v); };
  const msg = function(k, p) { return window.I18N.msg(k, p); };

  function isDone(level) {
    try {
      return window.localStorage.getItem(STORAGE_PREFIX + '.level' + level + '.done') === '1';
    } catch (e) {
      return false;
    }
  }

  function readScore(level) {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + '.level' + level + '.score');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function thumbCodes(puzzle) {
    return puzzle.items.slice(0, 3).map(function(it) { return it.img; });
  }

  function render() {
    // Static text.
    document.getElementById('tagline').textContent = msg('tagline');
    document.querySelector('.site-footer p').textContent = msg('footer');
    const graderLink = document.getElementById('graderLink');
    if (graderLink) {
      graderLink.textContent = msg('graderLink');
    }
    window.I18N.renderToggle(document.getElementById('langToggle'));

    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    let solved = 0;
    let gradeSum = 0;

    PUZZLES.forEach(function(puzzle, i) {
      const level = i + 1;
      const done = isDone(level);
      if (done) {
        solved++;
      }
      const total = window.puzzleTotalBlocks(puzzle);
      const score = readScore(level);
      if (score) {
        gradeSum += total ? (score.correct / total) : 0;
      }

      const card = document.createElement('a');
      card.className = 'card' + (done ? ' done' : '');
      card.href = 'puzzle.html?level=' + level;

      const thumbs = document.createElement('div');
      thumbs.className = 'card-thumbs';
      thumbCodes(puzzle).forEach(function(code) {
        const img = document.createElement('img');
        img.src = 'images/' + code + '.png';
        img.alt = '';
        thumbs.appendChild(img);
      });
      card.appendChild(thumbs);

      const body = document.createElement('div');
      body.className = 'card-body';

      const h = document.createElement('h2');
      h.textContent = msg('puzzle') + ' ' + level;
      if (done) {
        const tick = document.createElement('span');
        tick.className = 'tick';
        tick.textContent = '\u2713';
        h.appendChild(tick);
      }
      body.appendChild(h);

      const topic = document.createElement('p');
      topic.className = 'card-topic';
      topic.textContent = t(puzzle.topic);
      body.appendChild(topic);

      const maxTraits = Math.max.apply(null, puzzle.items.map(function(it) {
        return it.traits.length;
      }));
      const meta = document.createElement('p');
      meta.className = 'card-meta';
      meta.textContent = msg('cardMeta', {
        pics: puzzle.items.length,
        fields: puzzle.attributes.length,
        fieldWord: puzzle.attributes.length === 1 ? msg('answerFieldOne') : msg('answerFieldMany'),
        traits: maxTraits,
        traitWord: maxTraits === 1 ? msg('traitOne') : msg('traitMany'),
      });
      body.appendChild(meta);

      if (score) {
        const scoreLine = document.createElement('p');
        scoreLine.className = 'card-score';
        scoreLine.textContent = msg('cardScore', {correct: score.correct, total: total});
        body.appendChild(scoreLine);
      }

      card.appendChild(body);
      grid.appendChild(card);
    });

    const gradeEl = document.getElementById('grade');
    if (gradeEl) {
      const percent = (gradeSum / PUZZLES.length) * 100;
      gradeEl.textContent = msg('yourGrade', {
        percent: percent.toFixed(1),
        ten: (percent / 10).toFixed(2),
      });
    }

    const progress = document.getElementById('progress');
    if (progress) {
      progress.textContent = msg('solvedCount', {n: solved, total: PUZZLES.length});
    }

    const clearBtn = document.getElementById('clearButton');
    if (clearBtn) {
      clearBtn.textContent = msg('clearProgress');
      if (solved > 0) {
        clearBtn.style.display = '';
        clearBtn.addEventListener('click', function() {
          if (!confirm(msg('clearConfirm'))) {
            return;
          }
          try {
            for (let lvl = 1; lvl <= PUZZLES.length; lvl++) {
              window.localStorage.removeItem(STORAGE_PREFIX + '.level' + lvl + '.done');
              window.localStorage.removeItem(STORAGE_PREFIX + '.level' + lvl + '.state');
            }
          } catch (e) {
            // Ignore.
          }
          location.reload();
        });
      } else {
        clearBtn.style.display = 'none';
      }
    }
  }

  window.addEventListener('load', render);
})();
