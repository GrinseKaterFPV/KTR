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
      { name: 'Dive', desc: 'Steiler Sturzflug', check: 'free', direction: 'flight', en: { name: 'Dive EN', desc: 'Steep dive' } },
      { name: 'Yaw Spin', desc: 'Schnelle flache Drehung', check: 'free', direction: 'yaw' },
      { name: 'Gap Roll', desc: 'Eine Rolle im Gap', check: 'gap', direction: 'roll', difficulty: 2 },
      { name: 'Orbit', desc: 'Kreisfahrt um ein Hindernis', check: 'obstacle', direction: 'orbit' },
    ]
  },
  intermediate: {
    id: 'intermediate', label: 'Intermediate', emoji: '🟡', difficulty: 2, enabled: true,
    tricks: [
      { name: 'Power Loop', desc: 'Loop um ein Hindernis', check: 'obstacle' },
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
  'let kwadPlayers = [], kwadTurnIdx = 0, kwadTrick = "", kwadTrickDirection = "", kwadTried = [], kwadLastTrick = -1, kwadTrickObj = null, kwadTrickPool = [], kwadMode = "random", kwadCategoryOrder = [], kwadCategoryIdx = 0, kwadStats = {}, kwadPlayerStats = {}, kwadPlayerWins = {}, kwadPool = {}, kwadLastPenalty = null, kwadPicker = "", kwadAnnounce = false, kwadEditingCustomIdx = -1, kwadEditingBuiltin = null, kwadBuiltinOverrides = {};',
  'let kwadStatClosed = new Set();',
  'var state = { lang: "de" };',
  'let newTrickCalls = 0;',
  'const KWAD_CATEGORIES = ' + JSON.stringify(KWAD_CATEGORIES) + ';',
  'const KWAD_DIRECTION_OPTIONS = { roll: ["left", "right"], yaw: ["left", "right"], orbit: ["clockwise", "counterclockwise"], flight: ["forward", "backward"], wall: ["left_to_right", "right_to_left"] };',
  'let announcedText = ""; function speak(text) { announcedText = text; }',
  'const KWAD_BUILTIN_IDS = new WeakMap(); Object.values(KWAD_CATEGORIES).forEach(cat => { if (cat.id !== "custom") cat.tricks.forEach(trick => KWAD_BUILTIN_IDS.set(trick, cat.id + "/" + trick.name)); });',
  'function kwadBuildTrickPool() { const pool = []; Object.values(KWAD_CATEGORIES).forEach(cat => { if (cat.enabled && cat.tricks.length) { cat.tricks.forEach(t => pool.push({ ...t, category: cat.id })); } }); return pool; }',
  'kwadTrickPool = kwadBuildTrickPool();',
  extract('kwadNormalizeLetters'),
  extract('kwadIsOut'),
  extract('kwadNextLetter'),
  extract('kwadDrawIndex'),
  extract('kwadCheck'),
  extract('kwadTrickName'),
  extract('kwadTrickDesc'),
  extract('kwadTrickByName'),
  extract('kwadTrickLabel'),
  extract('kwadDirectionType'),
  extract('kwadDirectionLabel'),
  extract('kwadDirectionText'),
  extract('kwadChooseDirection'),
  extract('kwadAvailableDirections'),
  extract('kwadDirectionChoicesText'),
  extract('kwadApplyBuiltinOverrides'),
  extract('kwadDifficulty'),
  extract('kwadTrickGroup'),
  extract('kwadTrickEnabled'),
  extract('kwadGroupTricks'),
  extract('kwadGroupPoolCount'),
  extract('kwadSavePool'),
  extract('kwadRenameBuiltinTrick'),
  extract('renderKwadTrickList'),
  extract('renderKwadCategories'),
  extract('kwadSetTrickEnabled'),
  extract('kwadTrickListRows'),
  extract('kwadLoserIndex'),
  extract('kwadActiveFrom'),
  extract('kwadActiveCount'),
  extract('kwadBuildTrickPool'),
  extract('kwadRecordStat'),
  extract('kwadAwardSoleWinner'),
  extract('kwadSaveStats'),
  extract('kwadSavePicker'),
  extract('kwadPickerKind'),
  extract('kwadChoosePicker'),
  extract('kwadDropProfileStats'),
  extract('kwadRenameProfile'),
  extract('kwadTotalAttempts'),
  extract('kwadTotalSucceeded'),
  extract('kwadRate'),
  extract('kwadStatCell'),
  extract('kwadStatPanel'),
  extract('renderKwadStats'),
  extract('kwadRenameOwnTrick'),
  extract('kwadEditCustomTrick'),
  extract('kwadResetCustomForm'),
  extract('kwadUpdateCustomFormMode'),
  extract('renderKwadCustomTricks'),
  'function esc(v) { return String(v == null ? "" : v); }',
  'let pilotStatRenders = 0;',
  'function renderPilotsScreen() { pilotStatRenders++; }',
  'function renderPilotCompare() { pilotStatRenders++; }',
  'function kwadSaveCustomTricks() {}',
  'function kwadSaveBuiltinOverrides() {}',
  extract('kwadAddCustomTrick'),
  extract('kwadRemoveCustomTrick'),
  extract('kwadNewTrick').replace('function kwadNewTrick(', 'function kwadNewTrickImpl('),
  'function kwadNewTrick() { newTrickCalls++; return kwadNewTrickImpl(); }',
  extract('kwadAnnounceTrick'),
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
    'apiObj.picker = function() { return kwadPicker; };',
    'apiObj.setPicker = function(name) { kwadPicker = name; };',
    'apiObj.kwadChoosePicker = kwadChoosePicker;',
    'apiObj.kwadPickerKind = kwadPickerKind;',
    'apiObj.kwadNextLetter = kwadNextLetter;',
    'apiObj.kwadDrawIndex = kwadDrawIndex;',
    'apiObj.kwadLoserIndex = kwadLoserIndex;',
    'apiObj.kwadActiveFrom = kwadActiveFrom;',
    'apiObj.kwadBuildTrickPool = kwadBuildTrickPool;',
    'apiObj.kwadDifficulty = kwadDifficulty;',
    'apiObj.kwadDirectionType = kwadDirectionType;',
    'apiObj.kwadDirectionText = kwadDirectionText;',
    'apiObj.kwadChooseDirection = kwadChooseDirection;',
    'apiObj.kwadAvailableDirections = kwadAvailableDirections;',
    'apiObj.announcedText = function() { return announcedText; };',
    'apiObj.currentDirection = function() { return kwadTrickDirection; };',
    'apiObj.setDirectionPool = function(pool) { kwadTrickPool = pool; kwadMode = "random"; };',
    'apiObj.setAnnounce = function(value) { kwadAnnounce = value; };',
    'apiObj.announceTrick = kwadAnnounceTrick;',
    'apiObj.kwadTrickEnabled = kwadTrickEnabled;',
    'apiObj.kwadGroupTricks = kwadGroupTricks;',
    'apiObj.kwadGroupPoolCount = kwadGroupPoolCount;',
    'apiObj.kwadPlayerStats = function() { return kwadPlayerStats; };',
    'apiObj.kwadPlayerWins = function() { return kwadPlayerWins; };',
    'apiObj.setPlayerWins = function(wins) { kwadPlayerWins = wins; };',
    'apiObj.kwadPool = function() { return kwadPool; };',
    'apiObj.setPool = function(owner, trick, on) { kwadSetTrickEnabled(owner, trick, on); };',
    'apiObj.trickListRows = kwadTrickListRows;',
    'apiObj.trickName = kwadTrickName;',
    'apiObj.categories = function() { return KWAD_CATEGORIES; };',
    'apiObj.applyBuiltinOverrides = kwadApplyBuiltinOverrides;',
    'apiObj.builtinOverrides = function() { return kwadBuiltinOverrides; };',
    'apiObj.startBuiltinEdit = function(id) { const trick = Object.values(KWAD_CATEGORIES).flatMap(cat => cat.tricks).find(t => KWAD_BUILTIN_IDS.get(t) === id); kwadEditingBuiltin = trick ? { id, trick } : null; };',
    'apiObj.trickDesc = kwadTrickDesc;',
    'apiObj.trickLabel = kwadTrickLabel;',
    'apiObj.setLang = function(l) { state.lang = l; };',
    'apiObj.trickList = function() { return els.kwadTrickList; };',
    'apiObj.renderTrickList = renderKwadTrickList;',
    'apiObj.categoryGrid = function() { return els.kwadCategoryGrid; };',
    'apiObj.renderCategories = renderKwadCategories;',
    'apiObj.addCustom = function(trick) { KWAD_CATEGORIES.custom.tricks.push(trick); kwadTrickPool = kwadBuildTrickPool(); };',
    'apiObj.renderKwadStats = renderKwadStats;',
    'apiObj.kwadRecordStat = kwadRecordStat;',
    'apiObj.pilotStatRenders = function() { return pilotStatRenders; };',
    'apiObj.kwadSaveStats = kwadSaveStats;',
    'apiObj.kwadDropProfileStats = kwadDropProfileStats;',
    'apiObj.kwadRenameProfile = kwadRenameProfile;',
    'apiObj.renderKwad = renderKwad;',
    'apiObj.kwadRound = kwadRound;',
    'apiObj.kwadUndoPenalty = kwadUndoPenalty;',
    'apiObj.penalty = function() { return kwadLastPenalty; };',
    'apiObj.stats = function() { return kwadStats; };',
    'apiObj.kwadNewTrick = kwadNewTrick;',
    'apiObj.setGame = function(players, turn) { kwadPlayers = players; kwadTurnIdx = turn | 0; kwadTried = []; newTrickCalls = 0; kwadTrick = "Test Trick"; kwadTrickObj = { name: "Test Trick" }; kwadTrickDirection = ""; kwadStats = {}; kwadPlayerStats = {}; kwadPlayerWins = {}; kwadPool = {}; kwadTrickPool = kwadBuildTrickPool(); kwadLastPenalty = null; kwadPicker = ""; };',
    'apiObj.players = function() { return kwadPlayers; };',
    'apiObj.turn = function() { return kwadTurnIdx; };',
    'apiObj.tried = function() { return kwadTried; };',
    'apiObj.newTrickCalls = function() { return newTrickCalls; };',
    'apiObj.customTricks = function() { return KWAD_CATEGORIES.custom.tricks; };',
    'apiObj.customList = function() { return els.kwadCustomTricksList; };',
    'apiObj.renderCustomTricks = renderKwadCustomTricks;',
    'apiObj.editCustomTrick = kwadEditCustomTrick;',
    'apiObj.resetCustomForm = kwadResetCustomForm;',
    'apiObj.addCustomTrick = kwadAddCustomTrick;',
    'apiObj.removeCustomTrick = kwadRemoveCustomTrick;',
    'apiObj.renameOwnTrick = kwadRenameOwnTrick;',
    'apiObj.editingIdx = function() { return kwadEditingCustomIdx; };',
    'apiObj.pool = function() { return kwadPool; };',
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
    attrs: {}, dataset: {},
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
  kwadPicker: makeEl('div'),
  kwadPickerName: makeEl('span'),
  kwadPickerText: makeEl('span'),
  kwadTrickList: makeEl('div'),
  kwadCategoryGrid: makeEl('div'),
  kwadStatsGrid: makeEl('div'),
  kwadCustomTricksList: makeEl('div'),
  kwadCustomName: makeEl('input'),
  kwadCustomDesc: makeEl('input'),
  kwadCustomCheck: makeEl('select'),
  kwadCustomDifficulty: makeEl('select'),
  kwadCustomDirection: makeEl('select'),
  kwadCustomCat: makeEl('select'),
  kwadCustomCatLabel: makeEl('label'),
  btnKwadCustomSave: makeEl('button'),
  btnKwadCustomCancel: makeEl('button'),
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
check('D5: directionless tricks have no direction type',
  api.kwadDirectionType({ name: 'Power Loop' }) === ''
  && api.kwadDirectionType({ name: 'Roll', direction: 'roll' }) === 'roll');
check('D6: directional options stay separate from trick names in CSV data',
  api.kwadAvailableDirections({ name: 'Roll', direction: 'roll' }) === 'roll:left|right'
  && api.kwadAvailableDirections({ name: 'Orbit', direction: 'orbit' }) === 'orbit:clockwise|counterclockwise');

api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setDirectionPool([{ name: 'Yaw Spin', desc: 'Drehung', check: 'free', direction: 'yaw', category: 'basics' }]);
api.setAnnounce(true);
api.kwadNewTrick();
const chosenDirection = api.currentDirection();
const directionMeta = els.kwadTrickMeta.children.find(child => child.className === 'kwad-meta-direction');
check('D7: drawing a directional trick chooses one of its declared directions',
  ['left', 'right'].includes(chosenDirection));
check('D8: the drawn direction is shown in the trick metadata',
  !!directionMeta && directionMeta.textContent === 'kwad_direction_yaw: kwad_direction_' + chosenDirection);
check('D9: the trick announcement includes its selected direction',
  api.announcedText().indexOf('Yaw Spin. kwad_direction_yaw kwad_direction_' + chosenDirection) === 0);
api.setAnnounce(false);

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
check('G12: the result banner names the winner', els.kwadResult.hidden === false && els.kwadResult.textContent.indexOf('Lea') === 0);
check('G12: the loser row is marked', els.kwadPlayers.children[0].classList.contains('is-out'));
check('G14: the play buttons are disabled after the game', els.btnKwadDone.disabled === true && els.btnKwadFail.disabled === true);
check('G15: the turn card is hidden once only one player is left', els.kwadTurnCard.hidden === true);
check('G15a: the last remaining pilot gets one game win', api.kwadPlayerWins().Lea === 1 && !api.kwadPlayerWins().Max);
api.kwadRound(false);                                    // must be ignored now
check('G16: no letters change after the game is over', api.players()[1].letters === 'KWA');
check('G17: a finished game cannot award the win twice', api.kwadPlayerWins().Lea === 1);

api.setGame([{ name: 'Out', letters: 'KWAD' }, { name: 'Lea', letters: 'KWA' }, { name: 'Jo', letters: '' }], 2);
api.kwadRound(false);                                    // Jo gets K; Lea's turn
check('G18: a multi-player game continues after the first player is out', api.turn() === 1 && els.btnKwadFail.disabled === false);
api.kwadRound(false);                                    // Lea gets D, Jo is the last one in
check('G19: only the final survivor wins a multi-player game', api.kwadPlayerWins().Jo === 1 && !api.kwadPlayerWins().Lea);

api.setGame([{ name: 'Max', letters: 'KWA' }, { name: 'Lea', letters: '' }], 0);
api.kwadRound(false);                                    // Max loses; Lea wins
api.kwadUndoPenalty();
check('G20: undoing the final penalty also retracts the game win', !api.kwadPlayerWins().Lea);

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
  api.kwadBuildTrickPool().filter(t => t.check === 'obstacle').length === 2
  && api.kwadBuildTrickPool().every(t => api.kwadCheck(t) === (t.check || 'free')));

api.setGame([{ name: 'Max', letters: 'KW' }, { name: 'Lea', letters: '' }], 0);
api.setTrick({ name: 'Orbit', check: 'obstacle' });
api.renderKwad();
check('C6: the picker shows up for an obstacle trick', els.kwadPicker.hidden === false);
check('C7: the app nominates the active player with the most letters', els.kwadPickerName.textContent === 'Max');
check('C7b: the picker names what is being picked (obstacle)', els.kwadPickerText.textContent === 'kwad_picker_obstacle');
check('C8: the nomination is remembered in state', api.picker() === 'Max');
// A gap is picked the same way — only the wording differs.
api.setTrick({ name: 'Dive', check: 'gap' });
api.setPicker('');
api.renderKwad();
check('C8b: a gap trick also shows the picker (with the gap wording)',
  els.kwadPicker.hidden === false && els.kwadPickerName.textContent === 'Max'
  && els.kwadPickerText.textContent === 'kwad_picker_gap');
check('C8c: only gap and obstacle need a picker',
  api.kwadPickerKind({ check: 'free' }) === '' && api.kwadPickerKind({ check: 'gap' }) === 'gap'
  && api.kwadPickerKind({ check: 'obstacle' }) === 'obstacle');
api.setTrick({ name: 'Yaw Spin', check: 'free' });
api.renderKwad();
check('C9: no picker for a free-flight trick', els.kwadPicker.hidden === true);
api.setTrick({ name: 'Orbit', check: 'obstacle' });
api.setPicker('Lea');
api.renderKwad();
check('C10: the fixed name is shown as plain text (no dropdown) and survives a render',
  els.kwadPickerName.textContent === 'Lea' && api.picker() === 'Lea');
api.setGame([{ name: 'Max', letters: 'KWAD' }, { name: 'Lea', letters: '' }], 1);
api.setTrick({ name: 'Wall Ride', check: 'obstacle' });
api.renderKwad();
check('C11: a player who is already out is never nominated', els.kwadPickerName.textContent === 'Lea');
// A tie between the leaders is settled by lot — either leader may come up.
api.setGame([{ name: 'Max', letters: 'K' }, { name: 'Lea', letters: 'K' }], 0);
const tieSeen = new Set();
for (let i = 0; i < 60; i++) {
  api.setPicker('');
  api.setTrick({ name: 'Orbit', check: 'obstacle' });
  api.renderKwad();
  tieSeen.add(api.picker());
}
check('C12: a tie only ever picks one of the leaders', [...tieSeen].every(n => n === 'Max' || n === 'Lea') && tieSeen.size > 0);
check('C13: a tie is decided by lot (both leaders can be nominated)', tieSeen.size === 2);
check('C14: with nobody in the game nobody is nominated', (api.setGame([], 0), api.kwadChoosePicker()) === '');

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
  && diveRow.children[3].textContent === 'kwad_check_free');
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
api.setPicker('Max');
api.setPlayerWins({ Max: 1 });
api.kwadRound(false);                                   // Max fails -> bucket Max/Dive
api.kwadRecordStat('Ghost', 'Orbit', true);             // a bucket that is not in the game
check('R1: the failing profile owns its attempt', api.kwadPlayerStats()['Max']['Dive'].attempted === 1);
check('R2: the global total counts it too', api.stats()['Dive'].attempted === 1 && api.stats()['Dive'].succeeded === 0);

