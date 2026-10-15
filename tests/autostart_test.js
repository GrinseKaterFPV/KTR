// P1: does the FIRST gate crossing start the race WITHOUT counting as a lap?
// Extracts the real state machine block plus beginRace/tryTriggerLap/
// recordLap/evaluatePendingLap from app.js and drives it through frame
// sequences, so we test the shipped code rather than a re-implementation.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

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

const s0 = src.indexOf('    // state machine');
const s1 = src.indexOf('    // meter');
if (s0 < 0 || s1 < 0 || s1 <= s0) throw new Error('state machine block markers not found');
const smBlock = src.slice(s0, s1);

const stubs = {
  soundGo: () => {}, soundLap: () => {}, soundBest: () => {},
  speak: () => {}, t: k => k, setStatus: () => {}, dirText: d => d,
  haptic: () => {}, renderLaps: () => {}, updateBest: () => {},
  secondsToSpeech: () => '0:00.000', finishAutoStint: () => {},
};

function make(state) {
  const body = [
    extract('beginRaceAt'), extract('beginRace'), extract('evaluatePendingLap'),
    extract('tryTriggerLap'), extract('recordLap'), extract('announceLap'),
    'function frame(now, changed, globalChange, roi) {\n' + smBlock + '\n}',
    'return { frame };',
  ].join('\n');
  const factory = new Function(
    'state', ...Object.keys(stubs), body
  );
  return factory(state, ...Object.values(stubs));
}

function fresh(over) {
  return Object.assign({
    stream: true, armed: true, raceActive: false, awaitingStart: true, countdownActive: false,
    machine: 0, machineEnterAt: 0, pendingLap: null, needsClear: false,
    enterThreshold: 120, exitThreshold: 60, cooldownMs: 200, direction: 'aus',
    motionBox: null, wrongFlashUntil: 0, directionToastUntil: 0, maxChangedSeen: 0,
    raceStart: 0, currentLapStart: 0, lastTrigger: 0, laps: [],
    roi: { x: 0, y: 0, w: 100, h: 100 },
    announceMode: 'aus', frozenLap: 0, raceElapsed: 0,
    autoStart: true, autoLaps: 0, currentPilot: 'Max', stintSaved: false,
  }, over || {});
}

let pass = 0, fail = 0;
const check = (n, c) => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + n); };

// --- Scenario A: first crossing starts the race, never becomes a lap -------
const st = fresh();
const app = make(st);
app.frame(1000, 500, false, st.roi);   // drone enters -> race must start here
check('A1: race is running after the first crossing', st.raceActive === true);
check('A2: awaitingStart cleared', st.awaitingStart === false);
check('A3: raceStart = timestamp of the first crossing (1000)', st.raceStart === 1000);
check('A4: gate marked busy after start (machine=1)', st.machine === 1);
for (const t of [1100, 1200, 1300]) {          // drone lingers inside the gate
  app.frame(t, 500, false, st.roi);
}
check('A5: no lap while it lingers in the gate', st.laps.length === 0);
app.frame(1400, 10, false, st.roi);            // leaves the gate
check('A6: leaving after the start still counts 0 laps', st.laps.length === 0);
app.frame(1500, 10, false, st.roi);            // gate quiet -> re-arm allowed
check('A7: gate re-armed (needsClear=false)', st.needsClear === false);

// --- Scenario B: the SECOND crossing produces exactly one lap --------------
app.frame(5000, 500, false, st.roi);           // enter -> lap
app.frame(5100, 10, false, st.roi);            // exit
check('B1: exactly one lap recorded', st.laps.length === 1);
check('B2: raceStart untouched by the second crossing', st.raceStart === 1000);
if (st.laps[0]) {
  check('B3: lap timed from first pass to second pass (4000ms)', st.laps[0].duration === 4000);
  check('B4: lap triggered at the second crossing entry (t=5000)', st.laps[0].at === 5000);
  check('B5: lap index 1', st.laps[0].idx === 1);
}

// --- Scenario C: direction check active -> still one lap, entry time --------
const st2 = fresh({ direction: 'lr' });
const app2 = make(st2);
st2.motionBox = { changed: 100, cx: 10, cy: 50 };
app2.frame(1000, 500, false, st2.roi);         // first pass -> start race
check('C1: no lap from the first pass (direction=lr)', st2.laps.length === 0);
app2.frame(1400, 10, false, st2.roi);
app2.frame(1500, 10, false, st2.roi);
st2.motionBox = { changed: 100, cx: 10, cy: 50 };
app2.frame(5000, 500, false, st2.roi);         // enter, left->right trajectory
st2.motionBox = { changed: 100, cx: 80, cy: 50 };
app2.frame(5050, 300, false, st2.roi);         // still inside, moves right
check('C2: no lap on entry yet', st2.laps.length === 0);
app2.frame(5100, 10, false, st2.roi);          // exit -> evaluate direction
check('C3: correct direction yields exactly one lap', st2.laps.length === 1);
if (st2.laps[0]) check('C4: lap timed from the 2nd crossing entry', st2.laps[0].at === 5000);

// --- Scenario D: wrong direction must not create a lap ---------------------
const st3 = fresh({ direction: 'lr' });
const app3 = make(st3);
app3.frame(1000, 500, false, st3.roi);
app3.frame(1400, 10, false, st3.roi);
app3.frame(1500, 10, false, st3.roi);
st3.motionBox = { changed: 100, cx: 80, cy: 50 };
app3.frame(5000, 500, false, st3.roi);         // enter
st3.motionBox = { changed: 100, cx: 10, cy: 50 };
app3.frame(5050, 300, false, st3.roi);         // moves left (wrong way)
app3.frame(5100, 10, false, st3.roi);          // exit -> direction rejected
check('D1: wrong direction records no lap', st3.laps.length === 0);
check('D2: wrong-direction flash shown', st3.wrongFlashUntil > 5100);

// --- Scenario E: global change (focus/light) must not start the race -------
const st4 = fresh();
const app4 = make(st4);
app4.frame(1000, 99999, true, st4.roi);        // global change, not a drone
check('E1: focus/light change does not start the race', st4.raceActive === false);
check('E2: still waiting for the first pass', st4.awaitingStart === true);

// --- Scenario F: manual (non auto) start must count laps normally ----------
const st5 = fresh({ awaitingStart: false, raceActive: true, raceStart: 1000, currentLapStart: 1000, lastTrigger: 1000, direction: 'aus' });
const app5 = make(st5);
app5.frame(5000, 500, false, st5.roi);
check('F1: manual mode, first real crossing = lap 1', st5.laps.length === 1);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
