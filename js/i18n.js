/**
 * Blockly Games 1 - Internationalisation (English / Vietnamese).
 *
 * Provides:
 *   I18N.getLang()            -> 'en' | 'vi'
 *   I18N.setLang(lang)        -> store choice (does not reload)
 *   I18N.toggleAndReload()    -> switch language and reload the page
 *   I18N.t(value)             -> pick the right string from {en, vi} (or pass through)
 *   I18N.msg(key, params)     -> a UI string in the current language
 */
'use strict';

(function() {
  const LANG_KEY = 'bg1.lang';
  const SUPPORTED = ['en', 'vi'];

  function getLang() {
    let lang = null;
    try {
      lang = window.localStorage.getItem(LANG_KEY);
    } catch (e) {
      lang = null;
    }
    return SUPPORTED.indexOf(lang) === -1 ? 'en' : lang;
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = 'en';
    }
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      // Ignore storage errors.
    }
  }

  function toggleAndReload() {
    setLang(getLang() === 'en' ? 'vi' : 'en');
    location.reload();
  }

  /** Resolve a {en, vi} object (or a plain value) to the current language. */
  function t(value) {
    if (value && typeof value === 'object' && ('en' in value || 'vi' in value)) {
      const lang = getLang();
      return value[lang] !== undefined ? value[lang] : value.en;
    }
    return value;
  }

  // User-interface strings.
  const MSG = {
    en: {
      tagline: 'Ten puzzles. Match each picture, pick the right answers, and stack the correct traits.',
      solvedCount: '{n} of {total} puzzles solved',
      clearProgress: 'Clear progress',
      clearConfirm: 'Clear all saved progress for every puzzle?',
      puzzle: 'Puzzle',
      cardMeta: '{pics} pictures \u00b7 {fields} {fieldWord} \u00b7 {traits} {traitWord}',
      answerFieldOne: 'answer field',
      answerFieldMany: 'answer fields',
      traitOne: 'trait',
      traitMany: 'traits',
      check: 'Check answers',
      save: 'Save answers',
      saved: 'Saved as {file}',
      identityTitle: 'Enter your details',
      studentIdLabel: 'Student ID',
      fullNameLabel: 'Full name',
      saveConfirm: 'Save & download',
      cancel: 'Cancel',
      identityRequired: 'Please enter both your Student ID and full name.',
      studentLabel: 'Student',
      picture: 'picture',
      traits: 'traits',
      choose: 'choose\u2026',
      resultSolved: 'Solved!',
      resultAlmost: 'Almost there',
      resultKeep: 'Keep going',
      msgAllCorrect: 'All {total} blocks are correct. Well done!',
      msgOneWrong: '1 block is still in the wrong place. Try again.',
      msgManyWrong: '{errors} blocks are still in the wrong place. Try again.',
      nextPuzzle: 'Next puzzle \u2192',
      backToMenu: 'Back to menu',
      tryAgain: 'Try again',
      resultScore: 'Score: {correct} / {total} blocks ({percent}%)',
      yourGrade: 'Your grade so far: {percent}% \u00b7 {ten}/10',
      cardScore: 'Your score: {correct}/{total}',
      footer: 'Pictures from OpenMoji (CC BY-SA 4.0). Built on Blockly.',
      graderLink: 'Teacher: auto-grade JSON \u2192',
      // Grader page
      graderTitle: 'Auto-grader',
      graderIntro: "Select a student's exported files (puzzle1.json \u2026 puzzle10.json). " +
                   'The grade is split equally across the 10 puzzles, and equally across the blocks in each puzzle.',
      chooseFiles: 'Choose JSON files',
      gradeColPuzzle: 'Puzzle',
      gradeColTopic: 'Topic',
      gradeColBlocks: 'Blocks correct',
      gradeColScore: 'Puzzle score',
      gradeColWeight: 'Weight',
      gradeMissing: 'missing',
      gradeTotal: 'Total grade',
      gradeOutOf10: 'Grade (out of 10)',
      downloadReport: 'Download report',
      noFiles: 'No files loaded yet.',
    },
    vi: {
      tagline: 'M\u01b0\u1eddi c\u00e2u \u0111\u1ed1. Gh\u00e9p m\u1ed7i h\u00ecnh \u1ea3nh, ch\u1ecdn c\u00e2u tr\u1ea3 l\u1eddi \u0111\u00fang v\u00e0 x\u1ebfp c\u00e1c \u0111\u1eb7c \u0111i\u1ec3m ph\u00f9 h\u1ee3p.',
      solvedCount: '\u0110\u00e3 gi\u1ea3i {n} tr\u00ean {total} c\u00e2u \u0111\u1ed1',
      clearProgress: 'X\u00f3a ti\u1ebfn tr\u00ecnh',
      clearConfirm: 'X\u00f3a to\u00e0n b\u1ed9 ti\u1ebfn tr\u00ecnh \u0111\u00e3 l\u01b0u c\u1ee7a t\u1ea5t c\u1ea3 c\u00e2u \u0111\u1ed1?',
      puzzle: 'C\u00e2u \u0111\u1ed1',
      cardMeta: '{pics} h\u00ecnh \u00b7 {fields} {fieldWord} \u00b7 {traits} {traitWord}',
      answerFieldOne: '\u00f4 tr\u1ea3 l\u1eddi',
      answerFieldMany: '\u00f4 tr\u1ea3 l\u1eddi',
      traitOne: '\u0111\u1eb7c \u0111i\u1ec3m',
      traitMany: '\u0111\u1eb7c \u0111i\u1ec3m',
      check: 'Ki\u1ec3m tra \u0111\u00e1p \u00e1n',
      save: 'L\u01b0u b\u00e0i l\u00e0m',
      saved: '\u0110\u00e3 l\u01b0u th\u00e0nh {file}',
      identityTitle: 'Nh\u1eadp th\u00f4ng tin c\u1ee7a b\u1ea1n',
      studentIdLabel: 'M\u00e3 s\u1ed1 sinh vi\u00ean',
      fullNameLabel: 'H\u1ecd v\u00e0 t\u00ean',
      saveConfirm: 'L\u01b0u & t\u1ea3i v\u1ec1',
      cancel: 'H\u1ee7y',
      identityRequired: 'Vui l\u00f2ng nh\u1eadp c\u1ea3 M\u00e3 s\u1ed1 sinh vi\u00ean v\u00e0 H\u1ecd t\u00ean.',
      studentLabel: 'Sinh vi\u00ean',
      picture: 'h\u00ecnh \u1ea3nh',
      traits: '\u0111\u1eb7c \u0111i\u1ec3m',
      choose: 'ch\u1ecdn\u2026',
      resultSolved: 'Ho\u00e0n th\u00e0nh!',
      resultAlmost: 'G\u1ea7n \u0111\u00fang r\u1ed3i',
      resultKeep: 'C\u1ed1 l\u00ean',
      msgAllCorrect: 'T\u1ea5t c\u1ea3 {total} kh\u1ed1i \u0111\u1ec1u \u0111\u00fang. L\u00e0m t\u1ed1t l\u1eafm!',
      msgOneWrong: 'C\u00f2n 1 kh\u1ed1i \u0111\u1eb7t sai ch\u1ed7. H\u00e3y th\u1eed l\u1ea1i.',
      msgManyWrong: 'C\u00f2n {errors} kh\u1ed1i \u0111\u1eb7t sai ch\u1ed7. H\u00e3y th\u1eed l\u1ea1i.',
      nextPuzzle: 'C\u00e2u \u0111\u1ed1 ti\u1ebfp theo \u2192',
      backToMenu: 'V\u1ec1 trang ch\u00ednh',
      tryAgain: 'Th\u1eed l\u1ea1i',
      resultScore: '\u0110i\u1ec3m: {correct} / {total} kh\u1ed1i ({percent}%)',
      yourGrade: '\u0110i\u1ec3m hi\u1ec7n t\u1ea1i: {percent}% \u00b7 {ten}/10',
      cardScore: '\u0110i\u1ec3m c\u1ee7a b\u1ea1n: {correct}/{total}',
      footer: 'H\u00ecnh \u1ea3nh t\u1eeb OpenMoji (CC BY-SA 4.0). X\u00e2y d\u1ef1ng tr\u00ean Blockly.',
      graderLink: 'Gi\u00e1o vi\u00ean: ch\u1ea5m \u0111i\u1ec3m JSON \u2192',
      graderTitle: 'C\u00f4ng c\u1ee5 ch\u1ea5m \u0111i\u1ec3m',
      graderIntro: 'Ch\u1ecdn c\u00e1c t\u1ec7p b\u00e0i l\u00e0m c\u1ee7a h\u1ecdc sinh (puzzle1.json \u2026 puzzle10.json). ' +
                   '\u0110i\u1ec3m \u0111\u01b0\u1ee3c chia \u0111\u1ec1u cho 10 c\u00e2u \u0111\u1ed1, v\u00e0 chia \u0111\u1ec1u cho c\u00e1c kh\u1ed1i trong m\u1ed7i c\u00e2u \u0111\u1ed1.',
      chooseFiles: 'Ch\u1ecdn t\u1ec7p JSON',
      gradeColPuzzle: 'C\u00e2u \u0111\u1ed1',
      gradeColTopic: 'Ch\u1ee7 \u0111\u1ec1',
      gradeColBlocks: 'Kh\u1ed1i \u0111\u00fang',
      gradeColScore: '\u0110i\u1ec3m c\u00e2u \u0111\u1ed1',
      gradeColWeight: 'Tr\u1ecdng s\u1ed1',
      gradeMissing: 'thi\u1ebfu',
      gradeTotal: 'T\u1ed5ng \u0111i\u1ec3m',
      gradeOutOf10: '\u0110i\u1ec3m (thang 10)',
      downloadReport: 'T\u1ea3i b\u00e1o c\u00e1o',
      noFiles: 'Ch\u01b0a c\u00f3 t\u1ec7p n\u00e0o.',
    },
  };

  function msg(key, params) {
    const lang = getLang();
    let s = (MSG[lang] && MSG[lang][key]);
    if (s === undefined) {
      s = MSG.en[key] !== undefined ? MSG.en[key] : key;
    }
    if (params) {
      for (const p of Object.keys(params)) {
        s = s.replace('{' + p + '}', params[p]);
      }
    }
    return s;
  }

  /** Render an EN | VI segmented toggle into a container element. */
  function renderToggle(container) {
    if (!container) {
      return;
    }
    container.innerHTML = '';
    container.classList.add('lang-toggle');
    const current = getLang();
    SUPPORTED.forEach(function(lang) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = lang.toUpperCase();
      btn.className = 'lang-btn' + (lang === current ? ' active' : '');
      btn.addEventListener('click', function() {
        if (lang !== getLang()) {
          setLang(lang);
          location.reload();
        }
      });
      container.appendChild(btn);
    });
  }

  window.I18N = {
    getLang: getLang,
    setLang: setLang,
    toggleAndReload: toggleAndReload,
    renderToggle: renderToggle,
    t: t,
    msg: msg,
    SUPPORTED: SUPPORTED,
  };
})();
