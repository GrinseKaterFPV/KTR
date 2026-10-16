const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = src.indexOf('function raceResultAnnouncement(');
if (start < 0) throw new Error('raceResultAnnouncement not found');
let i = src.indexOf('{', start), depth = 0, end = -1;
for (; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}' && --depth === 0) { end = i + 1; break; }
}
if (end < 0) throw new Error('unbalanced raceResultAnnouncement');

const strings = {
  lap_average: 'Rundendurchschnitt ',
  fastest_lap: 'Schnellste Runde ',
};
const announcement = new Function(
  'secondsToSpeech',
  't',
  src.slice(start, end) + '\nreturn raceResultAnnouncement;'
)(ms => `${ms}ms`, key => strings[key]);

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

const result = announcement('Satz beendet. Gesamtzeit ', 30000, [
  { duration: 12000 },
  { duration: 9000 },
  { duration: 15000 },
]);
check('A1: announces overall time before average and fastest lap', result ===
  'Satz beendet. Gesamtzeit 30000ms. Rundendurchschnitt 12000ms. Schnellste Runde 9000ms');
check('A2: average is computed from lap durations, not race total', result.includes('Rundendurchschnitt 12000ms'));
check('A3: announcements without laps retain the total-time-only message',
  announcement('Stopp. Gesamtzeit ', 30000, []) === 'Stopp. Gesamtzeit 30000ms');

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
