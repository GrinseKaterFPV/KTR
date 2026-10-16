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
      { name: 'Dive', desc: 'Steiler Sturzflug', check: 'gap' },
      { name: 'Punch Out', desc: 'Schneller Vorwärts-Schub', check: 'free' },
      { name: 'Gap Roll', desc: 'Eine Rolle im Gap', check: 'gap' },
      { name: 'Orbit', desc: 'Kreisfahrt um ein Hindernis', check: 'obstacle' },
    ]
  },
  intermediate: {
    id: 'intermediate', label: 'Intermediate', emoji: '🟡', difficulty: 2, enabled: true,
    tricks: [
      { name: 'Power Loop', desc: 'Looping über das Gap' },
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
  'let kwadPlayers = [], kwadTurnIdx = 0, kwadTrick = "", kwadTried = [], kwadLastTrick = -1, kwadTrickObj = null, kwadTrickPool = [], kwadMode = "random", kwadCategoryOrder = [], kwadCategoryIdx = 0, kwadStats = {}, kwadPlayerStats = {}, kwadPool = {}, kwadLastPenalty = null, kwadObstaclePicker = "";',
  'let newTrickCalls = 0;',
  'const KWAD_CATEGORIES = ' + JSON.stringify(KWAD_CATEGORIES) + ';',
  'function kwadBuildTrickPool() { const pool = []; Object.values(KWAD_CATEGORIES).forEach(cat => { if (cat.enabled && cat.tricks.length) { cat.tricks.forEach(t => pool.push({ ...t, category: cat.id })); } }); return pool; }',
  'kwadTrickPool = kwadBuildTrickPool();',
  extract('kwadNormalizeLetters'),
  extract('kwadIsOut'),
  extract('kwadNextLetter'),
  extract('kwadDrawIndex'),
  extract('kwadCheck'),
  extract('kwadDifficulty'),
  extract('kwadTrickGroup'),
  extract('kwadTrickEnabled'),
  extract('kwadGroupTricks'),
  extract('kwadGroupPoolCount'),
  extract('kwadSavePool'),
  extract('renderKwadTrickList'),
  extract('renderKwadCategories'),
  extract('kwadSetTrickEnabled'),
  extract('kwadLoserIndex'),
  extract('kwadActiveFrom'),
  extract('kwadActiveCount'),
  extract('kwadBuildTrickPool'),
  extract('kwadRecordStat'),
  extract('kwadSaveStats'),
  extract('kwadSaveObstaclePicker'),
  extract('kwadDropProfileStats'),
  extract('kwadRenameProfile'),
  extract('kwadTotalAttempts'),
  extract('kwadTotalSucceeded'),
  extract('kwadRate'),
  extract('kwadStatCell'),
  extract('kwadStatPanel'),
  extract('renderKwadStats'),
  extract('kwadNewTrick').replace('function kwadNewTrick(', 'function kwadNewTrickImpl('),
  'function kwadNewTrick() { newTrickCalls++; return kwadNewTrickImpl(); }',
  extract('renderKwad'),
  extract('kwadRound'),
  extract('kwadUndoPenalty'),
  [
    'var apiObj = {};',
    'apiObj.kwadNormalizeLetters = kwadNormalizeLetters;',
    'apiObj.kwadIsOut = kwadIsOut;',
    'apiObj.kwadCheck = kwadCheck;',
    'apiObj.setTrick = function(trick) { kwadTrick = trick.name; kwadTrickObj = trick; };',
    'apiObj.clearTrick = function() { kwadTrickObj = null; };',
    'apiObj.obstaclePicker = function() { return kwadObstaclePicker; };',
    'apiObj.setObstaclePicker = function(name) { kwadObstaclePicker = name; };',
    'apiObj.kwadNextLetter = kwadNextLetter;',
    'apiObj.kwadDrawIndex = kwadDrawIndex;',
    'apiObj.kwadLoserIndex = kwadLoserIndex;',
    'apiObj.kwadActiveFrom = kwadActiveFrom;',
    'apiObj.kwadBuildTrickPool = kwadBuildTrickPool;',
    'apiObj.kwadDifficulty = kwadDifficulty;',
    'apiObj.kwadTrickEnabled = kwadTrickEnabled;',
    'apiObj.kwadGroupTricks = kwadGroupTricks;',
    'apiObj.kwadGroupPoolCount = kwadGroupPoolCount;',
    'apiObj.kwadPlayerStats = function() { return kwadPlayerStats; };',
    'apiObj.kwadPool = function() { return kwadPool; };',
    'apiObj.setPool = function(owner, trick, on) { kwadSetTrickEnabled(owner, trick, on); };',
    'apiObj.trickList = function() { return els.kwadTrickList; };',
    'apiObj.renderTrickList = renderKwadTrickList;',
    'apiObj.categoryGrid = function() { return els.kwadCategoryGrid; };',
    'apiObj.renderCategories = renderKwadCategories;',
    'apiObj.addCustom = function(trick) { KWAD_CATEGORIES.custom.tricks.push(trick); kwadTrickPool = kwadBuildTrickPool(); };',
    'apiObj.renderKwadStats = renderKwadStats;',
    'apiObj.kwadRecordStat = kwadRecordStat;',
    'apiObj.kwadSaveStats = kwadSaveStats;',
    'apiObj.kwadDropProfileStats = kwadDropProfileStats;',
    'apiObj.kwadRenameProfile = kwadRenameProfile;',
    'apiObj.renderKwad = renderKwad;',
    'apiObj.kwadRound = kwadRound;',
    'apiObj.kwadUndoPenalty = kwadUndoPenalty;',
    'apiObj.penalty = function() { return kwadLastPenalty; };',
    'apiObj.stats = function() { return kwadStats; };',
    'apiObj.kwadNewTrick = kwadNewTrick;',
    'apiObj.setGame = function(players, turn) { kwadPlayers = players; kwadTurnIdx = turn | 0; kwadTried = []; newTrickCalls = 0; kwadTrick = "Test Trick"; kwadTrickObj = { name: "Test Trick" }; kwadStats = {}; kwadPlayerStats = {}; kwadPool = {}; kwadTrickPool = kwadBuildTrickPool(); kwadLastPenalty = null; kwadObstaclePicker = ""; };',
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
    querySelectorAll() { return []; },
    addEventListener() {},
  };
  Object.defineProperty(el, 'textContent', {
    get() { return el._text; },
    set(v) { el._text = String(v); if (v === '') el.children = []; },
  });
  Object.defineProperty(el, 'innerHTML', {
    get() { return el._html || ''; },
    set(v) { el._html = String(v); if (v === '') el.children = []; },
  });
  return el;
}
const els = {
  kwadScreen: makeEl('div'),
  kwadTrick: makeEl('div'),
  kwadTrickMeta: makeEl('div'),
  kwadPlayers: makeEl('div'),
  kwadResult: makeEl('div'),
  kwadTurnCard: makeEl('div'),
  kwadTurn: makeEl('div'),
  kwadObstacle: makeEl('div'),
  kwadObstaclePicker: makeEl('select'),
  kwadTrickList: makeEl('div'),
  kwadCategoryGrid: makeEl('div'),
  kwadStatsGrid: makeEl('div'),
  btnKwadDone: makeEl('button'),
  btnKwadFail: makeEl('button'),
  btnKwadUndo: makeEl('button'),
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

// --- undo takes back only the last penalty letter (anti-cheat) --------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.renderKwad();
check('U1: nothing to undo -> button disabled', els.btnKwadUndo.disabled === true);
api.kwadRound(false);                                    // Max fails -> K, turn Lea
check('U2: the button lights up after a penalty', els.btnKwadUndo.disabled === false);
check('U3: the penalty is remembered with its trick', api.penalty() && api.penalty().letter === 'K' && api.penalty().trick === 'Test Trick');
api.kwadUndoPenalty();
check('U4: the letter is taken back', api.players()[0].letters === '');
check('U5: the turn returns to that player', api.turn() === 0);
check('U6: the player may have another go at the trick', api.tried().indexOf('Max') === -1);
check('U7: a second undo is not possible', (api.kwadUndoPenalty(), els.btnKwadUndo.disabled === true && api.players()[0].letters === ''));
check('U8: the undone attempt no longer counts in the stats', (api.stats()['Test Trick'] || {}).attempted === 0);
api.kwadRound(false);                                    // Max fails again -> K
check('U9: the board shows the letter again', earned(els.kwadPlayers.children[0]) === 1);
api.kwadRound(true);                                     // Lea succeeds -> undo cleared
check('U10: a success clears the undo history', els.btnKwadUndo.disabled === true);
check('U11: a finished game can still be undone', (function () {
  api.setGame([{ name: 'Max', letters: 'KWA' }, { name: 'Lea', letters: 'K' }], 0);
  api.kwadRound(false);                                  // Max KWA -> KWAD -> loses
  if (api.kwadLoserIndex(api.players()) !== 0) return false;
  api.kwadUndoPenalty();
  return api.players()[0].letters === 'KWA' && api.kwadLoserIndex(api.players()) === -1 && els.btnKwadUndo.disabled === true;
})());

// --- Prüfart (check) + obstacle picker -------------------------------------
check('C1: a trick without a check counts as free flight', api.kwadCheck({ name: 'X' }) === 'free');
check('C2: a gap trick keeps its gap check', api.kwadCheck({ check: 'gap' }) === 'gap');
check('C2b: the legacy gate value from v0.19 is mapped onto gap', api.kwadCheck({ check: 'gate' }) === 'gap');
check('C3: an obstacle trick is recognised', api.kwadCheck({ check: 'obstacle' }) === 'obstacle');
check('C4: an unknown value falls back to free flight', api.kwadCheck({ check: 'nonsense' }) === 'free');
check('C5: the drawn pool passes the Prüfart through',
  api.kwadBuildTrickPool().filter(t => t.check === 'obstacle').length === 1
  && api.kwadBuildTrickPool().every(t => api.kwadCheck(t) === (t.check || 'free')));

api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setTrick({ name: 'Orbit', check: 'obstacle' });
api.renderKwad();
check('C6: the obstacle card shows up for an obstacle trick', els.kwadObstacle.hidden === false);
check('C7: the picker offers the blank entry plus both players', els.kwadObstaclePicker.children.length === 3);
check('C8: the first active player is preselected', els.kwadObstaclePicker.value === 'Max');
check('C9: the preselection is remembered in state', api.obstaclePicker() === 'Max');
api.setObstaclePicker('Lea');
api.renderKwad();
check('C10: a saved picker choice survives the next render', els.kwadObstaclePicker.value === 'Lea');
api.setTrick({ name: 'Yaw Spin', check: 'free' });
api.renderKwad();
check('C11: no obstacle card for a free-flight trick', els.kwadObstacle.hidden === true);
api.setGame([{ name: 'Max', letters: 'KWAD' }, { name: 'Lea', letters: '' }], 1);
api.setTrick({ name: 'Wall Scrape', check: 'obstacle' });
api.renderKwad();
check('C12: a player who is out is not offered as picker',
  els.kwadObstaclePicker.children.length === 2 && els.kwadObstaclePicker.value === 'Lea');

// --- pool switches, difficulty and per-player statistics --------------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
check('P1: the category difficulty is used when the trick has none', api.kwadDifficulty({ name: 'Dive' }, 'basics') === 1);
check('P2: a trick difficulty wins over the category', api.kwadDifficulty({ name: 'Dive', difficulty: 4 }, 'basics') === 4);
check('P3: an unknown trick falls back to the middle', api.kwadDifficulty({ name: 'X' }, 'nope') === 3);
check('P4: an out-of-range value falls back to the category', api.kwadDifficulty({ name: 'X', difficulty: 9 }, 'basics') === 1);

// custom tricks may be filed into a built-in group
check('P5: a built-in group lists its own tricks', api.kwadGroupTricks('basics').length === 4);
api.addCustom({ name: 'Snap', desc: 'Eigener Trick in Basics', check: 'free', difficulty: 2, cat: 'basics', custom: true });
check('P6: a custom trick filed into Basics shows up there', api.kwadGroupTricks('basics').length === 5);
check('P7: it is no longer listed under "Eigene"', api.kwadGroupTricks('custom').length === 0);
check('P8: it joins the draw pool in its new group',
  api.kwadBuildTrickPool().some(t => t.name === 'Snap' && t.category === 'basics'));

// per-trick pool switch
const poolBefore = api.kwadBuildTrickPool().length;
api.setPool('basics', { name: 'Dive' }, false);
check('P9: an unchecked trick leaves the pool', api.kwadBuildTrickPool().length === poolBefore - 1);
check('P10: ... and never comes back', !api.kwadBuildTrickPool().some(t => t.name === 'Dive'));
api.setPool('basics', { name: 'Dive' }, true);
check('P11: re-enabling it restores the pool', api.kwadBuildTrickPool().length === poolBefore);
api.setPool('intermediate', { name: 'Split-S' }, false);
check('P12: the per-group count respects the switches', api.kwadGroupPoolCount('intermediate') === 1);
api.setPool('intermediate', { name: 'Split-S' }, true);

// statistics are kept per player *and* as a global total
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setTrick({ name: 'Dive' });
api.kwadRound(false);                                   // Max fails
check('P13: the failed attempt lands in the global stats', api.stats()['Dive'].attempted === 1);
check('P14: ... and only in the bucket of the player who had the go',
  api.kwadPlayerStats()['Max']['Dive'].attempted === 1 && !api.kwadPlayerStats()['Lea']);
api.kwadRound(true);                                    // Lea succeeds
check('P15: the success lands in the other player bucket', api.kwadPlayerStats()['Lea']['Dive'].succeeded === 1);
check('P16: the global stats add up', api.stats()['Dive'].attempted === 2 && api.stats()['Dive'].succeeded === 1);
api.kwadRound(false);                                   // Max fails again -> penalty pending
api.kwadUndoPenalty();
check('P17: undo takes the attempt out of the player bucket too',
  api.kwadPlayerStats()['Max']['Dive'].attempted === 1 && api.stats()['Dive'].attempted === 2);
check('P18: the other player is untouched', api.kwadPlayerStats()['Lea']['Dive'].succeeded === 1);

// the stats panel: one block per player plus a "Gesamt" block
api.renderKwadStats();
check('P19: one panel per player plus the total', els.kwadStatsGrid.children.length === 3);
check('P20: the first panel is the total',
  els.kwadStatsGrid.children[0].children[0].children[0].textContent === 'kwad_stats_total');
check('P21: the following panels name their player',
  els.kwadStatsGrid.children[1].children[0].children[0].textContent === 'Max'
  && els.kwadStatsGrid.children[2].children[0].children[0].textContent === 'Lea');
const maxPanel = els.kwadStatsGrid.children[1];
check('P22: the panel headline shows attempted / succeeded / rate',
  maxPanel.children[1].children[0].children[0].textContent === '1'
  && maxPanel.children[1].children[1].children[0].textContent === '0'
  && maxPanel.children[1].children[2].children[0].textContent === '0 %');
check('P22b: the per-trick rows carry the attempt',
  maxPanel.children[2].children[1].children[0].textContent === 'Dive'
  && maxPanel.children[2].children[1].children[1].textContent === '1');
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.renderKwadStats();
check('P23: without any attempt the panels say so',
  els.kwadStatsGrid.children[1].children[2].textContent === 'kwad_stats_empty');

// --- the drawn trick shows category, difficulty, Prüfart and description -----
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setTrick({ name: 'Dive', desc: 'Steiler Sturzflug', check: 'gap', category: 'basics' });
api.renderKwad();
check('M1: the meta line is visible for a drawn trick', els.kwadTrickMeta.hidden === false);
check('M2: it names the group', els.kwadTrickMeta.children[0].textContent === 'kwad_category_basics');
check('M3: it shows the difficulty as stars', els.kwadTrickMeta.children[1].textContent === '★');
check('M4: it shows the Prüfart', els.kwadTrickMeta.children[2].textContent === 'kwad_check_gap');
check('M5: and the short description', els.kwadTrickMeta.children[3].textContent === 'Steiler Sturzflug');
api.clearTrick();
api.renderKwad();
check('M6: without a trick the meta line is hidden', els.kwadTrickMeta.hidden === true);

// --- the "Trickliste & Pool" list (real renderer + real switch) --------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
KWAD_CATEGORIES.pro.enabled = false;
api.renderTrickList();
const tl = api.trickList();
const rowsIn = el => el.children.filter(c => c.className.indexOf('trick-list-row') === 0).length;
const headsIn = el => el.children.filter(c => c.className.indexOf('trick-list-head') === 0).length;
check('T1: the list renders a header per group and a row per trick',
  headsIn(tl) === 4 && rowsIn(tl) === 9);
const diveRow = tl.children[1];
check('T2: a row shows name, description, difficulty and Prüfart',
  diveRow.children[1].children[0].textContent === 'Dive'
  && diveRow.children[1].children[1].textContent === 'Steiler Sturzflug'
  && diveRow.children[2].textContent === '★'
  && diveRow.children[3].textContent === 'kwad_check_gap');
check('T3: every trick starts checked',
  tl.children[1].children[0].checked === true && tl.children[0].children[1].textContent === '5/5 kwad_tricks');
api.setPool('basics', { name: 'Dive' }, false);
check('T4: switching a trick off dims its row and updates the group count',
  tl.children[1].className.indexOf('is-off') !== -1
  && tl.children[1].children[0].checked === false
  && tl.children[0].children[1].textContent === '4/5 kwad_tricks');
check('T5: and it leaves the draw pool', !api.kwadBuildTrickPool().some(t => t.name === 'Dive'));
api.setPool('basics', { name: 'Dive' }, true);
check('T6: switching it back on restores row, count and pool',
  tl.children[1].className.indexOf('is-off') === -1
  && tl.children[1].children[0].checked === true
  && tl.children[0].children[1].textContent === '5/5 kwad_tricks'
  && api.kwadBuildTrickPool().some(t => t.name === 'Dive'));
check('T7: a trick of a disabled group is dimmed but stays checked',
  tl.children[tl.children.length - 1].className.indexOf('is-off') !== -1
  && tl.children[tl.children.length - 1].children[0].checked === true);
check('T8: a custom trick filed into a group is listed there',
  tl.children[5].children[1].children[0].textContent === 'Snap'
  && tl.children[5].children[1].children[1].textContent === 'Eigener Trick in Basics'
  && tl.children[5].children[2].textContent === '★★');

api.renderCategories();
check('T9: the category grid shows one row per built-in group with its pool count',
  api.categoryGrid().children.length === 4
  && api.categoryGrid().children[0].innerHTML.indexOf('5/5 kwad_tricks') !== -1);
check('T10: the grid row still carries the category switch',
  api.categoryGrid().children[0].innerHTML.indexOf('data-cat="basics"') !== -1);

// --- profile statistics: rename a profile, drop its statistics -------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setTrick({ name: 'Dive' });
api.setObstaclePicker('Max');
api.kwadRound(false);                                   // Max fails -> bucket Max/Dive
api.kwadRecordStat('Ghost', 'Orbit', true);             // a bucket that is not in the game
check('R1: the failing profile owns its attempt', api.kwadPlayerStats()['Max']['Dive'].attempted === 1);
check('R2: the global total counts it too', api.stats()['Dive'].attempted === 1 && api.stats()['Dive'].succeeded === 0);

api.kwadRenameProfile('Max', 'Maxi');
check('R3: the bucket moves to the new profile name',
  !api.kwadPlayerStats()['Max'] && api.kwadPlayerStats()['Maxi']['Dive'].attempted === 1);
check('R4: the running game carries the new name', api.players()[0].name === 'Maxi');
check('R5: the tried list carries the new name', api.tried()[0] === 'Maxi');
check('R6: the obstacle picker carries the new name', api.obstaclePicker() === 'Maxi');
check('R7: the global total survives a rename',
  api.stats()['Dive'].attempted === 1 && api.stats()['Dive'].succeeded === 0);

api.kwadRenameProfile('Maxi', 'Maxi');
check('R8: renaming to the same name is a no-op',
  api.players()[0].name === 'Maxi' && api.kwadPlayerStats()['Maxi']['Dive'].attempted === 1);

api.kwadRenameProfile('Maxi', 'Ghost');
check('R9: renaming onto an existing bucket merges both',
  !api.kwadPlayerStats()['Maxi']
  && api.kwadPlayerStats()['Ghost']['Dive'].attempted === 1
  && api.kwadPlayerStats()['Ghost']['Orbit'].succeeded === 1);

api.kwadDropProfileStats('Ghost');
check('R10: dropping a profile empties its bucket', !api.kwadPlayerStats()['Ghost']);
check('R11: ... and takes its attempts out of the global total',
  !api.stats()['Dive'] && !api.stats()['Orbit']);
api.kwadDropProfileStats('nobody');
check('R12: dropping an unknown profile is a harmless no-op', !api.kwadPlayerStats()['nobody']);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);