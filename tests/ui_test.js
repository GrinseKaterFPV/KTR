// UI round: Camera-settings overlay, slimmed timer settings, checkbox styling,
// the dedicated Piloten screen, the unified home-tile icons and the K.W.A.D
// 2x2 letter-grid logo. Structure is checked
// against the real index.html / styles.css / sw.js / manifest, and the pilot
// profile helpers (addPilot / removePilot / renamePilot) are extracted from
// app.js and driven against stubs, so we test the shipped logic, not a copy.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const pkg = fs.readFileSync(path.join(root, 'package.json'), 'utf8');

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
check('C4: camera gear sits inside the camera summary (stays visible when collapsed)',
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
check('S6a: TTS controls are centralized in the main settings, not the timer menu',
  ['voiceSelect', 'announceMode', 'announceRate', 'btnTestVoice', 'kwadAnnounce']
    .every(id => appOverlay.includes('id="' + id + '"'))
  && ['voiceSelect', 'announceMode', 'announceRate', 'btnTestVoice', 'kwadAnnounce']
    .every(id => !timerOverlay.includes('id="' + id + '"'))
  && !html.slice(html.indexOf('id="kwadSettingsOverlay"')).includes('id="kwadAnnounce"'));
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
check('P4: the CSV export is inside the pilot management section, before the statistics comparison', (() => {
  const pilots = html.indexOf('id="pilotsScreen"');
  const add = html.indexOf('id="btnPilotScreenAdd"', pilots);
  const exportButton = html.indexOf('id="btnPilotExport"', pilots);
  const compare = html.indexOf('id="pilotsScreenCompare"', pilots);
  return add !== -1 && exportButton > add && exportButton < compare
    && html.indexOf('id="btnPilotExport"', compare) === -1;
})());
check('P5: the tile opens the Piloten screen',
  /els\.tilePilots\.addEventListener\('click', openPilots\)/.test(app));
check('P6: the comparison table is shared with the sets card',
  /function pilotCompareHTML\(\)/.test(app) && /els\.pilotsScreenCompare\.innerHTML = html/.test(app));
check('P7: openHome / closeHome hide the Piloten screen',
  (app.match(/els\.pilotsScreen\) els\.pilotsScreen\.hidden = true/g) || []).length >= 3);

// --- 4b) profile cards: statistics + management -----------------------------
check('P8: every profile is a collapsible card with a leading summary',
  /createElement\('details'\)/.test(app)
  && /'pilot-profile' \+ \(active \? ' is-active' : ''\)/.test(app)
  && /'pilot-profile-summary'/.test(app));
