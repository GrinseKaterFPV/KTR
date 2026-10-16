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

let language = 'de';
const translations = {
  de: {
    waiting_first_speech: 'Warte auf den ersten Durchflug.',
    waiting_for_pilot: 'Warte auf den ersten Durchflug von {name}.',
  },
  en: {
    waiting_first_speech: 'Waiting for the first crossing.',
    waiting_for_pilot: 'Waiting for the first crossing from {name}.',
  },
};
const t = key => translations[language][key];
const state = {
  announceMode: 'jede',
  multiplayer: false,
  pilots: [],
  currentPilot: null,
};
const waitingSpeechAnnouncement = new Function(
  'state',
  't',
  extract('waitingSpeechAnnouncement') + '\nreturn waitingSpeechAnnouncement;'
)(state, t);

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

check('A1: waiting cue is spoken without pilot rotation',
  waitingSpeechAnnouncement() === 'Warte auf den ersten Durchflug.');

state.multiplayer = true;
state.pilots = ['Mira', 'Noah'];
state.currentPilot = 'Noah';
check('A2: multiplayer waiting cue identifies the active pilot',
  waitingSpeechAnnouncement() === 'Warte auf den ersten Durchflug von Noah.');

state.pilots = ['Mira'];
check('A3: a single pilot receives the generic waiting cue',
  waitingSpeechAnnouncement() === 'Warte auf den ersten Durchflug.');

state.pilots = ['Mira', 'Noah'];
state.announceMode = 'aus';
check('A4: disabled voice announcements suppress the waiting cue',
  waitingSpeechAnnouncement() === '');

state.announceMode = 'jede';
language = 'en';
check('A5: English waiting announcement is localized',
  waitingSpeechAnnouncement() === 'Waiting for the first crossing from Noah.');

for (const name of ['stopRace', 'finishAutoStint']) {
  const body = extract(name);
  check(name + ' appends the waiting cue to the completed-set announcement',
    /waitingAnnouncement\]\.filter\(Boolean\)\.join\(' '\)/.test(body)
    && /armAutoWait\(true, false\)/.test(body));
}

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
