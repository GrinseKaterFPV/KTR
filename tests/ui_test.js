// UI round: Camera-settings overlay, slimmed timer settings, checkbox styling,
// the dedicated Piloten screen and the K.W.A.D copter icon. Structure is checked
// against the real index.html / styles.css / sw.js / manifest, and the pilot
// profile helpers (addPilot / removePilot) are extracted from app.js and driven
// against stubs, so we test the shipped logic, not a copy.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

let pass = 0, fail = 0;
const check = (n, c) => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + n); };

// --- extract a full function body from app.js -------------------------------
function extract(name) {
  const key = 'function ' + name + '(';
  const start = app.indexOf(key);
  if (start < 0) throw new Error('not found: ' + name);
  let i = app.indexOf('{', start), depth = 0;
  for (; i < app.length; i++) {
    const c = app[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return app.slice(start, i + 1); }
  }
  throw new Error('unbalanced: ' + name);
}
// Slice a whole overlay <div> so a field can be attributed to one overlay only.
function overlayBlock(marker) {
  const start = html.indexOf(marker);
  if (start < 0) return '';
  let depth = 0, end = -1;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    if (m[0] === '<div') depth++;
    else { depth--; if (depth === 0) { end = m.index + m[0].length; break; } }
  }
  return end < 0 ? '' : html.slice(start, end);
}
const appOverlay = overlayBlock('<div class="settings-overlay" id="settingsOverlay"');
const timerOverlay = overlayBlock('<div class="settings-overlay" id="timerSettingsOverlay"');
const cameraOverlay = overlayBlock('<div class="settings-overlay" id="cameraSettingsOverlay"');

// --- 1) camera settings live in their own overlay ---------------------------
check('C1: camera overlay exists', cameraOverlay.length > 200);
check('C2: camera overlay carries the Kamera group', cameraOverlay.includes('data-i18n="g_detection"'));
check('C3: detection fields moved to camera overlay',
  ['diffThresh', 'enterThresh', 'exitThresh', 'cooldown', 'procRes', 'directionSelect', 'driftComp', 'camLock']
    .every(id => cameraOverlay.includes('id="' + id + '"')));
check('C4: camera gear sits in the camera card summary',
  /<summary class="card-summary">[^]*?id="btnCameraSettings"[^]*?<\/summary>/.test(html));
check('C5: camera gear opens the camera overlay',
  /els\.btnCameraSettings\.addEventListener\('click', \(\) => openSettings\('camera'\)\)/.test(app));
check('C6: the camera overlay is part of the single-overlay set',
  /allSettingsOverlays = \[els\.settingsOverlay, els\.timerSettingsOverlay, els\.cameraSettingsOverlay\]/.test(app));

// --- 2) timer settings are slimmed down --------------------------------------
check('S1: no detection fields left in the timer overlay',
  !timerOverlay.includes('id="diffThresh"') && !timerOverlay.includes('id="directionSelect"'));
check('S2: "Auto-Start & Rennen" group is gone',
  !timerOverlay.includes('data-i18n="g_autostart"') && !timerOverlay.includes('id="autoStart"'));
check('S3: the duplicate auto-start checkbox is gone from the whole page',
  !html.includes('id="autoStart"'));
check('S4: Runden/Satz stays in the timer menu', timerOverlay.includes('id="autoLaps"'));
check('S5: Countdown stays in the timer menu', timerOverlay.includes('id="countdownInput"'));
check('S6: race & audio group stays in the timer menu', timerOverlay.includes('data-i18n="g_audio"'));
check('S7: the auto-start quick switch in the timer card is kept',
  html.includes('id="autoStartQuick"') && html.includes('id="autoLapsBadge"') && html.includes('id="countdownBadge"'));
check('S8: the g_autostart i18n key was removed',
  !app.includes('g_autostart:'));

// --- 3) checkbox text highlights when checked --------------------------------
check('K1: a checked quick checkbox colours its label', /\.auto-quick input:checked \+ span \{ color: var\(--accent\); \}/.test(css));
check('K2: "Auto-Lap detection" row carries the highlight class',
  /class="check-row auto-quick"><input type="checkbox" id="armedToggle"/.test(html));