api.kwadRenameProfile('Max', 'Maxi');
check('R3: the bucket moves to the new profile name',
  !api.kwadPlayerStats()['Max'] && api.kwadPlayerStats()['Maxi']['Dive'].attempted === 1);
check('R3a: the game-win total follows a renamed profile',
  !api.kwadPlayerWins().Max && api.kwadPlayerWins().Maxi === 1);
check('R4: the running game carries the new name', api.players()[0].name === 'Maxi');
check('R5: the tried list carries the new name', api.tried()[0] === 'Maxi');
check('R6: the picker carries the new name', api.picker() === 'Maxi');
check('R7: the global total survives a rename',
  api.stats()['Dive'].attempted === 1 && api.stats()['Dive'].succeeded === 0);

api.kwadRenameProfile('Maxi', 'Maxi');
check('R8: renaming to the same name is a no-op',
  api.players()[0].name === 'Maxi' && api.kwadPlayerStats()['Maxi']['Dive'].attempted === 1);

api.kwadRenameProfile('Maxi', 'Ghost');
check('R9: renaming onto an existing bucket merges both',
  !api.kwadPlayerStats()['Maxi']
  && api.kwadPlayerStats()['Ghost']['Dive'].attempted === 1
  && api.kwadPlayerStats()['Ghost']['Orbit'].succeeded === 1
  && api.kwadPlayerWins().Ghost === 1);

