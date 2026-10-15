// P3: Game of K.W.A.D — penalty letters (K -> W -> A -> D), the
// "first player holding all four letters loses" rule, and the rendered board.
// Extracts the real helpers, kwadNewTrick, kwadRound and renderKwad from app.js
// and drives them against stubs, so we test the shipped logic, not a copy.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

// Test constants (matching app.js)
const KWAD_LETTERS = 'KWAD';
const PILOT_PALETTE = ['#20c4c4', '#ff7a1a'];
const KWAD_CATEGORIES = {
  basics: {
    id: 'basics', label: 'Basics', emoji: '🟢', difficulty: 1, enabled: true,
    tricks: [
      { name: 'Dive', desc: 'Steiler Sturzflug' },
      { name: 'Punch Out', desc: 'Schneller Vorwärts-Schub' },
      { name: 'Gate Roll', desc: 'Eine Rolle im Tor' },
    ]
  },
  intermediate: {
    id: 'intermediate', label: 'Intermediate', emoji: '🟡', difficulty: 2, enabled: true,
    tricks: [
      { name: 'Power Loop', desc: 'Looping über das Tor' },
      { name: 'Split-S', desc: 'Halber Loop nach unten' },
    ]
  },
  advanced: {
    id: 'advanced', label: 'Advanced', emoji: '🟠', difficulty: 3, enabled: true,
    tricks: [
      { name: 'Matty Flip', desc: 'Rückwärts-Flip mit Yaw' },
    ]
  },
  pro: {
    id: 'pro', label: 'Pro', emoji: '🔴', difficulty: 4, enabled: false,
    tricks: [
      { name: 'Rubik\'s Cube', desc: '3 Achsen nacheinander' },
    ]
  },
  custom: {
    id: 'custom', label: 'Eigene Tricks', emoji: '⭐', difficulty: 0, enabled: true, tricks: []
  }
};

function kwadBuildTrickPool() {
  const pool = [];
  Object.values(KWAD_CATEGORIES).forEach(cat => {
    if (cat.enabled && cat.tricks.length) {
      cat.tricks.forEach(t => pool.push({ ...t, category: cat.id }));
    }
  });
  return pool;
}

const body = [
  'let kwadPlayers = [], kwadTurnIdx = 0, kwadTrick = "", kwadTried = [], kwadLastTrick = -1, kwadTrickObj = null, kwadTrickPool = [], kwadMode = "random", kwadCategoryOrder = [], kwadCategoryIdx = 0, kwadStats = {}, kwadLastPenalty = null;',
  'let newTrickCalls = 0;',
  'const KWAD_CATEGORIES = ' + JSON.stringify(KWAD_CATEGORIES) + ';',
  'function kwadBuildTrickPool() { const pool = []; Object.values(KWAD_CATEGORIES).forEach(cat => { if (cat.enabled && cat.tricks.length) { cat.tricks.forEach(t => pool.push({ ...t, category: cat.id })); } }); return pool; }',
  'kwadTrickPool = kwadBuildTrickPool();',
  extract('kwadNormalizeLetters'),
  extract('kwadIsOut'),
  extract('kwadNextLetter'),
  extract('kwadDrawIndex'),
  extract('kwadLoserIndex'),
  extract('kwadActiveFrom'),
  extract('kwadActiveCount'),
  extract('kwadBuildTrickPool'),
  extract('kwadRecordStat'),
  extract('kwadSaveStats'),
  extract('kwadNewTrick').replace('function kwadNewTrick(', 'function kwadNewTrickImpl('),
  'function kwadNewTrick() { newTrickCalls++; return kwadNewTrickImpl(); }',
  extract('renderKwad'),
  extract('kwadRound'),
  [
    'var apiObj = {};',
    'apiObj.kwadNormalizeLetters = kwadNormalizeLetters;',
    'apiObj.kwadIsOut = kwadIsOut;',
    'apiObj.kwadNextLetter = kwadNextLetter;',
    'apiObj.kwadDrawIndex = kwadDrawIndex;',
    'apiObj.kwadLoserIndex = kwadLoserIndex;',
    'apiObj.kwadActiveFrom = kwadActiveFrom;',
    'apiObj.kwadBuildTrickPool = kwadBuildTrickPool;',
    'apiObj.kwadRecordStat = kwadRecordStat;',
    'apiObj.kwadSaveStats = kwadSaveStats;',
    'apiObj.renderKwad = renderKwad;',
    'apiObj.kwadRound = kwadRound;',
    'apiObj.kwadNewTrick = kwadNewTrick;',
    'apiObj.setGame = function(players, turn) { kwadPlayers = players; kwadTurnIdx = turn | 0; kwadTried = []; newTrickCalls = 0; kwadTrick = "Test Trick"; kwadTrickObj = { name: "Test Trick" }; kwadTrickPool = kwadBuildTrickPool(); };',
    'apiObj.players = function() { return kwadPlayers; };',
    'apiObj.turn = function() { return kwadTurnIdx; };',
    'apiObj.tried = function() { return kwadTried; };',
    'apiObj.newTrickCalls = function() { return newTrickCalls; };',
    'return apiObj;',
  ].join('\n'),
].join('\n');

