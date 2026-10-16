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

const state = { pilots: ['Ari', 'Bo', 'Cy'], currentPilot: 'Ari', multiplayer: true };
let saves = 0, renders = 0;
const rotate = new Function(
  'state', 'saveSettings', 'renderPilots', 't',
  extract('advancePilotAfterSet') + '\nreturn advancePilotAfterSet;'
)(
  state,
  () => { saves++; },
  () => { renders++; },
  key => key === 'pilot_next_set'
    ? 'Nächster Pilot: {name}.'
    : 'Alle Piloten waren dran. Neue Runde: {name} beginnt.'
);

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

const second = rotate('Ari');
check('P1: after the first pilot, the next pilot is selected and announced',
  state.currentPilot === 'Bo' && second.announcement === 'Nächster Pilot: Bo.');
const third = rotate('Bo');
check('P2: after the second pilot, the third is selected',
  state.currentPilot === 'Cy' && third.announcement === 'Nächster Pilot: Cy.');
const wrapped = rotate('Cy');
check('P3: after the last pilot, announce cycle completion and prepare the first',
  state.currentPilot === 'Ari' && wrapped.wrapped
  && wrapped.announcement === 'Alle Piloten waren dran. Neue Runde: Ari beginnt.');
check('P4: rotation persists and refreshes the active pilot after each set',
  saves === 3 && renders === 3);
check('P5: an unassigned pilot set does not alter the order',
  rotate('Unknown') === null && state.currentPilot === 'Ari' && saves === 3);
state.multiplayer = false;
check('P6: with multiplayer disabled, finishing a pilot set does not rotate or announce',
  rotate('Ari') === null && state.currentPilot === 'Ari' && saves === 3);
state.multiplayer = true;

const stopBody = extract('stopRace');
const finishBody = extract('finishAutoStint');
check('P7: both manual and automatic set completion rotate only after saving the set',
  /const set = saveStint\(\);\s*const pilotChange = set \? advancePilotAfterSet\(set\.pilot\) : null;/.test(stopBody)
  && /const set = saveStint\(\);\s*const pilotChange = set \? advancePilotAfterSet\(set\.pilot\) : null;/.test(finishBody));
check('P8: each announcement puts the race results before the next pilot announcement',
  /speak\(\[resultMessage, pilotChange && pilotChange\.announcement\]\.filter\(Boolean\)\.join\(' '\)\)/.test(stopBody)
  && /speak\(\[resultMessage, pilotChange && pilotChange\.announcement\]\.filter\(Boolean\)\.join\(' '\)\)/.test(finishBody));
check('P9: end-of-round announcements are localized',
  /pilot_next_set: 'Nächster Pilot: \{name\}\.'/u.test(src)
  && /pilot_cycle_done: 'Alle Piloten waren dran\. Neue Runde: \{name\} beginnt\.'/u.test(src)
  && /pilot_next_set: 'Next pilot: \{name\}\.'/u.test(src)
  && /pilot_cycle_done: 'All pilots have flown\. New round: \{name\} starts\.'/u.test(src));

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
