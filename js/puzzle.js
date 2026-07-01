/**
 * Blockly Games 1 - Puzzle engine.
 *
 * A self-contained reimplementation of the Blockly Games "Puzzle" activity that
 * runs on a modern, CDN-hosted Blockly (no Closure build step required).
 *
 * The student is shown a jumble of blocks for one topic and must:
 *   1. choose the correct answer(s) in each item's drop-down field(s),
 *   2. plug the matching picture into each item, and
 *   3. stack the correct trait blocks under each item.
 * "Check answers" highlights anything wrong and scores it; "Save answers"
 * exports the work as puzzleN.json for later auto-grading.
 */
'use strict';

let currentPuzzle = null;
let currentLevel = 1;
let workspace = null;

const STORAGE_PREFIX = 'bg1';
const t = function(v) { return window.I18N.t(v); };
const msg = function(k, p) { return window.I18N.msg(k, p); };

/** @returns {number} 1-based level from the ?level= query parameter (1-8). */
function getLevelFromUrl() {
  const match = location.search.match(/[?&]level=(\d+)/);
  let level = match ? Number(match[1]) : 1;
  if (!Number.isInteger(level) || level < 1 || level > PUZZLES.length) {
    level = 1;
  }
  return level;
}

function stateKey(level) {
  return STORAGE_PREFIX + '.level' + level + '.state';
}
function doneKey(level) {
  return STORAGE_PREFIX + '.level' + level + '.done';
}
function scoreKey(level) {
  return STORAGE_PREFIX + '.level' + level + '.score';
}

/** Remember the latest block score for this level (for the home-page grade). */
function persistScore(correct, total) {
  try {
    window.localStorage.setItem(scoreKey(currentLevel),
        JSON.stringify({correct: correct, total: total}));
  } catch (e) {
    // Ignore storage errors.
  }
}

