# Blockly Games 1 (Ten Puzzles)

A customised version of Google's *Blockly Games* **Puzzle** activity, made for
classroom practice. Instead of many different game types (Maze, Bird, Turtle,
Movie, …) this edition contains **one game type — Puzzle — with ten levels**
that grow in difficulty.

For every level the screen fills with a jumble of blocks. For each thing in the
topic you must:

1. **Plug in the matching picture.**
2. **Choose the correct answer** in each drop-down field (e.g. number of legs).
3. **Stack the correct trait blocks** under it.

Then press **Check answers**. Wrong blocks are highlighted and you get a score.
Get everything right to solve the level.

## The ten puzzles

| # | Topic | Pictures | Answer fields | Traits each |
|---|-------|:--------:|:-------------:|:-----------:|
| 1 | Pets | 3 | 1 | 1 |
| 2 | Farm Animals | 4 | 1 | 1 |
| 3 | Insects & Bugs | 4 | 1 | 2 |
| 4 | Wild Animals | 5 | 1 | 2 |
| 5 | Vehicles | 5 | 2 | 2 |
| 6 | Sea Animals | 6 | 2 | 2 |
| 7 | Birds | 7 | 2 | 3 |
| 8 | Animal Kingdom | 8 | 3 | 3 |
| 9 | Around the World Animals | 9 | 3 | 3 |
| 10 | Vehicles & Transport | 10 | 4 | 4 |

Difficulty rises by adding more pictures, more answer fields, and more traits.

## Languages

There is an **EN / VI** toggle (top-right on the home page, in the toolbar on
the puzzle and grader pages). It switches the whole interface and all puzzle
content between **English** and **Vietnamese**. Your choice is remembered.
The *answers* are language-independent, so grading works regardless of the
language a student played in.

---

## How to start playing

This version is **already built** — there is no `make`, `svn`, Java or Closure
compiler step. You only need a tiny local web server (the pages must be served
over `http://`, **not** opened as `file://`, and the page needs an internet
connection because Blockly loads from a CDN).

### Option 1 — Python (recommended on this machine)

From inside the `blockly-games-1` folder, run in PowerShell:

```powershell
cd blockly-games-1
python -m http.server 8000
```

Then open your browser at:

```
http://localhost:8000/index.html
```

Pick a puzzle, or jump straight to one with a URL such as
`http://localhost:8000/puzzle.html?level=3`.

Press **Ctrl + C** in the terminal to stop the server.

### Option 2 — VS Code Live Server

Install the **Live Server** extension, right-click `index.html`, and choose
**“Open with Live Server.”**

### Option 3 — Node

```powershell
npx http-server -p 8000
```

---

## Saving answers for grading

There is a **Save answers** button both in the toolbar and inside the
**Check answers** window (so students can save the moment they finish). The
first time they save, a dialog asks for their **Student ID** and **Full name**;
these are remembered and written into every exported file. It then downloads the
work as a JSON file named after the level:

```
puzzle1.json, puzzle2.json, … puzzle10.json
```

Have students play all ten puzzles and submit their ten JSON files. The files
store the student's identity and *which* answer each block was given (not the
language), so they can be graded automatically.

> Tip: most browsers save to your **Downloads** folder. If a student re-saves,
> the browser may add a suffix like `puzzle1 (1).json`; ask them to keep the
> original names, or rename before submitting.

---

## Auto-grading

Open **`grader.html`** (linked at the bottom of the home page, or
`http://localhost:8000/grader.html`).

1. Drag in — or click to choose — a student's `puzzle1.json … puzzle10.json`.
2. The tool reads the student's name/ID from the files, grades each file against
   the answer key, and shows a table plus the final grade as a **percentage** and
   **out of 10**.
3. Click **Download report** to save a `grade-report.json` summary.

### How the grade is calculated

The total is **split equally between the puzzles, and equally between the blocks
within each puzzle**:

```
puzzleScore = correctBlocks / totalBlocks        (for one puzzle)
finalGrade  = average(puzzleScore over all 10) × 100%
```

- Each of the 10 puzzles is worth the same share (1/10 = 10%).
- Inside a puzzle, every block (each item, each picture, each trait) is worth an
  equal share of that puzzle.
- A puzzle with **no submitted file scores 0**.

Grading is recomputed from the answer key, so it does not simply trust the
`correct` flags written by the game.

---

## Making your own practice activities

Everything you would normally change lives in **`js/data.js`**. Each puzzle is a
bilingual object:

```js
{
  topic: { en: 'Pets', vi: 'Thú cưng' },
  blurb: { en: '…', vi: '…' },
  attributes: [
    { key: 'legs', label: { en: 'number of legs', vi: 'số chân' },
      options: ['0', '2', '4'] }            // numbers need no translation
  ],
  items: [
    { name: { en: 'Dog', vi: 'Chó' }, img: '1F436',
      attrs: { legs: '4' },
      traits: [ { en: 'Barks', vi: 'Sủa' } ] },
    …
  ]
}
```

- **`attributes`** are the drop-down “answer fields”. Add more entries to make a
  puzzle harder. Options can be plain strings (numbers) or, for words, objects
  with a stable value and a translated label:

  ```js
  { value: 'Land', label: { en: 'Land', vi: 'Trên cạn' } }
  ```

  The **`value`** is what the answer is compared against (so it never changes
  with language); the **`label`** is only what the student sees.
- **`attrs`** gives each item its correct `value` for every attribute.
- **`traits`** are the `{en, vi}` sentences that stack under each item.
- **`img`** is the picture file name (without `.png`) in the `images/` folder.

### Adding a picture

Pictures are PNG files in **`images/`**, named after their
[OpenMoji](https://openmoji.org) codepoint (e.g. `1F436.png` is a dog). To add a
new one, download it and reference its name in `img`. For example, in PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/618x618/1F431.png" `
  -OutFile "images/1F431.png"
```

You can browse codepoints at <https://openmoji.org>. Any square PNG works.

---

## Project layout

```
blockly-games-1/
├── index.html        Home page listing the 8 puzzles (+ language toggle)
├── puzzle.html       The game page (uses ?level=N) with Save + Check
├── grader.html       Teacher auto-grading tool
├── css/style.css     Styling
├── js/i18n.js        English/Vietnamese strings + language toggle
├── js/data.js        ← edit this to change the puzzles (bilingual)
├── js/puzzle.js       Game engine (blocks, checking, saving)
├── js/index.js        Builds the home page
├── js/grader.js       Auto-grader logic
├── images/           Puzzle pictures (OpenMoji PNGs)
└── README.md         This file
```

## Credits

- **Blockly** and the original *Blockly Games Puzzle* concept — Google LLC
  (Apache-2.0).
- **Pictures** — [OpenMoji](https://openmoji.org), licensed CC BY-SA 4.0.
