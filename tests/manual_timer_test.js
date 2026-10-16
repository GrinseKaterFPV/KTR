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

function make(overrides) {
  const state = Object.assign({
    stream: null,
    countdownActive: false,
    raceActive: false,
    autoStart: true,
    countdownSecs: 0,
    laps: [{ idx: 1 }],
    stintSaved: true,
    armed: false,
    awaitingStart: true,
    raceElapsed: 5000,
    frozenLap: 3000,
    machine: 1,
    machineEnterAt: 4000,
    needsClear: true,
    pendingLap: { t: 4000 },
    wrongFlashUntil: 10,
    directionToastUntil: 10,
    maxChangedSeen: 10,
    lastTrigger: 4000,
    lastCountdownValue: 1,
  }, overrides || {});
  const els = {
    armedToggle: { checked: false },
    lastLap: { textContent: 'old lap' },
  };
  const calls = { countdown: 0, autoWait: 0, beginRace: 0, status: '' };
  const startCountdown = new Function(
    'state', 'els', 'armAutoWait', 'unlockAudio', 'primeSpeech', 'renderLaps',
    'updateBest', 'performance', 'beginRace', 'setStatus', 't',
    extract('startCountdown') + '\nreturn startCountdown;'
  )(
    state, els,
    () => { calls.autoWait++; },
    () => {},
    () => {},
    () => {},
    () => {},
    { now: () => 1000 },
    () => { calls.beginRace++; state.raceActive = true; },
    message => { calls.status = message; },
    key => key
  );
  return { state, els, calls, startCountdown };
}

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

const offline = make({ stream: null, autoStart: true, countdownSecs: 0 });
offline.startCountdown();
check('T1: manual timer starts without a camera, even when auto-start is enabled',
  offline.calls.autoWait === 0 && offline.calls.beginRace === 1 && offline.state.raceActive);
check('T2: starting offline resets the current stint and clears lap output',
  offline.state.laps.length === 0 && offline.state.stintSaved === false
  && offline.els.lastLap.textContent === '--');
check('T3: offline manual start does not enter camera-wait mode',
  offline.state.awaitingStart === false && offline.els.armedToggle.checked);

const onlineAuto = make({ stream: {}, autoStart: true });
onlineAuto.startCountdown();
check('T4: with a camera, auto-start still waits for a gate crossing',
  onlineAuto.calls.autoWait === 1 && onlineAuto.calls.beginRace === 0);

const onlineManual = make({ stream: {}, autoStart: false, countdownSecs: 0 });
onlineManual.startCountdown();
check('T5: with a camera and auto-start disabled, manual start still works',
  onlineManual.calls.autoWait === 0 && onlineManual.calls.beginRace === 1);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