check('P9: an open profile shows the statistics of that player',
  /'pilot-profile-stats'/.test(app)
  && /kwadStatPanel\(t\('kwad_stats'\)/.test(app)
  && /kwadPlayerStats\[name\] \|\| \{\}/.test(app)
  && /totals\.wins/.test(app));
check('P10: the collapsed row shows attempts and rate at a glance',
  /'pilot-profile-meta'/.test(app)
  && /t\('kwad_stats_attempted'\) \+ ' ' \+ totals\.attempted/.test(app)
  && /t\('kwad_stats_won'\) \+ ' ' \+ totals\.wins/.test(app));
check('P11: a profile can be renamed and its statistics follow',
  /function renamePilot\(/.test(app) && /kwadRenameProfile\(oldName, newName\)/.test(app));
check('P12: deleting a profile asks first and takes its statistics with it',
  /askConfirm\(t\('pilot_delete_confirm'\)/.test(app)
  && /kwadDropProfileStats\(name\)/.test(app));
check('P13: the statistics can be reset from inside the profile',
  /'pilot-stats-reset'/.test(app) && /askConfirm\(t\('pilot_reset_confirm'\)/.test(app));
check('P14: the active star picks the pilot without rebuilding the list',
  !/'pilot-activate'/.test(app)
  && /pilotEditingName = name;[\s\S]*?state\.currentPilot = name;/.test(app)
  && /renameBtn\.textContent = t\(editing \? 'pilot_apply' : 'pilot_edit'\)/.test(app)
  && /renameBtn\.disabled = !!pilotEditingName && !editing/.test(app)
  && /input\.disabled = !editing/.test(app)
  && /colorInput\.disabled = !editing/.test(app));
check('P18: editing a profile never copies its name into the new-pilot fields',
  !/els\.pilotName\.value = name/.test(app)
  && !/els\.pilotScreenName\.value = name/.test(app)
  && /pilotName: document\.getElementById\('pilotName'\)/.test(app)
  && /pilotScreenName: document\.getElementById\('pilotScreenName'\)/.test(app)
  && /pilot_name_taken: 'Ein Pilot mit dem Namen/.test(app));

// --- 5) K.W.A.D 2x2 letter-grid logo ------------------------------------------
const iconKwadPath = path.join(root, 'icon-kwad.svg');
check('I1: the K.W.A.D icon file exists', fs.existsSync(iconKwadPath));
const iconKwad = fs.existsSync(iconKwadPath) ? fs.readFileSync(iconKwadPath, 'utf8') : '';
check('I2: the icon is a 2x2 letter grid reading K W / A D',
  /<svg/.test(iconKwad) && ['>K<', '>W<', '>A<', '>D<'].every(l => iconKwad.includes(l))
  && !/skate|🛹/i.test(iconKwad));
check('I3: the tile uses the icon instead of the skateboard emoji',
  /id="tileKwad"[^]*?src="icon-kwad\.svg"/.test(html) && !html.includes('🛹'));
check('I4: the K.W.A.D hero uses the icon', /kwad-hero[^]*?src="icon-kwad\.svg"/.test(html));
check('I5: the icon ships in the service-worker asset list', sw.includes("'./icon-kwad.svg'"));

// --- 6) unified home-tile icons (same frame as the app logo) ------------------
check('U1: every home tile uses an <img> icon',
  (html.match(/class="home-tile-icon home-tile-img"/g) || []).length === 4);
check('U2: the four tile icons exist',
  ['icon-timer.svg', 'icon-pilots.svg', 'icon-settings.svg', 'icon-kwad.svg']
    .every(f => fs.existsSync(path.join(root, f))));
check('U3: all tile icons render at the same size',
  /\.home-tile-img \{ width: 30px; height: 30px;/.test(css));
check('U4: no emoji icons are left in the home tiles',
  !/home-tile-icon">⏱/.test(html) && !/home-tile-icon">⚙/.test(html) && !/home-tile-icon">🏁/.test(html));
check('U5: the shared icons reuse the app-logo accent gradient',
  ['icon-timer.svg', 'icon-pilots.svg', 'icon-settings.svg']
    .every(f => fs.readFileSync(path.join(root, f), 'utf8').includes('url(#acc)')));
check('U6: the shared icons ship in the service-worker asset list',
  ['./icon-timer.svg', './icon-pilots.svg', './icon-settings.svg'].every(f => sw.includes("'" + f + "'")));

// --- 7) in-screen back buttons (K.W.A.D / Piloten -> home) --------------------
check('N1: the K.W.A.D screen has a back button',
  /id="kwadScreen"[^]*?id="btnKwadHome"/.test(html));
check('N2: the Piloten screen has a back button',
  /id="pilotsScreen"[^]*?id="btnPilotsHome"/.test(html));
check('N3: both back buttons open the home screen',
  /els\.btnKwadHome\.addEventListener\('click', openHome\)/.test(app)
  && /els\.btnPilotsHome\.addEventListener\('click', openHome\)/.test(app));
check('N4: the back buttons sit in the screen corner',
  /\.screen-back \{ position: fixed;/.test(css));

// --- 8) home tiles: last used is highlighted (localStorage) -------------------
check('H1: the Timer tile is no longer hard-wired as primary',
  !/class="home-tile is-primary" id="tileTimer"/.test(html));
check('H2: the home grid still offers all four tiles',
  ['tileTimer', 'tileKwad', 'tilePilots', 'tileSettings'].every(id => html.includes('id="' + id + '"')));
check('H3: the highlight helper toggles is-primary',
  /classList\.toggle\('is-primary'/.test(app));
check('H4: the used tile is stored under "lastHomeTile"',
  /localStorage\.setItem\('lastHomeTile'/.test(app));
check('H5: the highlight is restored on load with a timer fallback',
  /localStorage\.getItem\('lastHomeTile'\)/.test(app) && /let id = 'tileTimer'/.test(app));
check('H6: the topbar gear marks the Einstellungen entry too',
  /openSettings\('app'\); rememberHomeTile\('tileSettings'\)/.test(app)
  && /function rememberHomeTile\(id\)/.test(app));

// --- 9) cat-head timer icon (original app logo) -------------------------------
const iconTimer = fs.readFileSync(path.join(root, 'icon-timer.svg'), 'utf8');
check('T1: the timer icon is the cat-head stopwatch (ears + whiskers + face)',
  /cat ears/.test(iconTimer) && /whiskers/.test(iconTimer) && /nose/.test(iconTimer) && /ellipse/.test(iconTimer));
check('T2: the timer icon keeps the shared app-logo frame',
  /<rect width="512" height="512" rx="112" fill="url\(#bg\)"/.test(iconTimer) && iconTimer.includes('url(#acc)'));
check('T3: the tile shows the timer icon',
  /id="tileTimer"[^]*?src="icon-timer\.svg"/.test(html));

// --- 10) back arrow is a centred SVG ------------------------------------------
check('B1: the back buttons draw the arrow as an inline SVG',
  (html.match(/class="back-arrow" viewBox="0 0 24 24"/g) || []).length === 3);
check('B2: no raw ← glyph is left in the back buttons',
  !/>←<\/button>/.test(html));
check('B3: the arrow SVG is flex-centred in the shared button',
  /\.gear-btn \{[^}]*align-items: center; justify-content: center;/.test(css)
  && /\.back-arrow \{ display: block; width: 18px; height: 18px; \}/.test(css));

// --- 11) narrow input rows stay inside their card ------------------------------
check('W1: the pilot name input can shrink inside its row',
  /\.pilot-row input \{ flex: 1 1 9rem; min-width: 0;/.test(css));
check('W2: the pilot row wraps instead of overflowing',
  /\.pilot-row \{ display: flex; flex-wrap: wrap; gap: 8px; \}/.test(css));
check('W3: the "Pilot speichern" button stays on one line and shrinks last',
  /\.pilot-row button \{ flex: 0 1 auto; white-space: nowrap; \}/.test(css));
check('W4: the K.W.A.D add row gets the same treatment (min-width: 0 + wrap)',
  /\.kwad-add \{ display: flex; flex-wrap: wrap; gap: 8px; \}/.test(css)
  && /\.kwad-add input \{ flex: 1 1 9rem; min-width: 0;/.test(css));

// --- 12) collapsible card structure (real <summary> + repair) -------------------
check('D1: the camera summary is the first child of its <details>',
  /<details class="video-card card-collapsible" data-sec="camera" open>\s*<summary class="card-summary"/.test(html));
check('D2: the timer summary is the first child of its <details>',
  /<details class="timer-card card-collapsible" data-sec="timer" open>\s*<summary class="card-summary"/.test(html));
check('D3: exactly one </main> (no stray closing tags)',
  (html.match(/<\/main>/g) || []).length === 1);
check('D4: no "Details" hack is left (they killed the ▾/▴ caret)',
  !/content: none !important/.test(css) && !/Nuclear option/.test(css));
check('D5: the context gears live inside the summaries (visible when collapsed)',
  /<summary class="card-summary">[^]*?id="btnTimerSettings"[^]*?<\/summary>/.test(html)
  && !/class="card-header"/.test(html));
check('D6: the action cluster (gear) and the caret are right-aligned',
  /\.summary-actions \{[^}]*margin-left: auto/.test(css)
  && /\.card-collapsible > \.card-summary::after \{[^}]*flex-shrink: 0/.test(css)
  && !/\.card-summary \.gear-btn \{[^}]*margin-left: auto/.test(css));
check('D7: the ▾/▴ caret rules are intact',
  /\.card-collapsible > \.card-summary::after \{[^}]*content: '▾'/.test(css)
  && /\.card-collapsible\[open\] > \.card-summary::after \{ content: '▴'/.test(css));

// --- 12b) data-i18n must not swallow nested markup ------------------------------
// applyLanguage() does `el.textContent = …` for every [data-i18n] element, so a
// label that also wraps markup (the timer's live value, a gear) would be wiped.
{
  const offenders = [];
  const re = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*\bdata-i18n="[^"]*"[^>]*)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[3].includes('<')) offenders.push(m[1] + ' … ' + m[3].slice(0, 40).replace(/\s+/g, ' '));
  }
  check('D8: no [data-i18n] element wraps nested markup', offenders.length === 0);
  if (offenders.length) console.log('      → ' + offenders.join('\n      → '));
}
check('D9: the collapsed timer keeps its live value span',
  /<span class="summary-value" id="timerSummary">/.test(html)
  && !/<summary class="card-summary" data-i18n/.test(html));
check('D10: the summary labels carry the i18n key instead',
  /<span class="summary-label" data-i18n="sec_camera">/.test(html)
  && /<span class="summary-label" data-i18n="sec_timer">/.test(html));
check('D11: clicking a summary button does not toggle the card',
  /querySelectorAll\('\.card-summary button, \.card-summary select, \.settings-group > summary button'\)/.test(app)
  && /e\.preventDefault\(\); e\.stopPropagation\(\);/.test(app));

// --- 13) backup / restore is actually wired -------------------------------------
check('G1: the backup button is wired (els map)',
  /btnBackup: document\.getElementById\('btnBackup'\)/.test(app));
check('G2: the restore file input is wired (els map)',
  /fileRestore: document\.getElementById\('fileRestore'\)/.test(app));
check('G3: the backup status line is wired (els map)',
  /backupStatus: document\.getElementById\('backupStatus'\)/.test(app));

// --- 14) KWAD undo is actually wired --------------------------------------------
check('R1: the KWAD undo button is an icon-only button (the German word would overflow it)',
  /<button id="btnKwadUndo"[^>]*class="btn kwad-undo"[^>]*>\s*↶\s*<\/button>/.test(html)
  && /<button id="btnKwadUndo"[^>]*data-i18n-title="kwad_undo"[^>]*data-i18n-aria="kwad_undo"/.test(html)
  && !/<button id="btnKwadUndo"[^>]*data-i18n="/.test(html));
check('R2: the undo button is wired to kwadUndoPenalty',
  /els\.btnKwadUndo\.addEventListener\('click', kwadUndoPenalty\)/.test(app));
check('R3: undo is only offered while a penalty is pending',
  /els\.btnKwadUndo\.disabled = !kwadLastPenalty/.test(app));
check('R4: a success clears the undo history',
  /kwadLastPenalty = null; \/\/ successful attempt clears undo/.test(app));
check('R5: undoing restores the previous player\'s turn',
  /kwadTurnIdx = playerIdx;/.test(app));

// --- 15) Prüfart (check) + gap/obstacle picker ---------------------------------
check('S1: the KWAD trick card names the picker as fixed text (no dropdown)',
  /<p class="kwad-picker" id="kwadPicker" hidden>/.test(html)
  && /<span class="kwad-picker-name" id="kwadPickerName">/.test(html)
  && /<span class="kwad-picker-text" id="kwadPickerText">/.test(html)
  && !/id="kwadObstacle"/.test(html)
  && !/id="kwadObstaclePicker"/.test(html));
check('S2: the picker is hidden unless a gap or obstacle trick comes up',
  /els\.kwadPicker\.hidden = !pickerKind/.test(app));
check('S3: the nomination is checked against the active players',
  /const actives = kwadPlayers\.filter\(p => !kwadIsOut\(p\.letters\)\)\.map\(p => p\.name\)/.test(app));
check('S4: the picker choice is persisted under its own key',
  /localStorage\.setItem\('kwad_obstacle_picker'/.test(app)
  && /localStorage\.getItem\('kwad_obstacle_picker'/.test(app));
check('S5: the custom-trick form lets you choose the Prüfart',
  /<select id="kwadCustomCheck">/.test(html)
  && (html.match(/data-i18n="kwad_check_(free|gap|obstacle)"/g) || []).length === 3);
check('S6: every built-in trick carries a Prüfart',
  (app.match(/\{ name: '[^']+', desc: '[^']*'[^}]*check: '(free|gap|obstacle)'/g) || []).length >= 24);
check('S7: at least one built-in trick is an obstacle trick',
  /check: 'obstacle'/.test(app));
check('S8: an old/custom trick without a field counts as free flight, and v0.19 saves still say Gap',
  /function kwadCheck\(trick\)/.test(app)
  && /if \(c === 'gate'\) return 'gap';/.test(app)
  && /return \(c === 'gap' \|\| c === 'obstacle'\) \? c : 'free';/.test(app));
check('S9: the picker wording is translated per check',
  /kwad_check: 'Prüfart'/.test(app) && /kwad_check: 'Check'/.test(app)
  && /kwad_picker_gap: 'wählt das Gap'/.test(app)
  && /kwad_picker_obstacle: 'wählt das Hindernis'/.test(app)
  && /kwad_picker_gap: 'picks the gap'/.test(app)
  && /kwad_picker_obstacle: 'picks the obstacle'/.test(app));

// --- 16) trick list & pool, per-player statistics ------------------------------
check('S10: the statistics card sits at the bottom of the KWAD screen (outside the settings)',
  /<details class="card kwad-card kwad-stats-card card-collapsible" open>/.test(html)
  && /<span class="summary-label" data-i18n="kwad_stats">/.test(html)
  && /<div class="kwad-stats" id="kwadStatsGrid"><\/div>/.test(html)
  && html.indexOf('kwad-stats-card') > html.indexOf('id="btnKwadReset"')
  && html.indexOf('id="kwadStatsGrid"') < html.indexOf('id="kwadSettingsOverlay"'));
check('S11: the settings offer a "Trick Liste" section',
  /<details class="settings-group">\s*<summary>\s*<h3 data-i18n="kwad_pool">/.test(html)
  && /kwad_pool: 'Trick Liste'/.test(app)
  && /kwad_pool: 'Trick List'/.test(app)
  && /<div class="trick-list" id="kwadTrickList"><\/div>/.test(html));
check('S12: the trick list renders one switch per trick with its description',
  /function renderKwadTrickList\(\)/.test(app)
  && /kwadTrickEnabled\(owner, trick\)/.test(app)
  && /trick-list-desc/.test(app));
check('S13: the pool switch is persisted under its own key',
  /localStorage\.setItem\('kwad_trick_pool'/.test(app)
  && /localStorage\.getItem\('kwad_trick_pool'/.test(app));
check('S14: a custom trick may be filed into a built-in group',
  /<select id="kwadCustomCat">/.test(html)
  && /function kwadTrickGroup\(catId, trick\)/.test(app)
  && /data-i18n="kwad_category_(custom|basics)"/.test(html));
check('S15: the custom-trick form asks for the difficulty',
  /<select id="kwadCustomDifficulty">/.test(html)
  && /function kwadDifficulty\(trick, catId\)/.test(app));
check('S16: the drawn trick shows its description and meta line',
  /<div class="kwad-trick-meta" id="kwadTrickMeta" hidden><\/div>/.test(html)
  && /descEl\.className = 'kwad-meta-desc';/.test(app));
check('S17: the statistics are kept per player',
  /localStorage\.setItem\('kwad_player_stats'/.test(app)
  && /localStorage\.getItem\('kwad_player_stats'/.test(app)
  && /kwadRecordStat\(p\.name, currentTrickName/.test(app));
check('S18: the stats panel renders attempts, successes, rate and wins per player',
  /function kwadStatPanel\(title, color, stats, panelKey, gamesWon\)/.test(app)
  && /kwadStatCell\(t\('kwad_stats_won'\), String\(gamesWon \|\| 0\)\)/.test(app)
  && /kwadStatPanel\(t\('kwad_stats_total'\), '', kwadStats, 'total', totalWins\)/.test(app)
  && /kwad_stats_total: 'Gesamt'/.test(app)
  && /kwad_stats_total: 'Total'/.test(app));
check('S18b: the Piloten comparison includes per-pilot K.W.A.D attempts, successes and rate',
  /pilot_kwad_compare: 'Game of K\.W\.A\.D – Spielstatistik'/.test(app)
  && /function pilotCompareHTML\(\)/.test(app)
  && /state\.pilots \|\| \[\]/.test(app)
  && /Object\.keys\(kwadPlayerStats\)/.test(app)
  && /Object\.keys\(kwadPlayerWins\)/.test(app)
  && /kwad_stats_won/.test(app)
  && /kwadTotalAttempts\(stats\)/.test(app)
  && /kwadTotalSucceeded\(stats\)/.test(app)
  && /kwadRate\(succeeded, attempted\)/.test(app)
  && /renderPilotsScreen\(\);\s*renderPilotCompare\(\);/.test(app));
check('S19: the player buckets and the pool travel with the backup',
  /playerStats: kwadPlayerStats,/.test(app)
  && /playerWins: kwadPlayerWins,/.test(app)
  && /data\.kwad\.playerWins/.test(app)
  && /pool: kwadPool,/.test(app)
  && /if \(data\.kwad\.playerStats && typeof data\.kwad\.playerStats === 'object'\)/.test(app)
  && /if \(data\.kwad\.pool && typeof data\.kwad\.pool === 'object'\)/.test(app));
check('S20: a custom trick filed into a group only plays while that group is on',
  /if \(group !== cat\.id && !\(KWAD_CATEGORIES\[group\] && KWAD_CATEGORIES\[group\]\.enabled\)\) return;/.test(app));
check('S21: the random draw weights by the trick\'s own difficulty',
  /const weights = kwadTrickPool\.map\(t => 1 \/ kwadDifficulty\(t, t\.category\)\);/.test(app));
check('S22: the trick list style rules exist',
  /\.trick-list-row\s*\{/.test(css) && /\.kwad-stat-panel\s*\{/.test(css)
  && /\.kwad-trick-meta\s*\{/.test(css));
check('S40: optional direction types are editable, displayed, spoken and exported',
  /<select id="kwadCustomDirection">/.test(html)
  && /function kwadChooseDirection\(trick\)/.test(app)
  && /kwadTrickDirection = kwadChooseDirection\(kwadTrickObj\)/.test(app)
  && /kwad-meta-direction/.test(app)
  && /kwad_direction_' \+ directionType/.test(app)
  && /kwadAvailableDirections\(trick\)/.test(app)
  && /'check', 'direction', 'in_pool'/.test(app));
check('S41: the reviewed trick set includes flips and directional roll variants, but Power Loop has no direction',
  /name: 'Frontflip'/.test(app) && /name: 'Backflip'/.test(app)
  && /name: 'Double Frontflip'/.test(app) && /name: 'Double Backflip'/.test(app)
  && /name: 'Barrel Roll'[^}]*direction: 'roll'/.test(app)
  && /name: 'Corkscrew'[^}]*mindestens drei vollständige Rollen/.test(app)
  && /name: 'Power Loop'[^}]*check: 'obstacle'/.test(app)
  && !/name: 'Power Loop'[^}]*direction:/.test(app)
  && !/name: 'Fakie Flip'/.test(app) && !/name: 'Alien'/.test(app));

// --- 17) collapsible statistics, trick-list export, translations wherever ------
check('S23: the trick list can be exported as CSV',
  /<button id="btnKwadExport" class="btn trick-list-export" type="button" data-i18n="kwad_export_list">/.test(html)
  && /els\.btnKwadExport\.addEventListener\('click', kwadExportTrickList\)/.test(app)
  && /btnKwadExport: document\.getElementById\('btnKwadExport'\)/.test(app)
  && /function kwadTrickListRows\(\)/.test(app)
  && /downloadCsv\('fpv-kwad-tricks\.csv', rows\)/.test(app));
check('S24: the export button now sits in the "Trick Liste" summary, by the caret', (() => {
  const from = html.indexOf('data-i18n="kwad_pool"');
  const to = html.indexOf('</summary>', from);
  const at = html.indexOf('id="btnKwadExport"');
  return from !== -1 && to !== -1 && at > from && at < to;
})());
check('S25: the export covers every group in the current language',
  /Object\.values\(KWAD_CATEGORIES\)\.forEach\(cat => \{/.test(app)
  && /kwadGroupTricks\(cat\.id\)\.forEach\(/.test(app)
  && /t\('kwad_category_' \+ cat\.id\)/.test(app)
  && /kwadTrickName\(trick\)/.test(app)
  && /kwadTrickDesc\(trick\)/.test(app)
  && /kwadTrickEnabled\(owner, trick\) \? 'yes' : 'no'/.test(app));
check('S25a: built-in trick IDs are registered only after categories initialize',
  app.indexOf('const KWAD_CATEGORIES = {') !== -1
  && app.indexOf("KWAD_BUILTIN_IDS.set(trick, cat.id + '/' + trick.name)")
    > app.indexOf('const KWAD_CATEGORIES = {'));
check('S26: each player panel folds itself (a <details> whose first child is its summary)',
  /const panel = document\.createElement\('details'\);/.test(app)
  && /const head = document\.createElement\('summary'\);/.test(app)
  && /kwad-stat-panel\[open\] > \.kwad-stat-head::after \{ content: '▴'; \}/.test(css));
check('S27: a folded panel still shows the numbers',
  /const folded = document\.createElement\('span'\);/.test(app)
  && /folded\.className = 'kwad-stat-folded';/.test(app)
  && /\.kwad-stat-panel\[open\] > \.kwad-stat-head > \.kwad-stat-folded \{ display: none; \}/.test(css));
check('S28: a manual fold survives the next re-render',
  /let kwadStatClosed = new Set\(\)/.test(app)
  && /if \(!kwadStatClosed\.has\(panelKey\)\) panel\.open = true;/.test(app)
  && /panel\.addEventListener\('toggle', \(\) => \{/.test(app)
  && /kwadStatClosed\.add\(panelKey\)/.test(app));
check('S29: the statistics section itself is collapsible and keeps its hint',
  /kwad-stats-card card-collapsible" open>/.test(html)
  && /<p class="hint" data-i18n="kwad_stats_hint">/.test(html)
  && /\.kwad-card\.kwad-stats-card > \.card-body \{ margin-top: 0; \}/.test(css));
check('S30: the statistics card is rendered in both the KWAD screen and the pilot profile',
  /kwadStatPanel\(t\('kwad_stats_total'\), '', kwadStats, 'total', totalWins\)/.test(app)
  && /kwadStatPanel\(nm, color, kwadPlayerStats\[nm\] \|\| \{\}, nm, kwadPlayerWins\[nm\] \|\| 0\)/.test(app)
  && /kwadStatPanel\(t\('kwad_stats'\), '', kwadPlayerStats\[name\] \|\| \{\}, 'profile:' \+ name, totals\.wins\)/.test(app));
check('S31: a statistics row translates its trick name',
  /function kwadTrickLabel\(name\)/.test(app) && /nm\.textContent = kwadTrickLabel\(trickName\);/.test(app));
check('S32: built-in tricks carry their English name and description',
  /en: \{ name: 'Dive', desc: 'Descend steeply nose-first or tail-first, then recover under control\.' \}/.test(app)
  && /en: \{ name: 'Tight Gap', desc: 'Fly through a narrow opening without touching it\.' \}/.test(app)
  && /function kwadTrickName\(trick\)/.test(app)
  && /function kwadTrickDesc\(trick\)/.test(app));
check('S33: "Tight Gap" replaced "Level Pass" and nothing says "Gate Roll"',
  !/Level Pass/.test(app) && /name: 'Tight Gap'/.test(app) && !/Gate Roll/.test(app));
check('S34: the pilot list\'s "from the app" entry and the two placeholders are translated',
  /<option value="" data-i18n="kwad_pilots_from_app">/.test(html)
  && /blank\.setAttribute\('data-i18n', 'kwad_pilots_from_app'\);/.test(app)
  && /data-i18n-ph="kwad_custom_name_ph"/.test(html)
  && /data-i18n-ph="kwad_custom_desc_ph"/.test(html)
  && /kwad_export_list: 'Trickliste exportieren \(CSV\)'/.test(app)
  && /kwad_export_list: 'Export trick list \(CSV\)'/.test(app)
  && /kwad_pilots_from_app: '– Piloten aus App übernehmen –'/.test(app)
  && /kwad_pilots_from_app: '– use pilots from the app –'/.test(app));
check('S35: the direction button says "aus"/"off" in the selected language',
  /function dirLabel\(dir\)/.test(app)
  && /if \(dir === 'aus'\) return '↔ ' \+ t\('dir_off_short'\);/.test(app)
  && /dir_off_short: 'aus'/.test(app) && /dir_off_short: 'off'/.test(app));

// --- 18) statistics layout, own-trick editing, automatic obstacle picker -------
check('S36: the "Total" panel takes the full top row of the statistics grid',
  /if \(panelKey === 'total'\) panel\.classList\.add\('kwad-stat-total'\);/.test(app)
  && /\.kwad-stats > \.kwad-stat-total \{ grid-column: 1 \/ -1; \}/.test(css));
check('S37: the statistics summary caret is pushed to the right edge like the other cards',
  /\.kwad-card\.kwad-stats-card > \.card-summary \.summary-label \{ flex: 1 1 auto; min-width: 0; \}/.test(css));
check('S38: an own trick can be edited again afterwards',
  /function kwadEditCustomTrick\(idx\)/.test(app)
  && /function kwadResetCustomForm\(\)/.test(app)
  && /function kwadRenameOwnTrick\(oldName, newName\)/.test(app)
  && /class="custom-edit btn" data-idx="\$\{idx\}"/.test(app)
  && /<button id="btnKwadCustomCancel"/.test(html)
  && /els\.btnKwadCustomCancel\.addEventListener\('click', kwadResetCustomForm\)/.test(app)
  && /kwad_custom_update: 'Änderungen übernehmen'/.test(app)
  && /kwad_custom_update: 'Apply changes'/.test(app)
  && /kwad_custom_cancel: 'Abbrechen'/.test(app)
  && /kwad_custom_edit: 'Bearbeiten'/.test(app)
  && /kwad_custom_edit: 'Edit'/.test(app));
check('S38b: built-in tricks can be locally edited, exported and reset to defaults',
  /className = 'trick-list-edit btn'/.test(app)
  && /edit\.addEventListener\('click', e => kwadEditBuiltinTrick/.test(app)
  && /function kwadEditBuiltinTrick\(id\)/.test(app)
  && /localStorage\.setItem\('kwad_builtin_overrides'/.test(app)
  && /builtinOverrides: kwadBuiltinOverrides/.test(app)
  && /function kwadResetBuiltinOverrides\(\)/.test(app)
  && /id="btnKwadResetBuiltin"/.test(html)
  && /els\.btnKwadResetBuiltin\.addEventListener\('click', kwadResetBuiltinOverrides\)/.test(app)
  && /kwad_builtin_edit: 'Eingebauten Trick bearbeiten'/.test(app)
  && /kwad_builtin_edit: 'Edit built-in trick'/.test(app));
check('S39: the picker is nominated automatically for gap and obstacle tricks',
  /function kwadPickerKind\(trick\)/.test(app)
  && /function kwadChoosePicker\(\)/.test(app)
  && /kwadPicker = kwadChoosePicker\(\);/.test(app)
  && !/die Gruppe bestimmt/.test(app)
  && !/group decides the obstacle/.test(app)
  && /els\.kwadPickerName\.textContent = kwadPicker \|\| '—';/.test(app));

// --- 19) Trick ansagen, Einzel-Export, Profilfarbe, Löschen unten rechts -------
check('S40: the drawn trick can be read out loud, naming the picker for gap/obstacle',
  /function kwadAnnounceTrick\(\)/.test(app)
  && /let text = kwadTrickName\(kwadTrickObj\);/.test(app)
  && /t\(kind === 'obstacle' \? 'kwad_picker_obstacle' : 'kwad_picker_gap'\)/.test(app)
  && /if \(kwadAnnounce\) kwadAnnounceTrick\(\);/.test(app));
check('S41: the announce option is a checkbox in main settings and is remembered',
  appOverlay.includes('<input type="checkbox" id="kwadAnnounce"')
  && /kwadAnnounce: document\.getElementById\('kwadAnnounce'\)/.test(app)
  && /localStorage\.setItem\('kwad_announce'/.test(app)
  && /localStorage\.getItem\('kwad_announce'\) === '1'/.test(app)
  && /els\.kwadAnnounce\.addEventListener\('change'/.test(app)
  && /els\.kwadAnnounce\.checked = kwadAnnounce;/.test(app));
check('S42: the announce option travels with the backup and is translated',
  /announce: kwadAnnounce,/.test(app)
  && /if \(typeof data\.kwad\.announce === 'boolean'\) kwadAnnounce = data\.kwad\.announce;/.test(app)
  && /kwad_announce: 'Trick ansagen'/.test(app)
  && /kwad_announce: 'Announce trick'/.test(app));
check('P15: a single pilot can be exported from inside their own profile',
  /function pilotCsvRows\(names\)/.test(app)
  && /downloadCsv\('fpv-pilot-' \+ fileSafe\(name\) \+ '\.csv', pilotCsvRows\(\[name\]\)\)/.test(app)
  && /downloadCsv\('fpv-pilots\.csv', pilotCsvRows\(state\.pilots\)\)/.test(app)
  && /pilot_export: 'Pilot exportieren \(CSV\)'/.test(app)
  && /pilot_export: 'Export pilot \(CSV\)'/.test(app));
check('P16: "Delete pilot" moved to the bottom-right of the profile, not the summary',
  /del\.className = 'pilot-delete btn-danger';/.test(app)
  && /\.pilot-profile-buttons \.pilot-delete \{ margin-left: auto; \}/.test(css)
  && !/pilot-remove/.test(app) && !/pilot-remove/.test(css) && !/pilot-remove/.test(html));
check('P17: the pilot colour is adjustable later from inside the profile',
  /colorInput\.type = 'color';/.test(app)
  && /'pilot-color-row'/.test(app)
  && /state\.pilotColors\[next\] = colorInput\.value;/.test(app)
  && /colorInput\.disabled = !editing/.test(app)
  && /\.pilot-color-row input\[type="color"\] \{/.test(css));

// --- cache / version bookkeeping ---------------------------------------------
check('V1: the service-worker cache was bumped', /const CACHE = 'fpv-timer-v62'/.test(sw));
check('V2: app version was bumped', /APP_VERSION = '0\.29\.1'/.test(app));
check('V3: package.json carries the same version',
  /"version": "0\.29\.1"/.test(pkg));

// --- pilot profile logic (extracted from app.js) -----------------------------
function makePilotApi() {
  const state = { pilots: [], currentPilot: null, pilotColors: {} };
  const pilotOpen = new Set();
  const calls = { dropped: [], renamed: [] };
  const factory = new Function(
    'state', 'pilotOpen', 'pilotColor', 'renderPilots', 'saveSettings',
    'kwadDropProfileStats', 'kwadRenameProfile',
    'let pilotEditingName = "";'
      + extract('addPilot') + '\n' + extract('removePilot') + '\n' + extract('renamePilot')
      + '\nreturn { addPilot, removePilot, renamePilot };'
  );
  const api = factory(
    state, pilotOpen,
    () => '#000', () => {}, () => {},
    name => calls.dropped.push(name),
    (from, to) => calls.renamed.push([from, to])
  );
  return { state, pilotOpen, calls, api };
}
{
  const { state, api } = makePilotApi();
  check('L1: addPilot adds a new name', api.addPilot('Max', '#111') === true && state.pilots.includes('Max'));
  check('L2: addPilot stores the colour', state.pilotColors['Max'] === '#111');
  check('L3: addPilot selects the new pilot', state.currentPilot === 'Max');
  const duplicateAdded = api.addPilot('Max', '#222');
  check('L4: adding an existing pilot does not duplicate it or change its profile',
    duplicateAdded === false && state.pilots.length === 1 && state.pilotColors['Max'] === '#111');
  check('L4a: duplicate names are rejected regardless of case', api.addPilot('max', '#222') === false && state.pilots.length === 1);
  api.addPilot('   ', '#333');
  check('L5: an empty name is rejected', state.pilots.length === 1);
  api.addPilot('Lea', '#444');
  api.removePilot('Max');
  check('L6: removePilot drops the pilot', !state.pilots.includes('Max'));
  check('L7: removePilot drops its colour', !('Max' in state.pilotColors));
  check('L8: the active pilot falls back to the next one', state.currentPilot === 'Lea');
}
{
  const { state, pilotOpen, calls, api } = makePilotApi();
  api.addPilot('Lea', '#222');
  api.addPilot('Max', '#111');                 // also selects Max
  pilotOpen.add('Max');
  check('L9: renamePilot moves the name in place',
    api.renamePilot('Max', 'Maxi') === true && state.pilots.includes('Maxi') && !state.pilots.includes('Max'));
  check('L10: the colour follows the profile',
    state.pilotColors['Maxi'] === '#111' && !('Max' in state.pilotColors));
  check('L11: the active pilot follows the rename', state.currentPilot === 'Maxi');
  check('L12: the open profile card follows the rename',
    pilotOpen.has('Maxi') && !pilotOpen.has('Max'));
  check('L13: the statistics are handed over to the new name',
    calls.renamed.length === 1 && calls.renamed[0][0] === 'Max' && calls.renamed[0][1] === 'Maxi');
  check('L14: a name that another profile uses is rejected',
    api.renamePilot('Maxi', 'lea') === false && state.pilots.includes('Maxi'));
  check('L15: an empty name is rejected', api.renamePilot('Maxi', '   ') === false);
  check('L16: an unknown profile cannot be renamed', api.renamePilot('Nobody', 'X') === false);
  api.removePilot('Maxi');
  check('L17: deleting a profile drops its statistics',
    calls.dropped.length === 1 && calls.dropped[0] === 'Maxi');
  check('L18: the open card is forgotten too', !pilotOpen.has('Maxi'));
}

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
