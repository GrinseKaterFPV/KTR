const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function extract(name) {
  const start = src.indexOf('function ' + name + '(');
  if (start < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('{', start), depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) return src.slice(start, i + 1);
  }
  throw new Error('unbalanced: ' + name);
}

let now = 9000;
const state = {
  raceActive: true,
  raceStart: 1000,
  currentLapStart: 7000,
  lastTrigger: 7000,
  raceElapsed: 8000,
  frozenLap: 2000,
  pendingLap: { t: 8000 },
  machine: 1,
  machineEnterAt: 8000,
  needsClear: false,
  laps: [
    { idx: 1, duration: 3000, total: 3000, at: 4000 },
    { idx: 2, duration: 3000, total: 6000, at: 7000 },
  ],
};
const els = { lastLap: { textContent: '' } };
let renders = 0, bestUpdates = 0, timerUpdates = 0;
const undoLap = new Function(
  'state', 'performance', 'renderLaps', 'updateBest', 'els', 'fmt', 'updateTimers',
  extract('undoLap') + '\nreturn undoLap;'
)(
  state,
  { now: () => now },
  () => { renders++; },
  () => { bestUpdates++; },
  els,
  ms => 't=' + ms,
  () => { timerUpdates++; }
);

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

check('U1: removes only the most recent lap', undoLap() && state.laps.length === 1 && state.laps[0].idx === 1);
check('U2: restores lap start and trigger to the previous crossing',
  state.currentLapStart === 4000 && state.lastTrigger === 4000);
check('U3: clears pending gate state and requires the gate to clear',
  state.pendingLap === null && state.machine === 0 && state.machineEnterAt === 0 && state.needsClear);
check('U4: refreshes race elapsed, frozen lap, visible last lap, and UI',
  state.raceElapsed === 8000 && state.frozenLap === 5000 && els.lastLap.textContent === 't=3000'
  && renders === 1 && bestUpdates === 1 && timerUpdates === 1);
state.laps = [];
const stoppedRaceActive = state.raceActive;
check('U5: does nothing if there is no lap to undo', undoLap() === false && state.laps.length === 0);
state.laps = [{ idx: 1, duration: 3000, total: 3000, at: 4000 }];
state.raceActive = false;
check('U6: does not edit a stopped or already saved race', undoLap() === false && state.laps.length === 1);
state.raceActive = stoppedRaceActive;

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