/** Define the three block types (item, picture, trait) for the current puzzle. */
function defineBlocks() {
  Blockly.Blocks['item'] = {
    init: function() {
      this.setColour(120);
      this.appendDummyInput().appendField('', 'NAME');
      this.appendValueInput('PIC').appendField(msg('picture'));
      for (const attr of currentPuzzle.attributes) {
        const options = [[msg('choose'), '?']];
        for (const opt of attr.options) {
          options.push([window.optionLabel(opt), window.optionValue(opt)]);
        }
        this.appendDummyInput()
            .appendField(t(attr.label))
            .appendField(new Blockly.FieldDropdown(options), 'ATTR_' + attr.key);
      }
      this.appendStatementInput('TRAITS').appendField(msg('traits'));
      this.setInputsInline(false);
      this.setDeletable(false);
    },
    itemIndex: -1,
    populate: function(n) {
      this.itemIndex = n;
      this.setFieldValue(t(currentPuzzle.items[n].name), 'NAME');
    },
    saveExtraState: function() {
      return {item: this.itemIndex};
    },
    loadExtraState: function(state) {
      this.populate(state.item);
    },
    isCorrect: function() {
      const item = currentPuzzle.items[this.itemIndex];
      for (const attr of currentPuzzle.attributes) {
        if (this.getFieldValue('ATTR_' + attr.key) !== item.attrs[attr.key]) {
          return false;
        }
      }
      return true;
    },
  };

  Blockly.Blocks['picture'] = {
    init: function() {
      this.setColour(30);
      this.appendDummyInput('PIC');
      this.setOutput(true);
      this.setDeletable(false);
    },
    itemIndex: -1,
    populate: function(n) {
      this.itemIndex = n;
      const item = currentPuzzle.items[n];
      this.getInput('PIC').appendField(
          new Blockly.FieldImage('images/' + item.img + '.png', 60, 60, t(item.name)));
    },
    saveExtraState: function() {
      return {item: this.itemIndex};
    },
    loadExtraState: function(state) {
      this.populate(state.item);
    },
    isCorrect: function() {
      const parent = this.getParent();
      return !!parent && parent.itemIndex === this.itemIndex;
    },
  };

  Blockly.Blocks['trait'] = {
    init: function() {
      this.setColour(290);
      this.appendDummyInput().appendField('', 'NAME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setDeletable(false);
    },
    itemIndex: -1,
    traitIndex: -1,
    populate: function(n, m) {
      this.itemIndex = n;
      this.traitIndex = m;
      this.setFieldValue(t(currentPuzzle.items[n].traits[m]), 'NAME');
    },
    saveExtraState: function() {
      return {item: this.itemIndex, trait: this.traitIndex};
    },
    loadExtraState: function(state) {
      this.populate(state.item, state.trait);
    },
    isCorrect: function() {
      const parent = this.getSurroundParent();
      return !!parent && parent.itemIndex === this.itemIndex;
    },
  };
}

/** Fisher-Yates shuffle, in place. */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

/** Create one of every block, shuffled and scattered across the workspace. */
function createFreshBlocks() {
  const itemBlocks = [];
  const pictureBlocks = [];
  const traitBlocks = [];

  for (let i = 0; i < currentPuzzle.items.length; i++) {
    const itemBlock = workspace.newBlock('item');
    itemBlock.populate(i);
    itemBlocks.push(itemBlock);

    const pictureBlock = workspace.newBlock('picture');
    pictureBlock.populate(i);
    pictureBlocks.push(pictureBlock);

    for (let j = 0; j < currentPuzzle.items[i].traits.length; j++) {
      const traitBlock = workspace.newBlock('trait');
      traitBlock.populate(i, j);
      traitBlocks.push(traitBlock);
    }
  }

  shuffle(itemBlocks);
  shuffle(pictureBlocks);
  shuffle(traitBlocks);
  const blocks = [].concat(itemBlocks, pictureBlocks, traitBlocks);

  for (const block of blocks) {
    block.initSvg();
    block.render();
  }

  Blockly.svgResize(workspace);
  const metrics = workspace.getMetrics();
  const viewWidth = Math.max(metrics.viewWidth, 600);
  const viewHeight = Math.max(metrics.viewHeight, 400);
  const margin = 30;

  for (const block of blocks) {
    const box = block.getSvgRoot().getBBox();
    const dx = Math.round(margin + Math.random() *
        Math.max(10, viewWidth - box.width - margin * 2));
    const dy = Math.round(margin + Math.random() *
        Math.max(10, viewHeight - box.height - margin * 2));
    block.moveBy(dx, dy);
  }
}

/** Restore a previously saved workspace, or build a fresh one. */
function loadWorkspace() {
  let saved = null;
  try {
    saved = window.localStorage.getItem(stateKey(currentLevel));
  } catch (e) {
    saved = null;
  }
  if (saved) {
    try {
      Blockly.serialization.workspaces.load(JSON.parse(saved), workspace);
      return;
    } catch (e) {
      console.warn('Could not restore saved puzzle:', e);
    }
  }
  createFreshBlocks();
}

/** Persist the current workspace so progress survives a page reload. */
function saveWorkspace() {
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    window.localStorage.setItem(stateKey(currentLevel), JSON.stringify(state));
  } catch (e) {
    // Ignore storage errors.
  }
}

function markDone() {
  try {
    window.localStorage.setItem(doneKey(currentLevel), '1');
  } catch (e) {
    // Ignore.
  }
}

/** Whether every answer-field drop-down on an item block is correct. */
function itemAnswersCorrect(block) {
  const item = currentPuzzle.items[block.itemIndex];
  for (const attr of currentPuzzle.attributes) {
    if (block.getFieldValue('ATTR_' + attr.key) !== item.attrs[attr.key]) {
      return false;
    }
  }
  return true;
}

/**
 * Score every gradable unit: each answer-field drop-down, each picture,
 * and each trait (item blocks themselves are not a separate unit).
 */
function scoreGradableUnits(blocks) {
  let total = 0;
  let correct = 0;
  const badBlocks = [];

  for (const block of blocks) {
    if (block.type === 'item') {
      const item = currentPuzzle.items[block.itemIndex];
      for (const attr of currentPuzzle.attributes) {
        total++;
        if (block.getFieldValue('ATTR_' + attr.key) === item.attrs[attr.key]) {
          correct++;
        } else if (badBlocks.indexOf(block) === -1) {
          badBlocks.push(block);
        }
      }
    } else if (block.type === 'picture' || block.type === 'trait') {
      total++;
      if (block.isCorrect()) {
        correct++;
      } else {
        badBlocks.push(block);
      }
    }
  }

  return {
    total: total,
    correct: correct,
    errors: total - correct,
    badBlocks: badBlocks,
  };
}