api.kwadDropProfileStats('Ghost');
check('R10: dropping a profile empties its bucket', !api.kwadPlayerStats()['Ghost']);
check('R11: ... and takes its attempts out of the global total',
  !api.stats()['Dive'] && !api.stats()['Orbit']);
api.kwadDropProfileStats('nobody');
check('R12: dropping an unknown profile is a harmless no-op', !api.kwadPlayerStats()['nobody']);

// --- trick names/descriptions come in both languages (real app.js data) ------
// The fixture above is a small copy; the built-in list is taken from app.js so
// the shipped translations are the ones under test.
const realCategories = (() => {
  const start = src.indexOf('const KWAD_CATEGORIES = {');
  if (start < 0) throw new Error('KWAD_CATEGORIES not found');
  const open = src.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return new Function('return ' + src.slice(open, i + 1))(); }
  }
  throw new Error('unbalanced KWAD_CATEGORIES');
})();
const builtIns = [];
Object.values(realCategories).forEach(cat => (cat.tricks || []).forEach(trick => builtIns.push(trick)));
check('X1: the revised built-in list contains the agreed trick set',
  realCategories.basics.tricks.length === 7 && realCategories.intermediate.tricks.length === 8
  && realCategories.advanced.tricks.length === 7 && realCategories.pro.tricks.length === 3
  && builtIns.length === 25);