check('K3: "Auto-start on 1st pass" row carries the highlight class',
  /class="check-row auto-quick"><input type="checkbox" id="autoStartQuick"/.test(html));

// --- 4) Piloten tile + screen -------------------------------------------------
check('P1: a Piloten tile exists on the home grid',
  html.includes('id="tilePilots"') && html.includes('data-i18n="m_pilots"'));
check('P2: the Piloten screen exists',
  html.includes('id="pilotsScreen"') && html.includes('id="pilotsScreenList"') && html.includes('id="pilotsScreenCompare"'));
check('P3: the screen offers name + colour + save',
  html.includes('id="pilotScreenName"') && html.includes('id="pilotScreenColor"') && html.includes('id="btnPilotScreenAdd"'));
check('P4: the screen offers a CSV export', html.includes('id="btnPilotExport"'));
check('P5: the tile opens the Piloten screen',
  /els\.tilePilots\.addEventListener\('click', openPilots\)/.test(app));
check('P6: the comparison table is shared with the sets card',
  /function pilotCompareHTML\(\)/.test(app) && /els\.pilotsScreenCompare\.innerHTML = html/.test(app));
check('P7: openHome / closeHome hide the Piloten screen',
  (app.match(/els\.pilotsScreen\) els\.pilotsScreen\.hidden = true/g) || []).length >= 3);

// --- 5) K.W.A.D copter icon ---------------------------------------------------
const iconKwadPath = path.join(root, 'icon-kwad.svg');
check('I1: the K.W.A.D icon file exists', fs.existsSync(iconKwadPath));
const iconKwad = fs.existsSync(iconKwadPath) ? fs.readFileSync(iconKwadPath, 'utf8') : '';
check('I2: the icon is a quadcopter drawing, not a skateboard',
  /<svg/.test(iconKwad) && /circle/.test(iconKwad) && !/skate|🛹/i.test(iconKwad));
check('I3: the tile uses the icon instead of the skateboard emoji',
  /id="tileKwad"[^]*?src="icon-kwad\.svg"/.test(html) && !html.includes('🛹'));
check('I4: the K.W.A.D hero uses the icon', /kwad-hero[^]*?src="icon-kwad\.svg"/.test(html));
check('I5: the icon ships in the service-worker asset list', sw.includes("'./icon-kwad.svg'"));

// --- cache / version bookkeeping ---------------------------------------------
check('V1: the service-worker cache was bumped', /const CACHE = 'fpv-timer-v44'/.test(sw));
check('V2: app version was bumped', /APP_VERSION = '0\.14\.0'/.test(app));

// --- pilot profile logic (extracted from app.js) -----------------------------
function makePilotApi() {
  const state = { pilots: [], currentPilot: null, pilotColors: {} };
  const factory = new Function(
    'state', 'renderPilots', 'saveSettings', 'pilotColorStub',
    extract('addPilot') + '\n' + extract('removePilot') + '\nreturn { addPilot, removePilot };'
  );
  return { state, api: factory(state, () => {}, () => {}, () => '#000') };
}
{
  const { state, api } = makePilotApi();
  check('L1: addPilot adds a new name', api.addPilot('Max', '#111') === true && state.pilots.includes('Max'));
  check('L2: addPilot stores the colour', state.pilotColors['Max'] === '#111');
  check('L3: addPilot selects the new pilot', state.currentPilot === 'Max');
  api.addPilot('Max', '#222');
  check('L4: adding an existing pilot does not duplicate it', state.pilots.length === 1 && state.pilotColors['Max'] === '#222');
  api.addPilot('   ', '#333');
  check('L5: an empty name is rejected', state.pilots.length === 1);
  api.addPilot('Lea', '#444');
  api.removePilot('Max');
  check('L6: removePilot drops the pilot', !state.pilots.includes('Max'));
  check('L7: removePilot drops its colour', !('Max' in state.pilotColors));
  check('L8: the active pilot falls back to the next one', state.currentPilot === 'Lea');
}

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