/** Walk the workspace and build a language-independent answer record. */
function buildAnswerRecord() {
  const blocks = workspace.getAllBlocks(false);
  const out = [];
  const scored = scoreGradableUnits(blocks);
  for (const block of blocks) {
    if (block.type === 'item') {
      const answers = {};
      for (const attr of currentPuzzle.attributes) {
        answers[attr.key] = block.getFieldValue('ATTR_' + attr.key);
      }
      out.push({kind: 'item', item: block.itemIndex, answers: answers,
                correct: itemAnswersCorrect(block)});
    } else if (block.type === 'picture') {
      const parent = block.getParent();
      out.push({kind: 'picture', item: block.itemIndex,
                pluggedInto: parent ? parent.itemIndex : null,
                correct: block.isCorrect()});
    } else if (block.type === 'trait') {
      const parent = block.getSurroundParent();
      out.push({kind: 'trait', item: block.itemIndex, trait: block.traitIndex,
                under: parent ? parent.itemIndex : null,
                correct: block.isCorrect()});
    }
  }
  return {blocks: out, correctBlocks: scored.correct, totalBlocks: scored.total};
}

/** Trigger a browser download of the given text content. */
function downloadFile(filename, text) {
  const blob = new Blob([text], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

/** Read/write the student's identity (shared across all puzzles). */
function getIdentity() {
  try {
    return {
      id: window.localStorage.getItem(STORAGE_PREFIX + '.studentId') || '',
      name: window.localStorage.getItem(STORAGE_PREFIX + '.studentName') || '',
    };
  } catch (e) {
    return {id: '', name: ''};
  }
}
function setIdentity(id, name) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + '.studentId', id);
    window.localStorage.setItem(STORAGE_PREFIX + '.studentName', name);
  } catch (e) {
    // Ignore.
  }
}

/** Step 1 of saving: ask for Student ID + full name (pre-filled if known). */
function saveAnswers() {
  const idt = getIdentity();
  document.getElementById('studentId').value = idt.id;
  document.getElementById('studentName').value = idt.name;
  document.getElementById('identityError').style.display = 'none';
  document.getElementById('identityPanel').classList.add('show');
  document.getElementById('studentId').focus();
}

function cancelIdentity() {
  document.getElementById('identityPanel').classList.remove('show');
}

/** Step 2: validate identity, store it, then export the file. */
function confirmIdentity() {
  const id = document.getElementById('studentId').value.trim();
  const name = document.getElementById('studentName').value.trim();
  if (!id || !name) {
    const err = document.getElementById('identityError');
    err.textContent = msg('identityRequired');
    err.style.display = '';
    return;
  }
  setIdentity(id, name);
  document.getElementById('identityPanel').classList.remove('show');
  exportAnswers(id, name);
}

/** Export the current answers as puzzleN.json, tagged with the student. */
function exportAnswers(studentId, fullName) {
  saveWorkspace();
  const record = buildAnswerRecord();
  persistScore(record.correctBlocks, record.totalBlocks);
  const payload = {
    app: 'Blockly Games 1',
    studentId: studentId,
    fullName: fullName,
    puzzle: currentLevel,
    topic: currentPuzzle.topic.en,
    savedAt: new Date().toISOString(),
    totalBlocks: record.totalBlocks,
    correctBlocks: record.correctBlocks,
    blocks: record.blocks,
  };
  const filename = 'puzzle' + currentLevel + '.json';
  downloadFile(filename, JSON.stringify(payload, null, 2));
  showToast(msg('saved', {file: filename}));
}

let toastTimer = null;
function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) {
    return;
  }
  toast.textContent = text;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function() {
    toast.classList.remove('show');
  }, 2500);
}

/** Count and highlight mistakes; show the result panel. */
function checkAnswers() {
  const blocks = workspace.getAllBlocks(false);
  const scored = scoreGradableUnits(blocks);
  const total = scored.total;
  const correct = scored.correct;
  const errors = scored.errors;
  const badBlocks = scored.badBlocks;

  if (errors === 0) {
    markDone();
  }
  persistScore(correct, total);
  saveWorkspace();

  blocks.forEach(function(b) {
    if (b.removeSelect) {
      b.removeSelect();
    }
  });
  for (const block of badBlocks) {
    if (block.addSelect) {
      block.addSelect();
    }
  }

  showResult(correct, total, errors);
}