check('X2: "Level Pass" is gone and "Tight Gap" took its place',
  builtIns.every(trick => trick.name !== 'Level Pass')
  && realCategories.basics.tricks.some(trick => trick.name === 'Tight Gap'));
check('X3: "Gap Roll" is spelled with a Gap (no "Gate Roll")',
  builtIns.every(trick => trick.name !== 'Gate Roll') && builtIns.some(trick => trick.name === 'Gap Roll'));
check('X4: no built-in trick names repeat',
  new Set(builtIns.map(trick => trick.name)).size === builtIns.length);
check('X4b: Wall Scrape was renamed to Wall Ride and Wall Tap was added',
  !builtIns.some(trick => trick.name === 'Wall Scrape')
  && realCategories.intermediate.tricks.some(trick => trick.name === 'Wall Ride' && trick.check === 'obstacle')
  && realCategories.intermediate.tricks.some(trick => trick.name === 'Wall Tap' && trick.check === 'obstacle'));
check('X4c: Tornado was renamed to Inverted Yaw-spin',
  !builtIns.some(trick => trick.name === 'Tornado')
  && realCategories.pro.tricks.some(trick => trick.name === 'Inverted Yaw-spin'
    && trick.en.name === 'Inverted Yaw-spin' && trick.check === 'free'));
