const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = src.indexOf('function setLapLimitReached(');
if (start < 0) throw new Error('setLapLimitReached not found');
let i = src.indexOf('{', start), depth = 0, end = -1;
for (; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}' && --depth === 0) { end = i + 1; break; }
}
if (end < 0) throw new Error('unbalanced setLapLimitReached');
const checkLimit = new Function(
  'state',
  src.slice(start, end) + '\nreturn setLapLimitReached;'
);

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

const state = { autoStart: false, autoLaps: 2, laps: [{}, {}] };
check('S1: the configured lap count ends a set with auto-start disabled',
  checkLimit(state)(true));
state.autoStart = true;
check('S2: the configured lap count also ends a set with auto-start enabled',
  checkLimit(state)(true));
state.autoLaps = 0;
check('S3: zero laps means unlimited, not immediate set completion',
  checkLimit(state)(true) === false);
state.autoLaps = 3;
check('S4: the set continues until it reaches the configured number',
  checkLimit(state)(true) === false);
state.laps.push({});
check('S5: a rejected/too-short lap does not finish the set',
  checkLimit(state)(false) === false);
check('S6: the lap limit is checked from both auto and manual lap paths',
  (src.match(/if \(setLapLimitReached\(recorded\)\) \{\s*finishAutoStint\(\);/g) || []).length === 2
  && /if \(state\.raceActive && v > 0 && state\.laps\.length >= v\) finishAutoStint\(\)/.test(src));
check('S7: without a camera, finishing a set does not wait for another crossing',
  /if \(state\.autoStart && state\.stream\) \{\s*armAutoWait\(true, false\)/.test(src));

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