/** Render and reveal the result overlay. */
function showResult(correct, total, errors) {
  const panel = document.getElementById('resultPanel');
  const titleEl = document.getElementById('resultTitle');
  const msgEl = document.getElementById('resultMessage');
  const barEl = document.getElementById('resultBarValue');
  const actionsEl = document.getElementById('resultActions');

  if (errors === 0) {
    titleEl.textContent = msg('resultSolved');
    msgEl.textContent = msg('msgAllCorrect', {total: total});
  } else if (errors === 1) {
    titleEl.textContent = msg('resultAlmost');
    msgEl.textContent = msg('msgOneWrong');
  } else {
    titleEl.textContent = msg('resultKeep');
    msgEl.textContent = msg('msgManyWrong', {errors: errors});
  }

  const scoreEl = document.getElementById('resultScore');
  if (scoreEl) {
    scoreEl.textContent = msg('resultScore', {
      correct: correct,
      total: total,
      percent: Math.round((correct / total) * 100),
    });
  }

  barEl.style.width = '0%';
  window.setTimeout(function() {
    barEl.style.width = Math.round((correct / total) * 100) + '%';
  }, 60);

  actionsEl.innerHTML = '';

  // A Save button is always available so the student can save right after
  // checking, without closing the result window first.
  const saveBtn = document.createElement('button');
  saveBtn.textContent = msg('save');
  saveBtn.addEventListener('click', saveAnswers);
  actionsEl.appendChild(saveBtn);

  if (errors === 0) {
    if (currentLevel < PUZZLES.length) {
      const next = document.createElement('button');
      next.className = 'primary';
      next.textContent = msg('nextPuzzle');
      next.addEventListener('click', function() {
        location.href = 'puzzle.html?level=' + (currentLevel + 1);
      });
      actionsEl.appendChild(next);
    }
    const menu = document.createElement('button');
    menu.textContent = msg('backToMenu');
    menu.addEventListener('click', function() {
      location.href = 'index.html';
    });
    actionsEl.appendChild(menu);
  } else {
    const again = document.createElement('button');
    again.className = 'primary';
    again.textContent = msg('tryAgain');
    again.addEventListener('click', hideResult);
    actionsEl.appendChild(again);
  }

  panel.classList.add('show');
}

function hideResult() {
  document.getElementById('resultPanel').classList.remove('show');
}

/** Build the header text and wire up buttons. */
function buildChrome() {
  const title = msg('puzzle') + ' ' + currentLevel + ': ' + t(currentPuzzle.topic);
  document.title = title + ' - Blockly Games 1';
  document.getElementById('title').textContent = title;
  document.getElementById('blurb').textContent = t(currentPuzzle.blurb);

  const checkBtn = document.getElementById('checkButton');
  checkBtn.textContent = msg('check');
  checkBtn.addEventListener('click', checkAnswers);

  const saveBtn = document.getElementById('saveButton');
  saveBtn.textContent = msg('save');
  saveBtn.addEventListener('click', saveAnswers);

  // Identity dialog labels and buttons.
  document.getElementById('identityTitle').textContent = msg('identityTitle');
  document.getElementById('studentIdLabel').textContent = msg('studentIdLabel');
  document.getElementById('studentNameLabel').textContent = msg('fullNameLabel');
  document.getElementById('identityConfirm').textContent = msg('saveConfirm');
  document.getElementById('identityCancel').textContent = msg('cancel');
  document.getElementById('identityConfirm').addEventListener('click', confirmIdentity);
  document.getElementById('identityCancel').addEventListener('click', cancelIdentity);
  document.getElementById('studentName').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      confirmIdentity();
    }
  });

  document.getElementById('resultClose').addEventListener('click', hideResult);
  window.I18N.renderToggle(document.getElementById('langToggle'));
}

/** Boot the game once Blockly and the DOM are ready. */
function boot() {
  currentLevel = getLevelFromUrl();
  currentPuzzle = PUZZLES[currentLevel - 1];

  buildChrome();
  defineBlocks();

  if (Blockly.config) {
    Blockly.config.snapRadius = 32;
    Blockly.config.connectingSnapRadius = 32;
  }

  workspace = Blockly.inject('blockly', {
    rtl: false,
    scrollbars: true,
    trashcan: false,
    sounds: false,
    move: {scrollbars: true, drag: true, wheel: false},
    zoom: {controls: false, wheel: false, startScale: 1.0},
  });

  loadWorkspace();
  workspace.clearUndo();
  saveWorkspace();

  workspace.addChangeListener(function(event) {
    if (event && event.isUiEvent) {
      return;
    }
    saveWorkspace();
  });

  window.addEventListener('resize', function() {
    Blockly.svgResize(workspace);
  });
}

window.addEventListener('load', boot);