check('X5: every built-in trick carries an English name and description',
  builtIns.every(trick => trick.en && typeof trick.en.name === 'string' && trick.en.name.length
    && typeof trick.en.desc === 'string' && trick.en.desc.length));
check('X6: a trick is displayed in the chosen language', (() => {
  const dive = realCategories.basics.tricks[0];
  api.setLang('de');
  const de = api.trickName(dive) === dive.name && api.trickDesc(dive) === dive.desc;
  api.setLang('en');
  const en = api.trickName(dive) === dive.en.name && api.trickDesc(dive) === dive.en.desc;
  api.setLang('de');
  return de && en;
})());
check('X7: a statistics row shows its trick in the chosen language', (() => {
  api.setLang('en');
  const en = api.trickLabel('Dive') === 'Dive EN';
  api.setLang('de');
  return en && api.trickLabel('Dive') === 'Dive' && api.trickLabel('Unknown') === 'Unknown';
})());

// --- the trick-list export ---------------------------------------------------
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
const exportRows = api.trickListRows();
const listedTricks = Object.values(KWAD_CATEGORIES)
  .reduce((sum, cat) => sum + api.kwadGroupTricks(cat.id).length, 0);
check('X8: the export carries the header and one row per listed trick',
  exportRows[0].join(',') === 'category,trick,description,difficulty,check,direction,in_pool'
  && exportRows.length === 1 + listedTricks
  && exportRows.slice(1).every(row => row.length === 7));
