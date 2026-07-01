/**
 * Blockly Games 1 - Puzzle data (bilingual: English / Vietnamese).
 *
 * Eight puzzles of increasing difficulty.  Each item has:
 *   - name:   {en, vi} label shown on the item block.
 *   - img:    an OpenMoji codepoint; the picture lives at images/<img>.png.
 *   - attrs:  a map of attribute key -> the CORRECT canonical answer value.
 *   - traits: an array of {en, vi} trait sentences that belong to this item.
 *
 * Attribute options may be:
 *   - a plain string  (e.g. '4')                     -> value and label are the same
 *   - an object       {value, label:{en, vi}}        -> stable value, localised label
 *
 * Canonical values (attrs / option.value) never change with language, so saved
 * answers and grading are language-independent.
 *
 * To create your own activity, copy a puzzle, translate the {en, vi} strings,
 * and drop any new pictures into images/ (named <codepoint>.png).
 */
'use strict';

const PUZZLES = [
  // ---------------------------------------------------------------- Puzzle 1
  {
    topic: {en: 'Pets', vi: 'Th\u00fa c\u01b0ng'},
    blurb: {
      en: 'A gentle warm-up: 3 pets, 1 answer field, 1 trait each.',
      vi: 'Kh\u1edfi \u0111\u1ed9ng nh\u1eb9 nh\u00e0ng: 3 th\u00fa c\u01b0ng, 1 \u00f4 tr\u1ea3 l\u1eddi, 1 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '2', '4']},
    ],
    items: [
      {name: {en: 'Dog', vi: 'Ch\u00f3'}, img: '1F436', attrs: {legs: '4'},
       traits: [{en: 'Barks', vi: 'S\u1ee7a'}]},
      {name: {en: 'Duck', vi: 'V\u1ecbt'}, img: '1F986', attrs: {legs: '2'},
       traits: [{en: 'Has feathers', vi: 'C\u00f3 l\u00f4ng v\u0169'}]},
      {name: {en: 'Goldfish', vi: 'C\u00e1 v\u00e0ng'}, img: '1F41F', attrs: {legs: '0'},
       traits: [{en: 'Lives in water', vi: 'S\u1ed1ng d\u01b0\u1edbi n\u01b0\u1edbc'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 2
  {
    topic: {en: 'Farm Animals', vi: '\u0110\u1ed9ng v\u1eadt trang tr\u1ea1i'},
    blurb: {
      en: 'One more animal to sort out: 4 items, 1 answer field, 1 trait each.',
      vi: 'Th\u00eam m\u1ed9t con v\u1eadt n\u1eefa: 4 \u0111\u1ed1i t\u01b0\u1ee3ng, 1 \u00f4 tr\u1ea3 l\u1eddi, 1 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '2', '4']},
    ],
    items: [
      {name: {en: 'Cow', vi: 'B\u00f2'}, img: '1F404', attrs: {legs: '4'},
       traits: [{en: 'Gives us milk', vi: 'Cho ch\u00fang ta s\u1eefa'}]},
      {name: {en: 'Chicken', vi: 'G\u00e0'}, img: '1F414', attrs: {legs: '2'},
       traits: [{en: 'Lays eggs', vi: '\u0110\u1ebb tr\u1ee9ng'}]},
      {name: {en: 'Pig', vi: 'L\u1ee3n'}, img: '1F416', attrs: {legs: '4'},
       traits: [{en: 'Likes to roll in the mud', vi: 'Th\u00edch l\u0103n trong b\u00f9n'}]},
      {name: {en: 'Horse', vi: 'Ng\u1ef1a'}, img: '1F40E', attrs: {legs: '4'},
       traits: [{en: 'People can ride it', vi: 'Con ng\u01b0\u1eddi c\u00f3 th\u1ec3 c\u01b0\u1ee1i'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 3
  {
    topic: {en: 'Insects & Bugs', vi: 'C\u00f4n tr\u00f9ng & s\u00e2u b\u1ecd'},
    blurb: {
      en: 'Now two traits each: 4 items, 1 answer field, 2 traits each.',
      vi: 'B\u00e2y gi\u1edd m\u1ed7i con 2 \u0111\u1eb7c \u0111i\u1ec3m: 4 \u0111\u1ed1i t\u01b0\u1ee3ng, 1 \u00f4 tr\u1ea3 l\u1eddi, 2 \u0111\u1eb7c \u0111i\u1ec3m.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '6', '8']},
    ],
    items: [
      {name: {en: 'Ant', vi: 'Ki\u1ebfn'}, img: '1F41C', attrs: {legs: '6'},
       traits: [{en: 'Lives in a colony', vi: 'S\u1ed1ng th\u00e0nh \u0111\u00e0n'},
                {en: 'Is very strong for its size', vi: 'R\u1ea5t kh\u1ecfe so v\u1edbi k\u00edch th\u01b0\u1edbc'}]},
      {name: {en: 'Spider', vi: 'Nh\u1ec7n'}, img: '1F577', attrs: {legs: '8'},
       traits: [{en: 'Spins a web', vi: 'Gi\u0103ng t\u01a1'},
                {en: 'Is not an insect', vi: 'Kh\u00f4ng ph\u1ea3i c\u00f4n tr\u00f9ng'}]},
      {name: {en: 'Butterfly', vi: 'B\u01b0\u1edbm'}, img: '1F98B', attrs: {legs: '6'},
       traits: [{en: 'Has colourful wings', vi: 'C\u00f3 \u0111\u00f4i c\u00e1nh nhi\u1ec1u m\u00e0u'},
                {en: 'Was once a caterpillar', vi: 'T\u1eebng l\u00e0 s\u00e2u b\u01b0\u1edbm'}]},
      {name: {en: 'Snail', vi: '\u1ed0c s\u00ean'}, img: '1F40C', attrs: {legs: '0'},
       traits: [{en: 'Carries its shell', vi: 'Mang theo v\u1ecf \u1ed1c'},
                {en: 'Moves very slowly', vi: 'Di chuy\u1ec3n r\u1ea5t ch\u1eadm'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 4
  {
    topic: {en: 'Wild Animals', vi: '\u0110\u1ed9ng v\u1eadt hoang d\u00e3'},
    blurb: {
      en: 'A bigger set: 5 items, 1 answer field, 2 traits each.',
      vi: 'B\u1ed9 l\u1edbn h\u01a1n: 5 \u0111\u1ed1i t\u01b0\u1ee3ng, 1 \u00f4 tr\u1ea3 l\u1eddi, 2 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '2', '4']},
    ],
    items: [
      {name: {en: 'Elephant', vi: 'Voi'}, img: '1F418', attrs: {legs: '4'},
       traits: [{en: 'Has a long trunk', vi: 'C\u00f3 v\u00f2i d\u00e0i'},
                {en: 'Is very large', vi: 'R\u1ea5t to l\u1edbn'}]},
      {name: {en: 'Lion', vi: 'S\u01b0 t\u1eed'}, img: '1F981', attrs: {legs: '4'},
       traits: [{en: 'Roars loudly', vi: 'G\u1ea7m vang'},
                {en: 'Is called the king of beasts', vi: '\u0110\u01b0\u1ee3c g\u1ecdi l\u00e0 ch\u00faa t\u1ec3 mu\u00f4n lo\u00e0i'}]},
      {name: {en: 'Snake', vi: 'R\u1eafn'}, img: '1F40D', attrs: {legs: '0'},
       traits: [{en: 'Has no legs', vi: 'Kh\u00f4ng c\u00f3 ch\u00e2n'},
                {en: 'Is a reptile', vi: 'L\u00e0 lo\u00e0i b\u00f2 s\u00e1t'}]},
      {name: {en: 'Kangaroo', vi: 'Chu\u1ed9t t\u00fai'}, img: '1F998', attrs: {legs: '2'},
       traits: [{en: 'Hops on two legs', vi: 'Nh\u1ea3y b\u1eb1ng hai ch\u00e2n'},
                {en: 'Carries its baby in a pouch', vi: 'Mang con trong t\u00fai'}]},
      {name: {en: 'Giraffe', vi: 'H\u01b0\u01a1u cao c\u1ed5'}, img: '1F992', attrs: {legs: '4'},
       traits: [{en: 'Has a very long neck', vi: 'C\u00f3 chi\u1ebfc c\u1ed5 r\u1ea5t d\u00e0i'},
                {en: 'Is the tallest animal', vi: 'L\u00e0 lo\u00e0i v\u1eadt cao nh\u1ea5t'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 5
  {
    topic: {en: 'Vehicles', vi: 'Ph\u01b0\u01a1ng ti\u1ec7n giao th\u00f4ng'},
    blurb: {
      en: 'Two answer fields now: 5 items, 2 answer fields, 2 traits each.',
      vi: 'Gi\u1edd c\u00f3 hai \u00f4 tr\u1ea3 l\u1eddi: 5 \u0111\u1ed1i t\u01b0\u1ee3ng, 2 \u00f4 tr\u1ea3 l\u1eddi, 2 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i \u0111\u1ed1i t\u01b0\u1ee3ng.',
    },
    attributes: [
      {key: 'wheels', label: {en: 'number of wheels', vi: 's\u1ed1 b\u00e1nh xe'}, options: ['0', '2', '4', '6']},
      {key: 'travels', label: {en: 'travels by', vi: 'di chuy\u1ec3n b\u1eb1ng'}, options: [
        {value: 'Road', label: {en: 'Road', vi: '\u0110\u01b0\u1eddng b\u1ed9'}},
        {value: 'Water', label: {en: 'Water', vi: 'M\u1eb7t n\u01b0\u1edbc'}},
        {value: 'Sky', label: {en: 'Sky', vi: 'B\u1ea7u tr\u1eddi'}},
      ]},
    ],
    items: [
      {name: {en: 'Bicycle', vi: 'Xe \u0111\u1ea1p'}, img: '1F6B2', attrs: {wheels: '2', travels: 'Road'},
       traits: [{en: 'You pedal it', vi: 'B\u1ea1n \u0111\u1ea1p b\u1eb1ng ch\u00e2n'},
                {en: 'Is powered by your legs', vi: 'Ch\u1ea1y b\u1eb1ng s\u1ee9c ch\u00e2n'}]},
      {name: {en: 'Car', vi: '\u00d4 t\u00f4'}, img: '1F697', attrs: {wheels: '4', travels: 'Road'},
       traits: [{en: 'Has four wheels', vi: 'C\u00f3 b\u1ed1n b\u00e1nh'},
                {en: 'Drives on roads', vi: 'Ch\u1ea1y tr\u00ean \u0111\u01b0\u1eddng'}]},
      {name: {en: 'Bus', vi: 'Xe bu\u00fdt'}, img: '1F68C', attrs: {wheels: '6', travels: 'Road'},
       traits: [{en: 'Carries many passengers', vi: 'Ch\u1edf nhi\u1ec1u h\u00e0nh kh\u00e1ch'},
                {en: 'Stops at bus stops', vi: 'D\u1eebng \u1edf tr\u1ea1m xe bu\u00fdt'}]},
      {name: {en: 'Ship', vi: 'T\u00e0u th\u1ee7y'}, img: '1F6A2', attrs: {wheels: '0', travels: 'Water'},
       traits: [{en: 'Floats on water', vi: 'N\u1ed5i tr\u00ean m\u1eb7t n\u01b0\u1edbc'},
                {en: 'Carries heavy cargo', vi: 'Ch\u1edf h\u00e0ng n\u1eb7ng'}]},
      {name: {en: 'Aeroplane', vi: 'M\u00e1y bay'}, img: '2708', attrs: {wheels: '0', travels: 'Sky'},
       traits: [{en: 'Flies through the sky', vi: 'Bay tr\u00ean b\u1ea7u tr\u1eddi'},
                {en: 'Has wings and engines', vi: 'C\u00f3 c\u00e1nh v\u00e0 \u0111\u1ed9ng c\u01a1'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 6
  {
    topic: {en: 'Sea Animals', vi: '\u0110\u1ed9ng v\u1eadt bi\u1ec3n'},
    blurb: {
      en: 'Deeper water: 6 items, 2 answer fields, 2 traits each.',
      vi: 'Xu\u1ed1ng n\u01b0\u1edbc s\u00e2u h\u01a1n: 6 \u0111\u1ed1i t\u01b0\u1ee3ng, 2 \u00f4 tr\u1ea3 l\u1eddi, 2 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'limbs', label: {en: 'arms or legs', vi: 's\u1ed1 tay ho\u1eb7c ch\u00e2n'}, options: ['0', '8', '10']},
      {key: 'breathes', label: {en: 'breathes with', vi: 'th\u1edf b\u1eb1ng'}, options: [
        {value: 'Gills', label: {en: 'Gills', vi: 'Mang'}},
        {value: 'Lungs', label: {en: 'Lungs', vi: 'Ph\u1ed5i'}},
      ]},
    ],
    items: [
      {name: {en: 'Tropical Fish', vi: 'C\u00e1 nhi\u1ec7t \u0111\u1edbi'}, img: '1F420', attrs: {limbs: '0', breathes: 'Gills'},
       traits: [{en: 'Has fins and scales', vi: 'C\u00f3 v\u00e2y v\u00e0 v\u1ea3y'},
                {en: 'Swims in groups called schools', vi: 'B\u01a1i th\u00e0nh \u0111\u00e0n'}]},
      {name: {en: 'Octopus', vi: 'B\u1ea1ch tu\u1ed9c'}, img: '1F419', attrs: {limbs: '8', breathes: 'Gills'},
       traits: [{en: 'Has eight arms', vi: 'C\u00f3 t\u00e1m x\u00fac tu'},
                {en: 'Can squirt ink', vi: 'C\u00f3 th\u1ec3 phun m\u1ef1c'}]},
      {name: {en: 'Crab', vi: 'Cua'}, img: '1F980', attrs: {limbs: '10', breathes: 'Gills'},
       traits: [{en: 'Has hard claws', vi: 'C\u00f3 c\u00e0ng c\u1ee9ng'},
                {en: 'Walks sideways', vi: '\u0110i ngang'}]},
      {name: {en: 'Dolphin', vi: 'C\u00e1 heo'}, img: '1F42C', attrs: {limbs: '0', breathes: 'Lungs'},
       traits: [{en: 'Is very intelligent', vi: 'R\u1ea5t th\u00f4ng minh'},
                {en: 'Comes to the surface for air', vi: 'Ngoi l\u00ean m\u1eb7t n\u01b0\u1edbc \u0111\u1ec3 th\u1edf'}]},
      {name: {en: 'Whale', vi: 'C\u00e1 voi'}, img: '1F40B', attrs: {limbs: '0', breathes: 'Lungs'},
       traits: [{en: 'Is the largest animal on Earth', vi: 'L\u00e0 lo\u00e0i v\u1eadt l\u1edbn nh\u1ea5t Tr\u00e1i \u0110\u1ea5t'},
                {en: 'Breathes through a blowhole', vi: 'Th\u1edf qua l\u1ed7 phun tr\u00ean \u0111\u1ea7u'}]},
      {name: {en: 'Shrimp', vi: 'T\u00f4m'}, img: '1F990', attrs: {limbs: '10', breathes: 'Gills'},
       traits: [{en: 'Is quite small', vi: 'Kh\u00e1 nh\u1ecf'},
                {en: 'Turns pink when cooked', vi: 'Chuy\u1ec3n sang m\u00e0u h\u1ed3ng khi n\u1ea5u ch\u00edn'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 7
  {
    topic: {en: 'Birds', vi: 'C\u00e1c lo\u00e0i chim'},
    blurb: {
      en: 'Three traits each now: 7 items, 2 answer fields, 3 traits each.',
      vi: 'Gi\u1edd m\u1ed7i con 3 \u0111\u1eb7c \u0111i\u1ec3m: 7 \u0111\u1ed1i t\u01b0\u1ee3ng, 2 \u00f4 tr\u1ea3 l\u1eddi, 3 \u0111\u1eb7c \u0111i\u1ec3m.',
    },
    attributes: [
      {key: 'canFly', label: {en: 'can fly?', vi: 'bi\u1ebft bay?'}, options: [
        {value: 'Yes', label: {en: 'Yes', vi: 'C\u00f3'}},
        {value: 'No', label: {en: 'No', vi: 'Kh\u00f4ng'}},
      ]},
      {key: 'size', label: {en: 'size', vi: 'k\u00edch th\u01b0\u1edbc'}, options: [
        {value: 'Small', label: {en: 'Small', vi: 'Nh\u1ecf'}},
        {value: 'Medium', label: {en: 'Medium', vi: 'V\u1eeba'}},
        {value: 'Large', label: {en: 'Large', vi: 'L\u1edbn'}},
      ]},
    ],
    items: [
      {name: {en: 'Eagle', vi: '\u0110\u1ea1i b\u00e0ng'}, img: '1F985', attrs: {canFly: 'Yes', size: 'Large'},
       traits: [{en: 'Is a bird of prey', vi: 'L\u00e0 lo\u00e0i chim s\u0103n m\u1ed3i'},
                {en: 'Has sharp talons', vi: 'C\u00f3 m\u00f3ng vu\u1ed1t s\u1eafc'},
                {en: 'Has excellent eyesight', vi: 'C\u00f3 th\u1ecb l\u1ef1c tuy\u1ec7t v\u1eddi'}]},
      {name: {en: 'Owl', vi: 'C\u00fa m\u00e8o'}, img: '1F989', attrs: {canFly: 'Yes', size: 'Medium'},
       traits: [{en: 'Is awake at night', vi: 'Th\u1ee9c v\u00e0o ban \u0111\u00eam'},
                {en: 'Can turn its head far around', vi: 'C\u00f3 th\u1ec3 xoay \u0111\u1ea7u r\u1ea5t r\u1ed9ng'},
                {en: 'Says "hoot"', vi: 'K\u00eau \u201cc\u00fa c\u00fa\u201d'}]},
      {name: {en: 'Penguin', vi: 'Chim c\u00e1nh c\u1ee5t'}, img: '1F427', attrs: {canFly: 'No', size: 'Medium'},
       traits: [{en: 'Cannot fly', vi: 'Kh\u00f4ng bi\u1ebft bay'},
                {en: 'Lives where it is very cold', vi: 'S\u1ed1ng \u1edf n\u01a1i r\u1ea5t l\u1ea1nh'},
                {en: 'Is an excellent swimmer', vi: 'B\u01a1i r\u1ea5t gi\u1ecfi'}]},
      {name: {en: 'Parrot', vi: 'V\u1eb9t'}, img: '1F99C', attrs: {canFly: 'Yes', size: 'Small'},
       traits: [{en: 'Has bright colourful feathers', vi: 'C\u00f3 b\u1ed9 l\u00f4ng s\u1eb7c s\u1ee1'},
                {en: 'Can copy sounds and words', vi: 'C\u00f3 th\u1ec3 b\u1eaft ch\u01b0\u1edbc \u00e2m thanh v\u00e0 l\u1eddi n\u00f3i'},
                {en: 'Lives in warm forests', vi: 'S\u1ed1ng trong r\u1eebng \u1ea5m \u00e1p'}]},
      {name: {en: 'Flamingo', vi: 'H\u1ed3ng h\u1ea1c'}, img: '1F9A9', attrs: {canFly: 'Yes', size: 'Large'},
       traits: [{en: 'Is pink', vi: 'C\u00f3 m\u00e0u h\u1ed3ng'},
                {en: 'Often stands on one leg', vi: 'Th\u01b0\u1eddng \u0111\u1ee9ng b\u1eb1ng m\u1ed9t ch\u00e2n'},
                {en: 'Eats with its head upside down', vi: '\u0102n b\u1eb1ng c\u00e1ch ch\u00fai \u0111\u1ea7u xu\u1ed1ng'}]},
      {name: {en: 'Swan', vi: 'Thi\u00ean nga'}, img: '1F9A2', attrs: {canFly: 'Yes', size: 'Large'},
       traits: [{en: 'Has a long graceful neck', vi: 'C\u00f3 chi\u1ebfc c\u1ed5 d\u00e0i duy\u00ean d\u00e1ng'},
                {en: 'Glides on water', vi: 'L\u01b0\u1edbt tr\u00ean m\u1eb7t n\u01b0\u1edbc'},
                {en: 'Is usually white', vi: 'Th\u01b0\u1eddng c\u00f3 m\u00e0u tr\u1eafng'}]},
      {name: {en: 'Peacock', vi: 'C\u00f4ng'}, img: '1F99A', attrs: {canFly: 'Yes', size: 'Large'},
       traits: [{en: 'Has a fan of tail feathers', vi: 'C\u00f3 chi\u1ebfc \u0111u\u00f4i x\u00f2e nh\u01b0 qu\u1ea1t'},
                {en: 'Spreads its feathers to show off', vi: 'X\u00f2e l\u00f4ng \u0111\u1ec3 khoe'},
                {en: 'Is a kind of pheasant', vi: 'L\u00e0 m\u1ed9t lo\u00e0i thu\u1ed9c h\u1ecd tr\u0129'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 8
  {
    topic: {en: 'Animal Kingdom', vi: 'Th\u1ebf gi\u1edbi \u0111\u1ed9ng v\u1eadt'},
    blurb: {
      en: 'The grand finale: 8 items, 3 answer fields, 3 traits each.',
      vi: 'M\u00e0n k\u1ebft ho\u00e0nh tr\u00e1ng: 8 \u0111\u1ed1i t\u01b0\u1ee3ng, 3 \u00f4 tr\u1ea3 l\u1eddi, 3 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '2', '4', '6']},
      {key: 'habitat', label: {en: 'lives in / on', vi: 's\u1ed1ng \u1edf'}, options: [
        {value: 'Land', label: {en: 'Land', vi: 'Tr\u00ean c\u1ea1n'}},
        {value: 'Water', label: {en: 'Water', vi: 'D\u01b0\u1edbi n\u01b0\u1edbc'}},
        {value: 'Air', label: {en: 'Air', vi: 'Tr\u00ean kh\u00f4ng'}},
      ]},
      {key: 'diet', label: {en: 'mainly eats', vi: 'ch\u1ee7 y\u1ebfu \u0103n'}, options: [
        {value: 'Plants', label: {en: 'Plants', vi: 'Th\u1ef1c v\u1eadt'}},
        {value: 'Meat', label: {en: 'Meat', vi: 'Th\u1ecbt'}},
      ]},
    ],
    items: [
      {name: {en: 'Eagle', vi: '\u0110\u1ea1i b\u00e0ng'}, img: '1F985', attrs: {legs: '2', habitat: 'Air', diet: 'Meat'},
       traits: [{en: 'Soars high in the sky', vi: 'Bay l\u01b0\u1ee3n cao tr\u00ean tr\u1eddi'},
                {en: 'Has powerful talons', vi: 'C\u00f3 m\u00f3ng vu\u1ed1t m\u1ea1nh m\u1ebd'},
                {en: 'Hunts small animals', vi: 'S\u0103n c\u00e1c con v\u1eadt nh\u1ecf'}]},
      {name: {en: 'Shark', vi: 'C\u00e1 m\u1eadp'}, img: '1F988', attrs: {legs: '0', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Lives in the ocean', vi: 'S\u1ed1ng \u1edf \u0111\u1ea1i d\u01b0\u01a1ng'},
                {en: 'Has rows of sharp teeth', vi: 'C\u00f3 nhi\u1ec1u h\u00e0ng r\u0103ng s\u1eafc'},
                {en: 'Is a kind of fish', vi: 'L\u00e0 m\u1ed9t lo\u00e0i c\u00e1'}]},
      {name: {en: 'Elephant', vi: 'Voi'}, img: '1F418', attrs: {legs: '4', habitat: 'Land', diet: 'Plants'},
       traits: [{en: 'Is the largest land animal', vi: 'L\u00e0 lo\u00e0i v\u1eadt tr\u00ean c\u1ea1n l\u1edbn nh\u1ea5t'},
                {en: 'Has a long trunk', vi: 'C\u00f3 v\u00f2i d\u00e0i'},
                {en: 'Eats grass and leaves', vi: '\u0102n c\u1ecf v\u00e0 l\u00e1 c\u00e2y'}]},
      {name: {en: 'Frog', vi: '\u1ebach'}, img: '1F438', attrs: {legs: '4', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Can leap a long way', vi: 'C\u00f3 th\u1ec3 nh\u1ea3y r\u1ea5t xa'},
                {en: 'Begins life as a tadpole', vi: 'Kh\u1edfi \u0111\u1ea7u l\u00e0 n\u00f2ng n\u1ecdc'},
                {en: 'Catches insects with its tongue', vi: 'B\u1eaft c\u00f4n tr\u00f9ng b\u1eb1ng l\u01b0\u1ee1i'}]},
      {name: {en: 'Bee', vi: 'Ong'}, img: '1F41D', attrs: {legs: '6', habitat: 'Air', diet: 'Plants'},
       traits: [{en: 'Makes honey', vi: 'L\u00e0m ra m\u1eadt ong'},
                {en: 'Can sting to defend itself', vi: 'C\u00f3 th\u1ec3 ch\u00edch \u0111\u1ec3 t\u1ef1 v\u1ec7'},
                {en: 'Carries pollen between flowers', vi: 'Mang ph\u1ea5n hoa gi\u1eefa c\u00e1c b\u00f4ng hoa'}]},
      {name: {en: 'Crocodile', vi: 'C\u00e1 s\u1ea5u'}, img: '1F40A', attrs: {legs: '4', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Is a large reptile', vi: 'L\u00e0 lo\u00e0i b\u00f2 s\u00e1t l\u1edbn'},
                {en: 'Has a powerful bite', vi: 'C\u00f3 c\u00fa c\u1eafn m\u1ea1nh'},
                {en: 'Waits quietly in rivers', vi: 'R\u00ecnh l\u1eb7ng l\u1ebd d\u01b0\u1edbi s\u00f4ng'}]},
      {name: {en: 'Camel', vi: 'L\u1ea1c \u0111\u00e0'}, img: '1F42A', attrs: {legs: '4', habitat: 'Land', diet: 'Plants'},
       traits: [{en: 'Lives in the desert', vi: 'S\u1ed1ng \u1edf sa m\u1ea1c'},
                {en: 'Has one or two humps', vi: 'C\u00f3 m\u1ed9t ho\u1eb7c hai b\u01b0\u1edbu'},
                {en: 'Can go a long time without water', vi: 'C\u00f3 th\u1ec3 nh\u1ecbn n\u01b0\u1edbc r\u1ea5t l\u00e2u'}]},
      {name: {en: 'Penguin', vi: 'Chim c\u00e1nh c\u1ee5t'}, img: '1F427', attrs: {legs: '2', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Cannot fly', vi: 'Kh\u00f4ng bi\u1ebft bay'},
                {en: 'Lives where it is cold', vi: 'S\u1ed1ng \u1edf n\u01a1i l\u1ea1nh gi\u00e1'},
                {en: 'Swims to catch fish', vi: 'B\u01a1i \u0111i b\u1eaft c\u00e1'}]},
    ],
  },

  // ---------------------------------------------------------------- Puzzle 9
  {
    topic: {en: 'Around the World Animals', vi: '\u0110\u1ed9ng v\u1eadt kh\u1eafp th\u1ebf gi\u1edbi'},
    blurb: {
      en: 'Harder still: 9 items, 3 answer fields, 3 traits each.',
      vi: 'Kh\u00f3 h\u01a1n n\u1eefa: 9 \u0111\u1ed1i t\u01b0\u1ee3ng, 3 \u00f4 tr\u1ea3 l\u1eddi, 3 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i con.',
    },
    attributes: [
      {key: 'legs', label: {en: 'number of legs', vi: 's\u1ed1 ch\u00e2n'}, options: ['0', '2', '4', '6', '8']},
      {key: 'habitat', label: {en: 'lives in / on', vi: 's\u1ed1ng \u1edf'}, options: [
        {value: 'Land', label: {en: 'Land', vi: 'Tr\u00ean c\u1ea1n'}},
        {value: 'Water', label: {en: 'Water', vi: 'D\u01b0\u1edbi n\u01b0\u1edbc'}},
        {value: 'Air', label: {en: 'Air', vi: 'Tr\u00ean kh\u00f4ng'}},
      ]},
      {key: 'diet', label: {en: 'mainly eats', vi: 'ch\u1ee7 y\u1ebfu \u0103n'}, options: [
        {value: 'Plants', label: {en: 'Plants', vi: 'Th\u1ef1c v\u1eadt'}},
        {value: 'Meat', label: {en: 'Meat', vi: 'Th\u1ecbt'}},
      ]},
    ],
    items: [
      {name: {en: 'Bee', vi: 'Ong'}, img: '1F41D', attrs: {legs: '6', habitat: 'Air', diet: 'Plants'},
       traits: [{en: 'Makes honey', vi: 'L\u00e0m ra m\u1eadt ong'},
                {en: 'Can sting', vi: 'C\u00f3 th\u1ec3 ch\u00edch'},
                {en: 'Visits many flowers', vi: 'Gh\u00e9 th\u0103m nhi\u1ec1u b\u00f4ng hoa'}]},
      {name: {en: 'Spider', vi: 'Nh\u1ec7n'}, img: '1F577', attrs: {legs: '8', habitat: 'Land', diet: 'Meat'},
       traits: [{en: 'Spins a web', vi: 'Gi\u0103ng t\u01a1'},
                {en: 'Has eight legs', vi: 'C\u00f3 t\u00e1m ch\u00e2n'},
                {en: 'Is not an insect', vi: 'Kh\u00f4ng ph\u1ea3i c\u00f4n tr\u00f9ng'}]},
      {name: {en: 'Eagle', vi: '\u0110\u1ea1i b\u00e0ng'}, img: '1F985', attrs: {legs: '2', habitat: 'Air', diet: 'Meat'},
       traits: [{en: 'Soars high', vi: 'Bay l\u01b0\u1ee3n tr\u00ean cao'},
                {en: 'Has sharp talons', vi: 'C\u00f3 m\u00f3ng vu\u1ed1t s\u1eafc'},
                {en: 'Hunts from the sky', vi: 'S\u0103n m\u1ed3i t\u1eeb tr\u00ean tr\u1eddi'}]},
      {name: {en: 'Turtle', vi: 'R\u00f9a'}, img: '1F422', attrs: {legs: '4', habitat: 'Water', diet: 'Plants'},
       traits: [{en: 'Has a hard shell', vi: 'C\u00f3 mai c\u1ee9ng'},
                {en: 'Moves slowly', vi: 'Di chuy\u1ec3n ch\u1eadm'},
                {en: 'Can live very long', vi: 'C\u00f3 th\u1ec3 s\u1ed1ng r\u1ea5t th\u1ecd'}]},
      {name: {en: 'Shark', vi: 'C\u00e1 m\u1eadp'}, img: '1F988', attrs: {legs: '0', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Lives in the ocean', vi: 'S\u1ed1ng \u1edf \u0111\u1ea1i d\u01b0\u01a1ng'},
                {en: 'Has sharp teeth', vi: 'C\u00f3 h\u00e0m r\u0103ng s\u1eafc'},
                {en: 'Is a fish', vi: 'L\u00e0 m\u1ed9t lo\u00e0i c\u00e1'}]},
      {name: {en: 'Tiger', vi: 'H\u1ed5'}, img: '1F405', attrs: {legs: '4', habitat: 'Land', diet: 'Meat'},
       traits: [{en: 'Has stripes', vi: 'C\u00f3 v\u1eb1n'},
                {en: 'Is a big cat', vi: 'L\u00e0 m\u1ed9t lo\u00e0i m\u00e8o l\u1edbn'},
                {en: 'Hunts other animals', vi: 'S\u0103n c\u00e1c con v\u1eadt kh\u00e1c'}]},
      {name: {en: 'Kangaroo', vi: 'Chu\u1ed9t t\u00fai'}, img: '1F998', attrs: {legs: '2', habitat: 'Land', diet: 'Plants'},
       traits: [{en: 'Hops to move', vi: 'Nh\u1ea3y \u0111\u1ec3 di chuy\u1ec3n'},
                {en: 'Carries its baby in a pouch', vi: 'Mang con trong t\u00fai'},
                {en: 'Lives in Australia', vi: 'S\u1ed1ng \u1edf n\u01b0\u1edbc \u00dac'}]},
      {name: {en: 'Octopus', vi: 'B\u1ea1ch tu\u1ed9c'}, img: '1F419', attrs: {legs: '8', habitat: 'Water', diet: 'Meat'},
       traits: [{en: 'Has eight arms', vi: 'C\u00f3 t\u00e1m x\u00fac tu'},
                {en: 'Can squirt ink', vi: 'C\u00f3 th\u1ec3 phun m\u1ef1c'},
                {en: 'Is very clever', vi: 'R\u1ea5t th\u00f4ng minh'}]},
      {name: {en: 'Snail', vi: '\u1ed0c s\u00ean'}, img: '1F40C', attrs: {legs: '0', habitat: 'Land', diet: 'Plants'},
       traits: [{en: 'Carries its shell', vi: 'Mang theo v\u1ecf \u1ed1c'},
                {en: 'Moves very slowly', vi: 'Di chuy\u1ec3n r\u1ea5t ch\u1eadm'},
                {en: 'Eats leaves', vi: '\u0102n l\u00e1 c\u00e2y'}]},
    ],
  },

  // --------------------------------------------------------------- Puzzle 10
  {
    topic: {en: 'Vehicles & Transport', vi: 'Xe c\u1ed9 & giao th\u00f4ng'},
    blurb: {
      en: 'The toughest: 10 items, 4 answer fields, 4 traits each.',
      vi: 'Kh\u00f3 nh\u1ea5t: 10 \u0111\u1ed1i t\u01b0\u1ee3ng, 4 \u00f4 tr\u1ea3 l\u1eddi, 4 \u0111\u1eb7c \u0111i\u1ec3m m\u1ed7i \u0111\u1ed1i t\u01b0\u1ee3ng.',
    },
    attributes: [
      {key: 'wheels', label: {en: 'number of wheels', vi: 's\u1ed1 b\u00e1nh xe'}, options: ['0', '2', '3', '4', '6', '8']},
      {key: 'travels', label: {en: 'travels by', vi: 'di chuy\u1ec3n b\u1eb1ng'}, options: [
        {value: 'Road', label: {en: 'Road', vi: '\u0110\u01b0\u1eddng b\u1ed9'}},
        {value: 'Water', label: {en: 'Water', vi: 'M\u1eb7t n\u01b0\u1edbc'}},
        {value: 'Sky', label: {en: 'Sky', vi: 'B\u1ea7u tr\u1eddi'}},
        {value: 'Rail', label: {en: 'Rail', vi: '\u0110\u01b0\u1eddng s\u1eaft'}},
      ]},
      {key: 'power', label: {en: 'powered by', vi: 'ch\u1ea1y b\u1eb1ng'}, options: [
        {value: 'Engine', label: {en: 'Engine', vi: '\u0110\u1ed9ng c\u01a1'}},
        {value: 'Human', label: {en: 'Human', vi: 'S\u1ee9c ng\u01b0\u1eddi'}},
        {value: 'Wind', label: {en: 'Wind', vi: 'S\u1ee9c gi\u00f3'}},
      ]},
      {key: 'size', label: {en: 'size', vi: 'k\u00edch th\u01b0\u1edbc'}, options: [
        {value: 'Small', label: {en: 'Small', vi: 'Nh\u1ecf'}},
        {value: 'Medium', label: {en: 'Medium', vi: 'V\u1eeba'}},
        {value: 'Large', label: {en: 'Large', vi: 'L\u1edbn'}},
      ]},
    ],
    items: [
      {name: {en: 'Bicycle', vi: 'Xe \u0111\u1ea1p'}, img: '1F6B2', attrs: {wheels: '2', travels: 'Road', power: 'Human', size: 'Small'},
       traits: [{en: 'You pedal it', vi: 'B\u1ea1n \u0111\u1ea1p b\u1eb1ng ch\u00e2n'},
                {en: 'Has two wheels', vi: 'C\u00f3 hai b\u00e1nh'},
                {en: 'Is good exercise', vi: 'L\u00e0 b\u00e0i t\u1eadp th\u1ec3 d\u1ee5c t\u1ed1t'},
                {en: 'Has no engine', vi: 'Kh\u00f4ng c\u00f3 \u0111\u1ed9ng c\u01a1'}]},
      {name: {en: 'Car', vi: '\u00d4 t\u00f4'}, img: '1F697', attrs: {wheels: '4', travels: 'Road', power: 'Engine', size: 'Medium'},
       traits: [{en: 'Has four wheels', vi: 'C\u00f3 b\u1ed1n b\u00e1nh'},
                {en: 'Runs on fuel', vi: 'Ch\u1ea1y b\u1eb1ng nhi\u00ean li\u1ec7u'},
                {en: 'Drives on roads', vi: 'Ch\u1ea1y tr\u00ean \u0111\u01b0\u1eddng'},
                {en: 'Carries a few people', vi: 'Ch\u1edf v\u00e0i ng\u01b0\u1eddi'}]},
      {name: {en: 'Bus', vi: 'Xe bu\u00fdt'}, img: '1F68C', attrs: {wheels: '6', travels: 'Road', power: 'Engine', size: 'Large'},
       traits: [{en: 'Carries many passengers', vi: 'Ch\u1edf nhi\u1ec1u h\u00e0nh kh\u00e1ch'},
                {en: 'Stops at bus stops', vi: 'D\u1eebng \u1edf tr\u1ea1m xe bu\u00fdt'},
                {en: 'Follows a bus route', vi: 'Ch\u1ea1y theo tuy\u1ebfn xe bu\u00fdt'},
                {en: 'Is long and big', vi: 'D\u00e0i v\u00e0 to'}]},
      {name: {en: 'Motorcycle', vi: 'Xe m\u00e1y'}, img: '1F3CD', attrs: {wheels: '2', travels: 'Road', power: 'Engine', size: 'Small'},
       traits: [{en: 'Has handlebars to steer', vi: 'C\u00f3 tay l\u00e1i \u0111\u1ec3 \u0111i\u1ec1u khi\u1ec3n'},
                {en: 'You wear a helmet', vi: 'B\u1ea1n \u0111\u1ed9i m\u0169 b\u1ea3o hi\u1ec3m'},
                {en: 'Has an engine', vi: 'C\u00f3 \u0111\u1ed9ng c\u01a1'},
                {en: 'Is fast and small', vi: 'Nhanh v\u00e0 nh\u1ecf g\u1ecdn'}]},
      {name: {en: 'Truck', vi: 'Xe t\u1ea3i'}, img: '1F69A', attrs: {wheels: '6', travels: 'Road', power: 'Engine', size: 'Large'},
       traits: [{en: 'Carries heavy goods', vi: 'Ch\u1edf h\u00e0ng n\u1eb7ng'},
                {en: 'Has many wheels', vi: 'C\u00f3 nhi\u1ec1u b\u00e1nh'},
                {en: 'Hauls cargo on highways', vi: 'Ch\u1edf h\u00e0ng tr\u00ean xa l\u1ed9'},
                {en: 'Is very large', vi: 'R\u1ea5t to l\u1edbn'}]},
      {name: {en: 'Train', vi: 'T\u00e0u h\u1ecfa'}, img: '1F686', attrs: {wheels: '8', travels: 'Rail', power: 'Engine', size: 'Large'},
       traits: [{en: 'Runs on rails', vi: 'Ch\u1ea1y tr\u00ean \u0111\u01b0\u1eddng ray'},
                {en: 'Has many carriages', vi: 'C\u00f3 nhi\u1ec1u toa'},
                {en: 'Carries many people', vi: 'Ch\u1edf nhi\u1ec1u ng\u01b0\u1eddi'},
                {en: 'Is very long', vi: 'R\u1ea5t d\u00e0i'}]},
      {name: {en: 'Ship', vi: 'T\u00e0u th\u1ee7y'}, img: '1F6A2', attrs: {wheels: '0', travels: 'Water', power: 'Engine', size: 'Large'},
       traits: [{en: 'Floats on water', vi: 'N\u1ed5i tr\u00ean m\u1eb7t n\u01b0\u1edbc'},
                {en: 'Transports freight by sea', vi: 'V\u1eadn chuy\u1ec3n h\u00e0ng h\u00f3a qua bi\u1ec3n'},
                {en: 'Has no wheels', vi: 'Kh\u00f4ng c\u00f3 b\u00e1nh xe'},
                {en: 'Travels across the sea', vi: '\u0110i qua bi\u1ec3n'}]},
      {name: {en: 'Sailboat', vi: 'Thuy\u1ec1n bu\u1ed3m'}, img: '26F5', attrs: {wheels: '0', travels: 'Water', power: 'Wind', size: 'Medium'},
       traits: [{en: 'Has sails', vi: 'C\u00f3 bu\u1ed3m'},
                {en: 'Is pushed by the wind', vi: '\u0110\u01b0\u1ee3c gi\u00f3 \u0111\u1ea9y \u0111i'},
                {en: 'Glides across the waves', vi: 'L\u01b0\u1edbt tr\u00ean m\u1eb7t s\u00f3ng'},
                {en: 'Uses wind power alone', vi: 'Ch\u1ec9 d\u00f9ng s\u1ee9c gi\u00f3'}]},
      {name: {en: 'Aeroplane', vi: 'M\u00e1y bay'}, img: '2708', attrs: {wheels: '0', travels: 'Sky', power: 'Engine', size: 'Large'},
       traits: [{en: 'Flies in the sky', vi: 'Bay tr\u00ean b\u1ea7u tr\u1eddi'},
                {en: 'Has wings', vi: 'C\u00f3 c\u00e1nh'},
                {en: 'Crosses oceans quickly', vi: 'V\u01b0\u1ee3t \u0111\u1ea1i d\u01b0\u01a1ng nhanh ch\u00f3ng'},
                {en: 'Has rows of seats', vi: 'C\u00f3 nhi\u1ec1u h\u00e0ng gh\u1ebf ng\u1ed3i'}]},
      {name: {en: 'Helicopter', vi: 'Tr\u1ef1c th\u0103ng'}, img: '1F681', attrs: {wheels: '0', travels: 'Sky', power: 'Engine', size: 'Medium'},
       traits: [{en: 'Has spinning blades', vi: 'C\u00f3 c\u00e1nh qu\u1ea1t quay'},
                {en: 'Can hover in place', vi: 'C\u00f3 th\u1ec3 bay \u0111\u1ee9ng y\u00ean'},
                {en: 'Rescues people from high places', vi: 'C\u1ee9u ng\u01b0\u1eddi \u1edf n\u01a1i cao'},
                {en: 'Takes off straight up', vi: 'C\u1ea5t c\u00e1nh th\u1eb3ng \u0111\u1ee9ng'}]},
    ],
  },
];

// Helpers for working with attribute options that may be strings or objects.
function optionValue(opt) {
  return (typeof opt === 'string') ? opt : opt.value;
}
function optionLabel(opt) {
  return (typeof opt === 'string') ? opt : (window.I18N ? window.I18N.t(opt.label) : opt.label.en);
}

// Total number of gradable units in a puzzle: one picture per item, one point
// per answer-field drop-down, plus one block per trait.
function puzzleTotalBlocks(puzzle) {
  let traits = 0;
  for (const item of puzzle.items) {
    traits += item.traits.length;
  }
  const n = puzzle.items.length;
  return n + n * puzzle.attributes.length + traits;
}

if (typeof window !== 'undefined') {
  window.PUZZLES = PUZZLES;
  window.optionValue = optionValue;
  window.optionLabel = optionLabel;
  window.puzzleTotalBlocks = puzzleTotalBlocks;
}
