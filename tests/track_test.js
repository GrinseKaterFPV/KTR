const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function extract(name) {
  const key = 'function ' + name + '(';
  const start = src.indexOf(key);
  if (start < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('{', start), depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

let pass = 0, fail = 0;
const check = (name, condition) => {
  condition ? pass++ : fail++;
  console.log((condition ? 'PASS ' : 'FAIL ') + name);
};

const recordState = {
  tracks: [{
    id: 'track-main',
    records: [
      { pilot: 'Ari', bestLapMs: 3600, bestSets: [{ lapCount: 2, totalMs: 8000 }, { lapCount: 3, totalMs: 11000 }] },
      { pilot: 'Bo', bestLapMs: 3800, bestSets: [{ lapCount: 2, totalMs: 8200 }, { lapCount: 3, totalMs: 12000 }] },
    ],
  }],
};
const records = new Function('state', extract('trackRecords') + '\nreturn trackRecords;')(recordState);
const sets = [
  { pilot: 'Ari', trackId: 'track-main', totalMs: 9000, bestMs: 4000, lapCount: 2, laps: [{ duration: 4000 }, { duration: 5000 }] },
  { pilot: 'Bo', trackId: 'track-main', totalMs: 8200, bestMs: 3900, lapCount: 2, laps: [{ duration: 4300 }, { duration: 3900 }] },
  { pilot: 'Ari', trackId: 'track-main', totalMs: 8000, bestMs: 3800, lapCount: 2, laps: [{ duration: 4200 }, { duration: 3800 }] },
  { pilot: 'Bo', trackId: 'track-main', totalMs: 12000, bestMs: 3800, lapCount: 3, laps: [{ duration: 3800 }, { duration: 4000 }, { duration: 4200 }] },
  { pilot: 'Ari', trackId: 'track-main', totalMs: 11000, bestMs: 3700, lapCount: 3, laps: [{ duration: 3700 }, { duration: 3600 }, { duration: 3700 }] },
  { pilot: 'Bo', trackId: 'track-main', totalMs: 9800, bestMs: 1000, lapCount: 2, laps: [{ duration: 4800 }, { duration: 5000 }] },
  { pilot: 'Ari', trackId: 'track-main', totalMs: 5000, bestMs: 1000, lapCount: 2, ranked: false, laps: [{ duration: 1000 }, { duration: 4000 }] },
  { pilot: 'Ari', trackId: 'track-main', totalMs: 11000, bestMs: 500, lapCount: 11, laps: Array.from({ length: 11 }, () => ({ duration: 500 })) },
];
const result = records(sets, 'track-main');
check('R1: fastest lap is independent of set lap counts',
  result.bestLap.pilot === 'Ari' && result.bestLap.duration === 3600);
check('R2: fastest sets are ranked separately by count, ignoring worse and unranked times',
  result.bestSets.length === 2
  && result.bestSets[0].lapCount === 2 && result.bestSets[0].pilot === 'Ari' && result.bestSets[0].totalMs === 8000
  && result.bestSets[1].lapCount === 3 && result.bestSets[1].pilot === 'Ari' && result.bestSets[1].totalMs === 11000);
check('R3: each pilot has a separate fastest set for each lap count',
  result.pilots.find(pilot => pilot.pilot === 'Ari').bestLap === 3600
  && result.pilots.find(pilot => pilot.pilot === 'Ari').bestSets.find(best => best.lapCount === 2).totalMs === 8000
  && result.pilots.find(pilot => pilot.pilot === 'Ari').bestSets.find(best => best.lapCount === 3).totalMs === 11000
  && result.pilots.find(pilot => pilot.pilot === 'Bo').bestLap === 3800
  && result.pilots.find(pilot => pilot.pilot === 'Bo').bestSets.find(best => best.lapCount === 2).totalMs === 8200
  && result.pilots.find(pilot => pilot.pilot === 'Bo').bestSets.find(best => best.lapCount === 3).totalMs === 12000);
const emptyRecords = new Function(
  'state', extract('trackRecords') + '\nreturn trackRecords;'
)({ tracks: [{ id: 'track-main', records: [] }] });
check('R4: empty input has no best times', emptyRecords([], 'track-main').bestLap === null
  && emptyRecords([], 'track-main').bestSets.length === 0);
const longOnly = emptyRecords([
  { pilot: 'Long', trackId: 'track-main', totalMs: 100, bestMs: 1, lapCount: 11, laps: Array.from({ length: 11 }, () => ({ duration: 1 })) },
], 'track-main');
check('R5: sets longer than 10 laps do not contribute even to best-lap records',
  longOnly.bestLap === null && longOnly.bestSets.length === 0);
const migrationState = {
  tracks: [{ id: 'track-main' }],
  sets: [{ pilot: 'Legacy', trackId: 'track-main', totalMs: 9000, bestMs: 4000, laps: [{ duration: 4000 }, { duration: 5000 }] }],
};
let migrationSaves = 0;
const migrate = new Function(
  'state', 'updateTrackRecord', 'saveSettings',
  extract('migrateTrackRecords') + '\nreturn migrateTrackRecords;'
)(migrationState, new Function(
  'state', 'saveSettings', extract('updateTrackRecord') + '\nreturn updateTrackRecord;'
)(migrationState, () => {}), () => { migrationSaves++; });
migrate();
const migratedRecords = new Function(
  'state', extract('trackRecords') + '\nreturn trackRecords;'
)(migrationState)(migrationState.sets, 'track-main');
check('R6: legacy sets migrate once into stored track records',
  migratedRecords.bestSets.length === 1 && migratedRecords.bestSets[0].lapCount === 2
  && migrationSaves === 1);
let clearSaves = 0;
const clearTrack = new Function(
  'state', 'timerBusy', 't', 'askConfirm', 'saveSettings', 'renderTracks',
  extract('clearTrackRecords') + '\nreturn clearTrackRecords;'
)(migrationState, () => false, key => key, () => true, () => { clearSaves++; }, () => {});
clearTrack('track-main');
migrate();
const clearedRecords = new Function(
  'state', extract('trackRecords') + '\nreturn trackRecords;'
)(migrationState)(migrationState.sets, 'track-main');
check('R7: clearing records persists and historical sets do not repopulate them',
  migrationState.sets.length === 1 && clearedRecords.bestLap === null && !clearedRecords.bestSets.length
  && clearSaves === 1 && migrationSaves === 1);
const allClearState = {
  tracks: [
    { id: 'one', records: [{ pilot: 'A', bestLapMs: 3000, bestSets: [] }] },
    { id: 'two', records: [{ pilot: 'B', bestLapMs: 4000, bestSets: [] }] },
  ],
  sets: [{ trackId: 'one', pilot: 'A' }],
};
let allClearSaves = 0;
const clearAll = new Function(
  'state', 'timerBusy', 't', 'askConfirm', 'saveSettings', 'renderTracks',
  extract('clearAllTrackRecords') + '\nreturn clearAllTrackRecords;'
)(allClearState, () => false, key => key, () => true, () => { allClearSaves++; }, () => {});
clearAll();
check('R8: clearing all records leaves tracks and race history intact',
  allClearState.tracks.length === 2 && allClearState.tracks.every(track => track.records.length === 0)
  && allClearState.sets.length === 1 && allClearSaves === 1);
let exportedFilename = '';
let exportedRows = [];
const exportTracks = new Function(
  'downloadCsv', extract('exportTracksCsv') + '\nreturn exportTracksCsv;'
)((filename, rows) => { exportedFilename = filename; exportedRows = rows; });
const exportData = [
  {
    id: 'one', name: 'Hill Track', description: 'Upper section',
    records: [{ pilot: 'Ari', bestLapMs: 3650, bestSets: [{ lapCount: 2, totalMs: 8200 }] }],
  },
  { id: 'two', name: 'Empty', description: '', records: [] },
];
exportTracks(exportData);
check('R9: all-track CSV export includes metadata, personal bests, and empty tracks',
  exportedFilename === 'fpv-tracks.csv' && exportedRows.length === 4
  && exportedRows[0].join(',') === 'track_name,description,pilot,record_type,lap_count,time_ms'
  && exportedRows.some(row => row[0] === 'Hill Track' && row[1] === 'Upper section' && row[3] === 'best_lap' && row[5] === 3650)
  && exportedRows.some(row => row[0] === 'Hill Track' && row[3] === 'best_set' && row[4] === 2 && row[5] === 8200)
  && exportedRows.some(row => row[0] === 'Empty' && row[3] === 'track'));
exportTracks([exportData[0]]);
check('R10: individual CSV export is scoped to one track',
  exportedFilename === 'track-Hill-Track.csv' && exportedRows.length === 3
  && exportedRows.every(row => row[0] === 'track_name' || row[0] === 'Hill Track'));
exportTracks([exportData[0]], true);
check('R11: export-all keeps its filename even when only one track exists',
  exportedFilename === 'fpv-tracks.csv' && exportedRows.length === 3);

const updateState = { tracks: [{ id: 'track-main', records: [] }] };
let recordSaves = 0;
const updateRecord = new Function(
  'state', 'saveSettings', extract('updateTrackRecord') + '\nreturn updateTrackRecord;'
)(updateState, () => { recordSaves++; });
updateRecord({ pilot: 'Ari', trackId: 'track-main', ranked: true, lapCount: 2, bestMs: 3800, totalMs: 8000, laps: [{ duration: 4200 }, { duration: 3800 }] });
updateRecord({ pilot: 'Ari', trackId: 'track-main', ranked: true, lapCount: 2, bestMs: 4100, totalMs: 9000, laps: [{ duration: 4900 }, { duration: 4100 }] });
check('R12: a slower ranked run does not overwrite the pilot personal best',
  updateState.tracks[0].records[0].bestLapMs === 3800
  && updateState.tracks[0].records[0].bestSets[0].totalMs === 8000
  && recordSaves === 1);
updateRecord({ pilot: 'Ari', trackId: 'track-main', ranked: true, lapCount: 2, bestMs: 3700, totalMs: 7900, laps: [{ duration: 4200 }, { duration: 3700 }] });
check('R13: a new personal best updates only its better record',
  updateState.tracks[0].records[0].bestLapMs === 3700
  && updateState.tracks[0].records[0].bestSets[0].totalMs === 7900
  && recordSaves === 2);
updateRecord({ pilot: 'Ari', trackId: 'track-main', ranked: false, lapCount: 2, bestMs: 1000, totalMs: 1000, laps: [{ duration: 1000 }] });
updateRecord({ pilot: 'Ari', trackId: 'track-main', ranked: true, lapCount: 11, bestMs: 1000, totalMs: 1000, laps: Array.from({ length: 11 }, () => ({ duration: 1000 })) });
check('R14: unranked and over-10-lap runs cannot change personal records',
  updateState.tracks[0].records[0].bestLapMs === 3700
  && updateState.tracks[0].records[0].bestSets[0].totalMs === 7900
  && recordSaves === 2);

recordState.tracks[0].records = [{ pilot: 'Ari', bestLapMs: 3600, bestSets: [{ lapCount: 2, totalMs: 7600 }] }];
const retained = records([
  { pilot: 'Ari', trackId: 'track-main', totalMs: 9000, bestMs: 4000, lapCount: 2, laps: [{ duration: 4000 }, { duration: 5000 }] },
]);
check('R15: stored personal bests do not regress when slower attempts remain in history',
  retained.bestLap.pilot === 'Ari' && retained.bestLap.duration === 3600
  && retained.bestSets[0].totalMs === 7600);
const retainedWithoutHistory = records([], 'track-main');
check('R16: stored personal bests remain after race-history entries are removed',
  retainedWithoutHistory.bestLap.duration === 3600 && retainedWithoutHistory.bestSets[0].totalMs === 7600);

const state = {
  laps: [{ idx: 1, duration: 4100, total: 4100, pilot: 'Ari' }],
  stintSaved: false, currentPilot: 'Ari', raceTrackId: 'track-hill', raceRankedMode: true,
  sets: [],
};
let saved = 0, rendered = 0;
const saveStint = new Function(
  'state', 'nextSetNumber', 'updateTrackRecord', 'saveSets', 'renderSets',
  extract('saveStint') + '\nreturn saveStint;'
)(state, () => 2, () => {}, () => { saved++; }, () => { rendered++; });
const completed = saveStint();
check('R6: a completed stint stores the race track, pilot, and lap count',
  completed.trackId === 'track-hill' && completed.pilot === 'Ari'
  && completed.ranked === true && completed.bestMs === 4100 && completed.totalMs === 4100 && completed.lapCount === 1);
check('R7: saved track, ranked state, and lap count data is persisted and rendered',
  state.sets[0] === completed && saved === 1 && rendered === 1);

const trackSets = new Function(
  'state',
  extract('trackSets') + '\nreturn trackSets;'
)({
  tracks: [{ id: 'track-hill', name: 'Hill' }],
  sets: [
    { trackId: 'track-hill' },
    { trackId: null },
    {},
    { trackId: 'deleted-track' },
  ],
});
check('R8: unassigned and legacy times remain separate from assigned track times',
  trackSets('track-hill').length === 1 && trackSets('').length === 3);

const deleteState = {
  tracks: [{ id: 'track-a', name: 'A' }, { id: 'track-b', name: 'B' }],
  activeTrackId: 'track-a',
  sets: [{ trackId: 'track-a' }, { trackId: 'track-b' }],
};
let setsSaved = 0, settingsSaved = 0, trackRenders = 0, setRenders = 0;
const deleteApi = new Function(
  'state', 'timerBusy', 'askConfirm', 't', 'saveSets', 'saveSettings',
  'renderTracks', 'renderSets', 'toast',
  'let trackEditingId = "";' + extract('deleteTrack') + '\nreturn deleteTrack;'
)(
  deleteState, () => false, () => true, key => key,
  () => { setsSaved++; }, () => { settingsSaved++; },
  () => { trackRenders++; }, () => { setRenders++; }, () => {}
);
deleteApi('track-a');
check('R12: deleting a track preserves its sets as unassigned and activates another track',
  deleteState.sets[0].trackId === null && deleteState.sets[1].trackId === 'track-b'
  && deleteState.tracks.length === 1 && deleteState.activeTrackId === 'track-b');
check('R13: deleting a track saves and refreshes track and race views',
  setsSaved === 1 && settingsSaved === 1 && trackRenders === 1 && setRenders === 1);

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