const gapRollRow = exportRows.slice(1).find(row => row[1] === 'Gap Roll');
check('X9: a row names group, trick, difficulty and Prüfart',
  !!gapRollRow && gapRollRow[0] === 'kwad_category_basics' && gapRollRow[3] === 2
  && gapRollRow[4] === 'kwad_check_gap' && gapRollRow[5] === 'roll:left|right' && gapRollRow[6] === 'yes');
api.setPool('basics', { name: 'Gap Roll' }, false);
const offRow = api.trickListRows().slice(1).find(row => row[1] === 'Gap Roll');
check('X10: a trick taken out of the pool is exported as in_pool = no', offRow[6] === 'no');
api.setPool('basics', { name: 'Gap Roll' }, true);
check('X11: switching it back on is reflected again',
  api.trickListRows().slice(1).find(row => row[1] === 'Gap Roll')[6] === 'yes');

// --- own tricks can be edited again afterwards (real form logic) -------------
api.customTricks().splice(0);                            // start from an empty list
api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
els.kwadCustomName.value = 'Snap';
els.kwadCustomDesc.value = 'ein Schnapp';
els.kwadCustomCheck.value = 'obstacle';
els.kwadCustomDifficulty.value = '4';
els.kwadCustomDirection.value = 'roll';
els.kwadCustomCat.value = 'basics';
api.addCustomTrick();
check('Y1: the form adds an own trick', api.customTricks().length === 1 && api.customTricks()[0].name === 'Snap');
check('Y2: it keeps check, difficulty and category',
  api.customTricks()[0].check === 'obstacle' && api.customTricks()[0].difficulty === 4
  && api.customTricks()[0].direction === 'roll' && api.customTricks()[0].cat === 'basics');