function extract(name) {
  const key = 'function ' + name + '(';
  const start = src.indexOf(key);
  if (start < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('{', start), depth = 0;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

// ---- minimal DOM stub ------------------------------------------------------
function makeEl(tag) {
  const el = {
    tag, children: [], className: '', title: '', type: '', disabled: false, hidden: false, _text: '',
    attrs: {},
    classList: { _s: new Set(), add(c) { this._s.add(c); }, contains(c) { return this._s.has(c); } },
    setAttribute(k, v) { el.attrs[k] = v; },
    appendChild(c) { el.children.push(c); return c; },
    addEventListener() {},
  };
  Object.defineProperty(el, 'textContent', {
    get() { return el._text; },
    set(v) { el._text = String(v); if (v === '') el.children = []; },
  });
  return el;
}
const els = {
  kwadScreen: makeEl('div'),
  kwadTrick: makeEl('div'),
  kwadPlayers: makeEl('div'),
  kwadResult: makeEl('div'),
  kwadTurnCard: makeEl('div'),
  kwadTurn: makeEl('div'),
  btnKwadDone: makeEl('button'),
  btnKwadFail: makeEl('button'),
};
const documentStub = { createElement: makeEl };

const factory = new Function('kwadSave', 'document', 'els', 'toast', 't', 'KWAD_LETTERS', 'KWAD_TRICKS', 'PILOT_PALETTE', body);
const api = factory(() => {}, documentStub, els, () => {}, k => k, 'KWAD', ['Power Loop', 'Split-S', 'Dive'], ['#20c4c4', '#ff7a1a']);

let pass = 0, fail = 0;
const check = (n, c) => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + n); };
const earned = row => row.children[1].children.filter(b => b.className === 'on').length;

// --- letters are sanitised and capped at four ------------------------------
check('L1: junk is stripped (kw.ax -> KWA)', api.kwadNormalizeLetters('kw.ax') === 'KWA');
check('L2: lowercase becomes uppercase', api.kwadNormalizeLetters('kwad') === 'KWAD');
check('L3: never more than four letters', api.kwadNormalizeLetters('KWADKWAD') === 'KWAD');
check('L4: non-letter input becomes empty', api.kwadNormalizeLetters('max!') === 'A');

// --- "out" means all four letters ------------------------------------------
check('O1: no letters -> not out', api.kwadIsOut('') === false);
check('O2: three letters -> not out', api.kwadIsOut('KWA') === false);
check('O3: four letters -> out', api.kwadIsOut('KWAD') === true);

// --- the penalty letter follows K -> W -> A -> D then stops -----------------
check('N1: first penalty is K', api.kwadNextLetter('') === 'K');
check('N2: after K comes W', api.kwadNextLetter('K') === 'W');
check('N3: after KW comes A', api.kwadNextLetter('KW') === 'A');
check('N4: after KWA comes D', api.kwadNextLetter('KWA') === 'D');
check('N5: after KWAD there is nothing', api.kwadNextLetter('KWAD') === '');

// --- trick draw never repeats the previous trick ---------------------------
let noRepeat = true, inRange = true, sawVariety = new Set();
for (let prev = -1; prev < 3; prev++) {
  for (let i = 0; i < 80; i++) {
    const idx = api.kwadDrawIndex(prev, 3);
    if (idx === prev) noRepeat = false;
    if (idx < 0 || idx >= 3) inRange = false;
    sawVariety.add(idx);
  }
}
check('D1: a fresh trick is never the previous one', noRepeat);
check('D2: drawn index stays in range', inRange);
check('D3: all pool entries can be drawn', sawVariety.size === 3);
check('D4: a single-trick pool stays at 0', api.kwadDrawIndex(-1, 1) === 0);

