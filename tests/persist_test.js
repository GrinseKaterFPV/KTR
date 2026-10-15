// P5: "Auto Lap detection" (state.armed) must survive a reload.
// Runs the REAL saveSettings with stubs and reads back the stored JSON, plus two
// static guards for the restore path and the toggle handler. This is a regression
// guard: if someone drops `armed` from the saved settings, this test fails.
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

let pass = 0, fail = 0;
const check = (n, c) => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + n); };

// --- real saveSettings round-trip -------------------------------------------
const store = {};
const fakeStorage = { setItem: (k, v) => { store[k] = v; }, getItem: k => (k in store ? store[k] : null) };
const els = { procRes: { value: '320x240' } };

function stateWith(armed) {
  return {
    diffThreshold: 35, enterThreshold: 120, exitThreshold: 60, cooldownMs: 2000,
    roi: null, pilots: [], currentPilot: null, pilotColors: {}, showMotion: true,
    audioEnabled: true, countdownSecs: 5, announceMode: 'jede', announceRate: 1,
    direction: 'aus', driftComp: true, camLock: false, camDeviceId: '',
    autoStart: false, armed, autoLaps: 0, setFilter: '', accent: '#ff7a1a',
    sections: {}, lang: 'de', voiceURI: '',
  };
}

// saveSettings() reads `state` from its closure, so bind a fresh state per run.
function makeSave(state) {
  const factory = new Function(
    'state', 'els', 'localStorage', 'toast', 't', 'trimSetsToFit', 'storageError',
    extract('saveSettings') + '\nreturn saveSettings;'
  );
  return factory(state, els, fakeStorage, () => {}, k => k, () => 0, () => {});
}

const okTrue = makeSave(stateWith(true))();
check('P1: saveSettings reports success', okTrue === true);
const storedTrue = JSON.parse(store['fpv_settings']);
check('P2: armed=true is written', storedTrue.armed === true);

makeSave(stateWith(false))();
const storedFalse = JSON.parse(store['fpv_settings']);
check('P3: armed=false is written', storedFalse.armed === false);

// --- the stored value is loaded back into state -----------------------------
check('P4: settings are read from the same key', /localStorage\.getItem\('fpv_settings'/.test(extract('loadSettings')));
check('P5: state.armed is restored on start', /state\.armed = s\.armed \?\? false;/.test(src));
check('P6: the checkbox reflects the restored value', /els\.armedToggle\.checked = state\.armed;/.test(src));

// --- toggling the switch persists immediately -------------------------------
const handler = src.slice(src.indexOf("els.armedToggle.addEventListener('change'"));
check('P7: toggling the switch sets state.armed', /state\.armed = e\.target\.checked;/.test(handler.slice(0, 400)));
check('P8: toggling the switch saves the settings', /saveSettings\(\);/.test(handler.slice(0, 400)));

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