check('Y3: the form is cleared and back in "add" mode', els.kwadCustomName.value === '' && api.editingIdx() === -1);

api.editCustomTrick(0);
check('Y4: editing loads the row back into the form',
  els.kwadCustomName.value === 'Snap' && els.kwadCustomDesc.value === 'ein Schnapp'
  && els.kwadCustomCheck.value === 'obstacle' && els.kwadCustomDifficulty.value === '4'
  && els.kwadCustomDirection.value === 'roll' && els.kwadCustomCat.value === 'basics');
check('Y5: the save button offers to apply the change and cancel appears',
  els.btnKwadCustomSave.attrs['data-i18n'] === 'kwad_custom_update' && els.btnKwadCustomCancel.hidden === false);
check('Y6: the row being edited is highlighted', api.customList().children[0].className.indexOf('is-editing') !== -1);

els.kwadCustomName.value = 'Snap 2';
els.kwadCustomDesc.value = 'neu';
els.kwadCustomCheck.value = 'free';
els.kwadCustomDifficulty.value = '2';
els.kwadCustomDirection.value = '';
els.kwadCustomCat.value = 'advanced';
api.addCustomTrick();
check('Y7: saving updates the same row instead of adding one',
  api.customTricks().length === 1 && api.customTricks()[0].name === 'Snap 2'
  && api.customTricks()[0].desc === 'neu' && api.customTricks()[0].check === 'free'
  && api.customTricks()[0].difficulty === 2 && api.customTricks()[0].direction === ''
  && api.customTricks()[0].cat === 'advanced');
check('Y8: the form returns to "add" mode after saving',
  api.editingIdx() === -1 && els.btnKwadCustomSave.attrs['data-i18n'] === 'kwad_custom_save' && els.btnKwadCustomCancel.hidden === true);

api.editCustomTrick(0);
els.kwadCustomName.value = 'Weg';
api.resetCustomForm();
check('Y9: cancelling leaves the stored trick untouched',
  api.customTricks()[0].name === 'Snap 2' && api.editingIdx() === -1 && els.kwadCustomName.value === '');