// --- who loses? the first player with four letters -------------------------
check('W1: nobody out yet -> -1', api.kwadLoserIndex([{ letters: '' }, { letters: 'KWA' }]) === -1);
check('W2: the player with KWAD is found', api.kwadLoserIndex([{ letters: 'K' }, { letters: 'KWAD' }]) === 1);

// --- a full two-player game through the real kwadRound ---------------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.renderKwad();
check('B1: one board row per player', els.kwadPlayers.children.length === 2);
check('B2: the board is cleared before each render', els.kwadPlayers.children.length === 2);
check('B3: the current player is highlighted', els.kwadPlayers.children[0].classList.contains('is-turn'));
check('B4: the other player is not', !els.kwadPlayers.children[1].classList.contains('is-turn'));
check('B5: the trick name is shown', els.kwadTrick.textContent === 'Test Trick');
check('B6: the turn shows the current player', els.kwadTurn.textContent === 'Max');
check('B7: four letter slots per player', els.kwadPlayers.children[0].children[1].children.length === 4);
check('B8: no letters earned yet', earned(els.kwadPlayers.children[0]) === 0);
check('B9: play buttons are enabled with 2 players', els.btnKwadDone.disabled === false && els.btnKwadFail.disabled === false);
check('B10: no result banner while playing', els.kwadResult.hidden === true);

api.kwadRound(false);                                    // Max fails -> K, turn Lea
check('G1: Max gets K', api.players()[0].letters === 'K');
check('G2: turn switches to Lea', api.turn() === 1);
check('G3: the board shows one earned letter', earned(els.kwadPlayers.children[0]) === 1);
check('G4: the highlight moved to Lea', els.kwadPlayers.children[1].classList.contains('is-turn'));
api.kwadRound(false);                                    // Lea fails -> K, round over -> new trick
check('G5: Lea gets K', api.players()[1].letters === 'K');
check('G6: a new trick is drawn after everyone had a go', api.newTrickCalls() === 1);
check('G7: the next round starts at Max', api.turn() === 0);
check('G8: the round list is reset for the new trick', api.tried().length === 0);
api.kwadRound(false);                                    // Max K -> KW
api.kwadRound(false);                                    // Lea K -> KW
api.kwadRound(false);                                    // Max KW -> KWA
api.kwadRound(false);                                    // Lea KW -> KWA
api.kwadRound(false);                                    // Max KWA -> KWAD -> loses
check('G9: Max ends with KWAD', api.players()[0].letters === 'KWAD');
check('G10: Max is the loser', api.kwadLoserIndex(api.players()) === 0);
check('G11: the game is over (no further new trick)', api.newTrickCalls() === 3);
check('G12: the result banner names the loser', els.kwadResult.hidden === false && els.kwadResult.textContent.indexOf('Max') === 0);
check('G12: the loser row is marked', els.kwadPlayers.children[0].classList.contains('is-out'));
check('G14: the play buttons are disabled after the game', els.btnKwadDone.disabled === true && els.btnKwadFail.disabled === true);
check('G15: the turn card is hidden once only one player is left', els.kwadTurnCard.hidden === true);
api.kwadRound(false);                                    // must be ignored now
check('G16: no letters change after the game is over', api.players()[1].letters === 'KWA');

// --- a successful attempt adds no letter -----------------------------------
api.setGame([{ name: 'A', letters: 'KW' }, { name: 'B', letters: '' }], 0);
api.renderKwad();
api.kwadRound(true);
check('S1: "made it" adds no letter', api.players()[0].letters === 'KW');
check('S2: the turn moves on', api.turn() === 1);
check('S3: the board keeps the earned letters', earned(els.kwadPlayers.children[0]) === 2);
api.setGame([{ name: 'A', letters: 'KWAD' }, { name: 'B', letters: '' }], 0);
check('S4: an eliminated player is skipped', api.kwadActiveFrom(0) === 1);
api.renderKwad();
check('S5: a game with fewer than two active players is stopped', els.btnKwadDone.disabled === true);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);