// Minimal test runner: executes every *.test.js in this folder in its own
// process and reports a single summary. Run with: npm test
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('_test.js')).sort();
if (files.length === 0) { console.log('no tests found'); process.exit(0); }

const failed = [];
for (const file of files) {
  console.log('\n=== ' + file + ' ===');
  try {
    process.stdout.write(execFileSync(process.execPath, [path.join(dir, file)], { encoding: 'utf8' }));
  } catch (err) {
    process.stdout.write((err.stdout || '') + (err.stderr || ''));
    failed.push(file);
  }
}

console.log('\n' + (failed.length === 0
  ? 'ALL TESTS OK (' + files.length + ' files)'
  : 'TESTS FAILED: ' + failed.join(', ')));
process.exit(failed.length === 0 ? 0 : 1);