// A rename keeps the pool switch and the statistics attached.
api.customTricks().splice(0);
els.kwadCustomName.value = 'Loop'; els.kwadCustomDesc.value = 'd'; els.kwadCustomCheck.value = 'free';
els.kwadCustomDifficulty.value = '3'; els.kwadCustomCat.value = 'custom';
els.kwadCustomDirection.value = '';
api.addCustomTrick();
api.setPool('custom', { name: 'Loop' }, false);
api.kwadRecordStat('Max', 'Loop', true);
api.editCustomTrick(0);
els.kwadCustomName.value = 'Loop 2';
api.addCustomTrick();
check('Y10: a rename carries the pool switch over',
  api.pool()['custom/Loop 2'] === false && !('custom/Loop' in api.pool()));
check('Y11: a rename carries the global statistics over',
  !!api.stats()['Loop 2'] && api.stats()['Loop 2'].attempted === 1 && !api.stats()['Loop']);
check('Y12: ... and the per-player bucket follows',
  api.kwadPlayerStats()['Max']['Loop 2'].attempted === 1 && !api.kwadPlayerStats()['Max']['Loop']);

api.setGame([{ name: 'Max', letters: '' }, { name: 'Lea', letters: '' }], 0);
api.setPool('basics', { name: 'Dive' }, false);
api.kwadRecordStat('Max', 'Dive', true);
api.startBuiltinEdit('basics/Dive');
els.kwadCustomName.value = 'Dive Revised';
els.kwadCustomDesc.value = 'Neue Beschreibung';
els.kwadCustomCheck.value = 'free';
els.kwadCustomDifficulty.value = '4';
els.kwadCustomDirection.value = 'roll';
api.addCustomTrick();
check('Y13: a built-in trick can be renamed and edited from the shared form',
  api.categories().basics.tricks.some(trick => trick.name === 'Dive Revised' && trick.desc === 'Neue Beschreibung'
    && trick.check === 'free' && trick.difficulty === 4 && trick.direction === 'roll'));
check('Y14: built-in edits preserve pool selection and statistics on rename',
  api.pool()['basics/Dive Revised'] === false && !('basics/Dive' in api.pool())
  && api.stats()['Dive Revised'].attempted === 1 && !api.stats().Dive);
check('Y15: built-in overrides are recorded under their stable default ID',
  api.builtinOverrides()['basics/Dive'].name === 'Dive Revised'
  && api.builtinOverrides()['basics/Dive'].direction === 'roll');

api.applyBuiltinOverrides({
  'basics/Dive': { name: 'Dive Revised', desc: 'Neue Beschreibung', en: { name: 'Dive Updated', desc: 'Updated description' }, check: 'free', difficulty: 4 },
  'basics/unknown': { name: 'Unknown' },
});
const revisedDive = api.categories().basics.tricks.find(trick => trick.name === 'Dive Revised');
api.setLang('en');
check('Z1: built-in overrides apply by stable default ID and retain both languages',
  !!revisedDive && revisedDive.desc === 'Neue Beschreibung' && revisedDive.en.name === 'Dive Updated'
  && revisedDive.en.desc === 'Updated description' && revisedDive.check === 'free' && revisedDive.difficulty === 4
  && revisedDive.direction === 'roll');
check('Z2: invalid override IDs are ignored',
  !Object.prototype.hasOwnProperty.call(api.builtinOverrides(), 'basics/unknown'));
api.renderTrickList();
const revisedCsvRow = api.trickListRows().slice(1).find(row => row[1] === 'Dive Updated');
check('Z3: the CSV export includes the edited built-in name, description and settings',
  !!revisedCsvRow && revisedCsvRow[2] === 'Updated description'
  && revisedCsvRow[3] === 4 && revisedCsvRow[4] === 'kwad_check_free' && revisedCsvRow[5] === 'roll:left|right');
const previousPilotRefreshes = api.pilotStatRenders();
api.kwadRecordStat('Lea', 'Dive Revised', true);
check('Z4: recording a K.W.A.D attempt refreshes the Piloten screen and comparison',
  api.pilotStatRenders() === previousPilotRefreshes + 2);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);