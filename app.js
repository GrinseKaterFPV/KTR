(() => {
  'use strict';

  const APP_VERSION = '0.18.2';

  // ---------- i18n ----------
  const I18N = {
    de: {
      title: 'KTR',
      settings: 'Einstellungen',
      settings_timer: 'Timer-Einstellungen',
      settings_camera: 'Kamera-Einstellungen',
      close: 'Schließen',
      home: 'Startseite',
      m_timer: 'Timer',
      m_timer_desc: 'Runden, Sätze & Vergleich',
      m_settings_desc: 'Sprache, Farben, Sensorik',
      m_note: 'Mehr Funktionen kommen schrittweise dazu.',
      m_kwad: 'Game of K.W.A.D',
      m_kwad_desc: 'Freestyle-Tricks, Strafbuchstaben',
      m_pilots: 'Piloten',
      m_pilots_desc: 'Profile, Farben & Vergleich',
      pilots_hint: 'Piloten mit Name und Farbe anlegen. Die Farbe wird in Diagramm und Vergleichstabelle verwendet.',
      pilots_active_hint: 'Tippe einen Piloten an, um ihn als aktiven Piloten zu wählen.',
      export_pilots: 'Piloten exportieren (CSV)',
      pilot_delete: 'Pilot löschen',
      pilot_screen_empty: 'Noch keine Piloten angelegt.',
      kwad_hint: 'Trick ansagen – wer ihn nicht schafft, bekommt einen Buchstaben. Wer zuerst K, W, A und D hat, verliert.',
      kwad_trick: 'Trick',
      kwad_new_trick: 'Neuer Trick',
      kwad_turn: 'Am Zug',
      kwad_done: 'Geschafft',
      kwad_fail: 'Nicht geschafft',
      kwad_add: 'Spieler hinzufügen',
      kwad_reset: 'Neues Spiel (Buchstaben zurücksetzen)',
      kwad_remove: 'Spieler entfernen',
      kwad_loses: 'verliert!',
      kwad_no_players: 'Mindestens 2 Spieler hinzufügen.',
      kwad_round_done: 'Alle dran – neuer Trick.',
      kwad_undo: 'Rückgängig',
      kwad_undone: 'Rückgängig: {letter} entfernt bei {name}',
      kwad_settings: 'KWAD Einstellungen',
      kwad_categories: 'Trick-Kategorien',
      kwad_mode: 'Zieh-Modus',
      kwad_mode_random: 'Zufällig (gewichtet)',
      kwad_mode_sequential: 'Sequentiell (Reihenfolge)',
      kwad_mode_roundrobin: 'Kategorien-Runden',
      kwad_custom_tricks: 'Eigene Tricks',
      kwad_add_custom: 'Eigenen Trick hinzufügen',
      kwad_custom_name: 'Trick-Name',
      kwad_custom_desc: 'Beschreibung',
      kwad_custom_save: 'Speichern',
      kwad_custom_delete: 'Löschen',
      kwad_stats: 'Trick-Statistiken',
      kwad_stats_attempted: 'Versucht',
      kwad_stats_succeeded: 'Geschafft',
      kwad_stats_rate: 'Quote',
      kwad_category_basics: 'Basics',
      kwad_category_intermediate: 'Intermediate',
      kwad_category_advanced: 'Advanced',
      kwad_category_pro: 'Pro',
      kwad_category_custom: 'Eigene',
      kwad_difficulty: 'Schwierigkeit',
      kwad_desc: 'Beschreibung',
      kwad_enabled: 'Aktiv',
      kwad_check: 'Prüfart',
      kwad_check_free: 'Freiflug',
      kwad_check_gate: 'Tor / Gate',
      kwad_check_obstacle: 'Hindernis',
      kwad_obstacle_hint: 'Hindernis-Trick – die Gruppe bestimmt das Hindernis',
      kwad_obstacle_picker: 'Hindernisauswähler',
      kwad_obstacle_none: '– noch offen –',
      camera: 'Kamera',
      start_camera: 'Kamera starten',
      stop_camera: 'Kamera stoppen',
      calibrate: 'Hintergrund kalibrieren',
      zone_hint: 'Ziehe einen Rahmen über den Start/Ziel-Bereich',
      direction_btn_title: 'Erwartete Durchflug-Richtung – antippen zum Ändern',
      motion_in_gate: 'Bewegung im Tor',
      show_motion: 'Bewegung hervorheben (gelbe Pixel = erkannt, grüner Rahmen = Bereich)',
      race_time: 'Rennen-Zeit',
      current_lap: 'Aktuelle Runde',
      last_lap: 'Letzte Runde',
      best_lap: 'Beste Runde',
      start: 'Start',
      stop: 'Stop',
      manual_lap: 'Manuelle Runde',
      reset: 'Reset',
      armed: 'Auto Lap detection',
      pilot_name: 'Pilotenname',
      save_pilot: 'Pilot speichern',
      pilot_color: 'Pilotfarbe',
      lap_log: 'Rundenlog',
      export_csv: 'CSV exportieren',
      th_index: '#',
      th_pilot: 'Pilot',
      th_lap: 'Rundenzeit',
      th_total: 'Gesamt',
      th_between: 'Zwischen',
      g_detection: 'Kamera',
      diff_thresh: 'Diff-Schwelle',
      enter_px: 'Enter (px)',
      exit_px: 'Exit (px)',
      cooldown_ms: 'Cooldown (ms)',
      proc_res: 'Verarbeitungsauflösung',
      proc_fast: '320 x 240 (schnell)',
      expected_direction: 'Erwartete Richtung',
      dir_off: 'Aus (keine Prüfung)',
      dir_lr: 'Links → Rechts',
      dir_rl: 'Rechts → Links',
      dir_tb: 'Oben → Unten',
      dir_bt: 'Unten → Oben',
      drift_comp: 'Autofokus-/Belichtungsdrift ausgleichen (empfohlen)',
      cam_lock: 'Kamera fixieren (Fokus/Belichtung manuell) – nur einschalten, wenn das Bild zuverlässig hell bleibt',
      hint_detection: 'Tipp: ROI (Rahmen) möglichst eng über das Tor stellen. Hintergrund bei leerem Tor kalibrieren. Eine Runde wird gezählt, wenn die Bewegung erst die Enter-Schwelle überschreitet und danach unter Exit fällt. Mit dem Pfeil-Button neben „Hintergrund kalibrieren“ legst du die erwartete Durchflugrichtung fest.',
      g_audio: 'Rennen & Audio',
      prep_time: 'Vorbereitungszeit (s)',
      cd_row: 'Countdown',
      audio_feedback: 'Audio-Feedback (Countdown, Runden)',
      speech_announce: 'Sprachansage',
      ann_off: 'Aus',
      ann_every: 'Jede Runde',
      ann_best: 'Nur beste Runde',
      speech_rate: 'Sprechtempo',
      test_voice: 'Stimme testen',
      g_language: 'Sprache',
      ui_language: 'App-Sprache',
      lang_de: 'Deutsch',
      lang_en: 'English',
      voice: 'Sprachstimme',
      voice_auto: 'Automatisch',
      g_app: 'App',
      force_update: 'App aktualisieren (Cache leeren)',
      status_ready: 'Bereit',
      status_cam_not_started: 'Kamera: nicht gestartet',
      cam_running: 'Kamera läuft',
      cam_stopped: 'Kamera gestoppt',
      bg_calibrated: 'Hintergrund kalibriert',
      no_video: 'Kein Videobild',
      cam_unavailable: 'Kamera nicht verfügbar: diese Seite läuft nicht über HTTPS/sicheren Kontext. Bitte per HTTPS öffnen.',
      cam_error: 'Kamera-Fehler: ',
      starting_cam: 'Kamera startet …',
      calibrating_bg: 'Hintergrund wird kalibriert …',
      status_prefix: 'Status: ',
      idle: 'idle',
      gate_free: 'frei',
      gate_busy: 'belegt',
      armed_suffix: ' · scharf',
      global_change: 'globale Änderung (AF/Licht) ignoriert',
      countdown: 'Countdown …',
      race_running: 'Rennen läuft',
      race_stopped: 'Rennen gestoppt',
      countdown_cancelled: 'Countdown abgebrochen',
      reset_done: 'Zurückgesetzt',
      start_camera_first: 'Erst Kamera starten',
      updating: 'Aktualisiere …',
      direction_prefix: 'Richtung: ',
      dir_text_aus: 'keine Richtungsprüfung',
      dir_text_lr: 'links → rechts',
      dir_text_rl: 'rechts → links',
      dir_text_tb: 'oben → unten',
      dir_text_bt: 'unten → oben',
      wrong_direction: 'Bewegung erkannt, aber falsche Richtung',
      go: 'Los',
      best_time: 'Neue Bestzeit!',
      lap_word: 'Runde',
      stop_total: 'Stopp. Gesamtzeit ',
      voice_test: 'Runde 1: 12,45 Sekunden',
      seconds_word: 'Sekunden',
      minute_word: 'Minute',
      minutes_word: 'Minuten',
      camera_n: 'Kamera ',
      decimal_sep: ',',
      g_auto: 'Auto-Start & Sätze',
      auto_start: 'Timer automatisch beim ersten Durchflug starten (ohne Handy)',
      auto_laps: 'Runden pro Satz (0 = unbegrenzt)',
      waiting_first: 'Warte auf ersten Durchflug …',
      overlay_waiting: 'Warte auf ersten Durchflug',
      set_word: 'Satz',
      set_laps_word: 'Runden',
      set_best_word: 'Beste',
      set_done: 'Satz gespeichert',
      set_end: 'Satz beendet. Gesamtzeit ',
      sets_title: 'Sätze (Vergleich)',
      export_all: 'Alle exportieren',
      export_filtered: 'Gefilterte exportieren',
      export_set: 'Satz exportieren',
      clear_sets: 'Alle löschen',
      no_sets: 'Noch keine Sätze gespeichert.',
      confirm_clear_sets: 'Wirklich alle Sätze löschen?',
      delete_word: 'Löschen',
      avg_word: 'Ø',
      hint_auto: 'Auto-Start: Die erste Tor-Durchfahrt startet die Zeitmessung (sie zählt nicht als Runde). Nach der eingestellten Rundenzahl stoppt der Timer automatisch, der Satz wird gespeichert und beim nächsten Durchflug startet der nächste Satz. So kannst du mehrere Sätze fahren und am Ende vergleichen. 0 = unbegrenzt (manueller Stop).',
      auto_start_quick: 'Auto-Start on 1st pass',
      laps_pop_title: 'Runden pro Satz',
      laps_short: 'Runden/Satz',
      laps_less: 'Weniger',
      laps_more: 'Mehr',
      chart_title: 'Rundenverlauf',
      chart_last8: 'Rundenverlauf (letzte 8 Sätze)',
      sec_camera: 'Kamera',
      sec_timer: 'Timer',
      g_look: 'Aussehen',
      accent_color: 'Akzentfarbe',
      accent_custom: 'Eigene Farbe',
      filter_pilot: 'Pilot',
      all_pilots: 'Alle Piloten',
      no_pilot: 'Ohne Pilot',
      no_sets_for_pilot: 'Keine Sätze für diesen Piloten.',
      pilot_compare_title: 'Piloten-Vergleich',
      th_sets: 'Sätze',
      storage_trimmed: 'Speicher fast voll – ältere Sätze wurden entfernt, damit neue gespeichert werden können.',
      storage_full: 'Speicher voll – Speichern fehlgeschlagen. Bitte ältere Sätze löschen.',
      g_backup: 'Backup & Restore',
      backup_now: 'Backup erstellen (JSON)',
      restore_now: 'Restore aus Datei',
      backup_done: 'Backup erstellt: {name}',
      restore_done: 'Restore erfolgreich – App wird neu geladen',
      restore_error: 'Fehler beim Restore: {error}',
    },
    en: {
      title: 'KTR',
      settings: 'Settings',
      settings_timer: 'Timer settings',
      settings_camera: 'Camera settings',
      close: 'Close',
      home: 'Home',
      m_timer: 'Timer',
      m_timer_desc: 'Laps, sets & comparison',
      m_settings_desc: 'Language, colours, sensors',
      m_note: 'More features will be added gradually.',
      m_kwad: 'Game of K.W.A.D',
      m_kwad_desc: 'Freestyle tricks, penalty letters',
      m_pilots: 'Pilots',
      m_pilots_desc: 'Profiles, colours & comparison',
      pilots_hint: 'Create pilots with a name and colour. The colour is used in the chart and the comparison table.',
      pilots_active_hint: 'Tap a pilot to make it the active pilot.',
      export_pilots: 'Export pilots (CSV)',
      pilot_delete: 'Delete pilot',
      pilot_screen_empty: 'No pilots yet.',
      kwad_hint: 'Call a trick – whoever cannot fly it collects a letter. The first to hold K, W, A and D loses.',
      kwad_trick: 'Trick',
      kwad_new_trick: 'New trick',
      kwad_turn: 'Up next',
      kwad_done: 'Made it',
      kwad_fail: 'Did not make it',
      kwad_add: 'Add player',
      kwad_reset: 'New game (reset letters)',
      kwad_remove: 'Remove player',
      kwad_loses: 'loses!',
      kwad_no_players: 'Add at least 2 players.',
      kwad_round_done: 'Everyone had a go – new trick.',
      kwad_undo: 'Undo',
      kwad_undone: 'Undone: {letter} removed for {name}',
      kwad_settings: 'KWAD Settings',
      kwad_categories: 'Trick Categories',
      kwad_mode: 'Draw Mode',
      kwad_mode_random: 'Random (weighted)',
      kwad_mode_sequential: 'Sequential (in order)',
      kwad_mode_roundrobin: 'Category Round-Robin',
      kwad_custom_tricks: 'Custom Tricks',
      kwad_add_custom: 'Add Custom Trick',
      kwad_custom_name: 'Trick Name',
      kwad_custom_desc: 'Description',
      kwad_custom_save: 'Save',
      kwad_custom_delete: 'Delete',
      kwad_stats: 'Trick Statistics',
      kwad_stats_attempted: 'Attempted',
      kwad_stats_succeeded: 'Succeeded',
      kwad_stats_rate: 'Rate',
      kwad_category_basics: 'Basics',
      kwad_category_intermediate: 'Intermediate',
      kwad_category_advanced: 'Advanced',
      kwad_category_pro: 'Pro',
      kwad_category_custom: 'Custom',
      kwad_difficulty: 'Difficulty',
      kwad_desc: 'Description',
      kwad_enabled: 'Enabled',
      kwad_check: 'Check',
      kwad_check_free: 'Free flight',
      kwad_check_gate: 'Gate',
      kwad_check_obstacle: 'Obstacle',
      kwad_obstacle_hint: 'Obstacle trick – the group decides the obstacle',
      kwad_obstacle_picker: 'Obstacle picker',
      kwad_obstacle_none: '– not set –',
      camera: 'Camera',
      start_camera: 'Start camera',
      stop_camera: 'Stop camera',
      calibrate: 'Calibrate background',
      zone_hint: 'Drag a box over the start/finish area',
      direction_btn_title: 'Expected crossing direction – tap to change',
      motion_in_gate: 'Motion in gate',
      show_motion: 'Highlight motion (yellow pixels = detected, green box = area)',
      race_time: 'Race time',
      current_lap: 'Current lap',
      last_lap: 'Last lap',
      best_lap: 'Best lap',
      start: 'Start',
      stop: 'Stop',
      manual_lap: 'Manual lap',
      reset: 'Reset',
      armed: 'Auto lap detection',
      pilot_name: 'Pilot name',
      save_pilot: 'Save pilot',
      pilot_color: 'Pilot colour',
      lap_log: 'Lap log',
      export_csv: 'Export CSV',
      th_index: '#',
      th_pilot: 'Pilot',
      th_lap: 'Lap time',
      th_total: 'Total',
      th_between: 'Split',
      g_detection: 'Camera',
      diff_thresh: 'Diff threshold',
      enter_px: 'Enter (px)',
      exit_px: 'Exit (px)',
      cooldown_ms: 'Cooldown (ms)',
      proc_res: 'Processing resolution',
      proc_fast: '320 x 240 (fast)',
      expected_direction: 'Expected direction',
      dir_off: 'Off (no check)',
      dir_lr: 'Left → Right',
      dir_rl: 'Right → Left',
      dir_tb: 'Top → Bottom',
      dir_bt: 'Bottom → Top',
      drift_comp: 'Compensate autofocus/exposure drift (recommended)',
      cam_lock: 'Lock camera (manual focus/exposure) – only enable if the image stays reliably bright',
      hint_detection: 'Tip: keep the ROI (box) as tight as possible over the gate. Calibrate the background with the gate empty. A lap is counted when motion first exceeds the Enter threshold and then drops below Exit. Use the arrow button next to “Calibrate background” to set the expected crossing direction.',
      g_audio: 'Race & audio',
      prep_time: 'Preparation time (s)',
      cd_row: 'Countdown',
      audio_feedback: 'Audio feedback (countdown, laps)',
      speech_announce: 'Voice announcement',
      ann_off: 'Off',
      ann_every: 'Every lap',
      ann_best: 'Best lap only',
      speech_rate: 'Speech rate',
      test_voice: 'Test voice',
      g_language: 'Language',
      ui_language: 'App language',
      lang_de: 'Deutsch',
      lang_en: 'English',
      voice: 'Voice',
      voice_auto: 'Automatic',
      g_app: 'App',
      force_update: 'Update app (clear cache)',
      status_ready: 'Ready',
      status_cam_not_started: 'Camera: not started',
      cam_running: 'Camera running',
      cam_stopped: 'Camera stopped',
      bg_calibrated: 'Background calibrated',
      no_video: 'No video image',
      cam_unavailable: 'Camera unavailable: this page is not running in a secure context (HTTPS). Please open it via HTTPS.',
      cam_error: 'Camera error: ',
      starting_cam: 'Camera starting …',
      calibrating_bg: 'Calibrating background …',
      status_prefix: 'Status: ',
      idle: 'idle',
      gate_free: 'clear',
      gate_busy: 'occupied',
      armed_suffix: ' · armed',
      global_change: 'global change (AF/light) ignored',
      countdown: 'Countdown …',
      race_running: 'Race running',
      race_stopped: 'Race stopped',
      countdown_cancelled: 'Countdown cancelled',
      reset_done: 'Reset',
      start_camera_first: 'Start the camera first',
      updating: 'Updating …',
      direction_prefix: 'Direction: ',
      dir_text_aus: 'no direction check',
      dir_text_lr: 'left → right',
      dir_text_rl: 'right → left',
      dir_text_tb: 'top → bottom',
      dir_text_bt: 'bottom → top',
      wrong_direction: 'Motion detected, but wrong direction',
      go: 'Go',
      best_time: 'New best time!',
      lap_word: 'Lap',
      stop_total: 'Stop. Total time ',
      voice_test: 'Lap 1: 12.45 seconds',
      seconds_word: 'seconds',
      minute_word: 'minute',
      minutes_word: 'minutes',
      camera_n: 'Camera ',
      decimal_sep: '.',
      g_auto: 'Auto-start & sets',
      auto_start: 'Start timer automatically on first crossing (no phone needed)',
      auto_laps: 'Laps per set (0 = unlimited)',
      waiting_first: 'Waiting for first crossing …',
      overlay_waiting: 'Waiting for first crossing',
      set_word: 'Set',
      set_laps_word: 'laps',
      set_best_word: 'Best',
      set_done: 'Set saved',
      set_end: 'Set finished. Total time ',
      sets_title: 'Sets (compare)',
      export_all: 'Export all',
      export_filtered: 'Export filtered',
      export_set: 'Export set',
      clear_sets: 'Clear all',
      no_sets: 'No sets saved yet.',
      confirm_clear_sets: 'Really delete all sets?',
      delete_word: 'Delete',
      avg_word: 'avg',
      hint_auto: 'Auto-start: The first gate crossing starts the timer (it is not counted as a lap). After the configured number of laps the timer stops automatically, the set is saved, and the next crossing starts the next set. This lets you fly several sets and compare them at the end. 0 = unlimited (manual stop).',
      auto_start_quick: 'Auto-start on 1st pass',
      laps_pop_title: 'Laps per set',
      laps_short: 'Laps/set',
      laps_less: 'Less',
      laps_more: 'More',
      chart_title: 'Lap progress',
      chart_last8: 'Lap progress (last 8 sets)',
      sec_camera: 'Camera',
      sec_timer: 'Timer',
      g_look: 'Appearance',
      accent_color: 'Accent colour',
      accent_custom: 'Custom colour',
      filter_pilot: 'Pilot',
      all_pilots: 'All pilots',
      no_pilot: 'No pilot',
      no_sets_for_pilot: 'No sets for this pilot.',
      pilot_compare_title: 'Pilot comparison',
      th_sets: 'Sets',
      storage_trimmed: 'Storage almost full – older sets were removed to make room for new ones.',
      storage_full: 'Storage full – saving failed. Please delete older sets.',
      g_backup: 'Backup & Restore',
      backup_now: 'Create backup (JSON)',
      restore_now: 'Restore from file',
      backup_done: 'Backup created: {name}',
      restore_done: 'Restore successful – reloading app',
      restore_error: 'Restore failed: {error}',
  }
};

  function t(key) {
    const dict = I18N[state.lang] || I18N.de;
    if (key in dict) return dict[key];
    return I18N.de[key] !== undefined ? I18N.de[key] : key;
  }
  function dirText(dir) { return t('dir_text_' + dir); }

  // Valid announcement modes (guarded against stale/invalid stored values).
  const ANN_MODES = ['aus', 'jede', 'best'];
  // Storage guards: keep the sets list bounded so localStorage cannot overflow.
  const MAX_SETS = 400;

  // ---------- State ----------
  const state = {
    stream: null,
    devices: [],
    roi: null, // {x,y,w,h} in process coords
    drawing: false,
    drawStart: null,
    background: null, // Float32Array
    armed: false,
    raceActive: false,
    raceStart: 0,
    currentLapStart: 0,
    lastTrigger: 0,
    machine: 0, // 0 clear, 1 occupied
    machineEnterAt: 0,
    needsClear: false,
    laps: [],
    pilots: [],
    currentPilot: null,
    pilotColors: {},
    settings: loadSettings(),
    procW: 320,
    procH: 240,
    diffThreshold: 35,
    enterThreshold: 120,
    exitThreshold: 60,
    cooldownMs: 2000,
    lastChanged: 0,
    maxChangedSeen: 0,
    showMotion: true,
    motionBox: null,
    view: null,
    raceElapsed: 0,
    frozenLap: 0,
    countdownActive: false,
    countdownEnd: 0,
    lastCountdownValue: null,
    goFlashUntil: 0,
    audioEnabled: true,
    countdownSecs: 5,
    announceMode: 'jede',
    announceRate: 1,
    direction: 'aus',
    pendingLap: null,
    wrongFlashUntil: 0,
    directionToastUntil: 0,
    driftComp: true,
    camLock: false,
    camDeviceId: '',
    autoStart: false,
    autoLaps: 0,
    awaitingStart: false,
    sets: [],
    stintSaved: false,
    setFilter: '',
    accent: '#ff7a1a',
    sections: {},
    lang: 'de',
    voiceURI: '',
    rafId: null,
    frameCount: 0,
  };

  const els = {
    video: document.getElementById('video'),
    overlay: document.getElementById('overlay'),
    videoWrap: document.getElementById('videoWrap'),
    status: document.getElementById('status'),
    camSelect: document.getElementById('camSelect'),
    btnStartCam: document.getElementById('btnStartCam'),
    btnCalibrate: document.getElementById('btnCalibrate'),
    meterFill: document.getElementById('meterFill'),
    metricValue: document.getElementById('metricValue'),
    metricState: document.getElementById('metricState'),
    raceTime: document.getElementById('raceTime'),
    currentLap: document.getElementById('currentLap'),
    lastLap: document.getElementById('lastLap'),
    bestLap: document.getElementById('bestLap'),
    btnRaceStart: document.getElementById('btnRaceStart'),
    btnRaceStop: document.getElementById('btnRaceStop'),
    btnLapManual: document.getElementById('btnLapManual'),
    btnReset: document.getElementById('btnReset'),
    armedToggle: document.getElementById('armedToggle'),
    pilotName: document.getElementById('pilotName'),
    btnAddPilot: document.getElementById('btnAddPilot'),
    pilots: document.getElementById('pilots'),
    lapTable: document.getElementById('lapTable').querySelector('tbody'),
    btnExport: document.getElementById('btnExport'),
    diffThresh: document.getElementById('diffThresh'),
    diffThreshVal: document.getElementById('diffThreshVal'),
    enterThresh: document.getElementById('enterThresh'),
    enterThreshVal: document.getElementById('enterThreshVal'),
    exitThresh: document.getElementById('exitThresh'),
    exitThreshVal: document.getElementById('exitThreshVal'),
    cooldown: document.getElementById('cooldown'),
    cooldownVal: document.getElementById('cooldownVal'),
    procRes: document.getElementById('procRes'),
    zoneHint: document.getElementById('zoneHint'),
    showMotion: document.getElementById('showMotion'),
    audioEnabled: document.getElementById('audioEnabled'),
    announceMode: document.getElementById('announceMode'),
    announceRate: document.getElementById('announceRate'),
    announceRateVal: document.getElementById('announceRateVal'),
    btnTestVoice: document.getElementById('btnTestVoice'),
    btnDirection: document.getElementById('btnDirection'),
    directionSelect: document.getElementById('directionSelect'),
    driftComp: document.getElementById('driftComp'),
    camLock: document.getElementById('camLock'),
    autoStartQuick: document.getElementById('autoStartQuick'),
    autoLaps: document.getElementById('autoLaps'),
    autoLapsBadge: document.getElementById('autoLapsBadge'),
    countdownInput: document.getElementById('countdownInput'),
    lapsPop: document.getElementById('lapsPop'),
    lapsPopVal: document.getElementById('lapsPopVal'),
    lapsMinus: document.getElementById('lapsMinus'),
    lapsPlus: document.getElementById('lapsPlus'),
    countdownBadge: document.getElementById('countdownBadge'),
    countdownPop: document.getElementById('countdownPop'),
    cdPopVal: document.getElementById('cdPopVal'),
    cdMinus: document.getElementById('cdMinus'),
    cdPlus: document.getElementById('cdPlus'),
    pilotColor: document.getElementById('pilotColor'),
    chartLegend: document.getElementById('chartLegend'),
    setsList: document.getElementById('setsList'),
    chartBlock: document.getElementById('chartBlock'),
    setsChart: document.getElementById('setsChart'),
    btnExportAll: document.getElementById('btnExportAll'),
    btnClearSets: document.getElementById('btnClearSets'),
    setPilotFilter: document.getElementById('setPilotFilter'),
    pilotCompare: document.getElementById('pilotCompare'),
    timerSummary: document.getElementById('timerSummary'),
    accentSwatches: document.getElementById('accentSwatches'),
    accentCustom: document.getElementById('accentCustom'),
    langSelect: document.getElementById('langSelect'),
    voiceSelect: document.getElementById('voiceSelect'),
    btnSettings: document.getElementById('btnSettings'),
    btnSettingsClose: document.getElementById('btnSettingsClose'),
    settingsOverlay: document.getElementById('settingsOverlay'),
    btnTimerSettings: document.getElementById('btnTimerSettings'),
    timerSettingsOverlay: document.getElementById('timerSettingsOverlay'),
    btnTimerSettingsClose: document.getElementById('btnTimerSettingsClose'),
    btnCameraSettings: document.getElementById('btnCameraSettings'),
    cameraSettingsOverlay: document.getElementById('cameraSettingsOverlay'),
    btnCameraSettingsClose: document.getElementById('btnCameraSettingsClose'),
    homeScreen: document.getElementById('homeScreen'),
    btnHome: document.getElementById('btnHome'),
    homeVersionBadge: document.getElementById('homeVersionBadge'),
    tileTimer: document.getElementById('tileTimer'),
    tileSettings: document.getElementById('tileSettings'),
    tileKwad: document.getElementById('tileKwad'),
    tilePilots: document.getElementById('tilePilots'),
    pilotsScreen: document.getElementById('pilotsScreen'),
    pilotScreenName: document.getElementById('pilotScreenName'),
    pilotScreenColor: document.getElementById('pilotScreenColor'),
    btnPilotScreenAdd: document.getElementById('btnPilotScreenAdd'),
    pilotsScreenList: document.getElementById('pilotsScreenList'),
    pilotsScreenCompare: document.getElementById('pilotsScreenCompare'),
    btnPilotExport: document.getElementById('btnPilotExport'),
    btnPilotsHome: document.getElementById('btnPilotsHome'),
    kwadScreen: document.getElementById('kwadScreen'),
    btnKwadHome: document.getElementById('btnKwadHome'),
    btnKwadSettings: document.getElementById('btnKwadSettings'),
    kwadTrick: document.getElementById('kwadTrick'),
    kwadTurn: document.getElementById('kwadTurn'),
    kwadTurnCard: document.getElementById('kwadTurnCard'),
    kwadObstacle: document.getElementById('kwadObstacle'),
    kwadObstaclePicker: document.getElementById('kwadObstaclePicker'),
    kwadPlayers: document.getElementById('kwadPlayers'),
    kwadResult: document.getElementById('kwadResult'),
    kwadName: document.getElementById('kwadName'),
    kwadPilotSelect: document.getElementById('kwadPilotSelect'),
    btnKwadNewTrick: document.getElementById('btnKwadNewTrick'),
    btnKwadDone: document.getElementById('btnKwadDone'),
    btnKwadFail: document.getElementById('btnKwadFail'),
    btnKwadUndo: document.getElementById('btnKwadUndo'),
    btnKwadAdd: document.getElementById('btnKwadAdd'),
    btnKwadReset: document.getElementById('btnKwadReset'),
    btnKwadSettings: document.getElementById('btnKwadSettings'),
    kwadSettingsOverlay: document.getElementById('kwadSettingsOverlay'),
    btnKwadSettingsClose: document.getElementById('btnKwadSettingsClose'),
    kwadCategoryGrid: document.getElementById('kwadCategoryGrid'),
    kwadModeSelect: document.getElementById('kwadModeSelect'),
    kwadCustomTricksList: document.getElementById('kwadCustomTricksList'),
    kwadCustomName: document.getElementById('kwadCustomName'),
    kwadCustomDesc: document.getElementById('kwadCustomDesc'),
    kwadCustomCheck: document.getElementById('kwadCustomCheck'),
    btnKwadCustomSave: document.getElementById('btnKwadCustomSave'),
    kwadStatsGrid: document.getElementById('kwadStatsGrid'),
    versionBadge: document.getElementById('versionBadge'),
    toast: document.getElementById('toast'),
    btnForceUpdate: document.getElementById('btnForceUpdate'),
    btnBackup: document.getElementById('btnBackup'),
    fileRestore: document.getElementById('fileRestore'),
    backupStatus: document.getElementById('backupStatus'),
  };

  const procCanvas = document.createElement('canvas');
  const procCtx = procCanvas.getContext('2d', { willReadFrequently: true });
  const maskCanvas = document.createElement('canvas');
  const maskCtx = maskCanvas.getContext('2d');
  let maskImage = null;
  const overlayCtx = els.overlay.getContext('2d');

  function ensureMask() {
    if (maskCanvas.width !== state.procW || maskCanvas.height !== state.procH) {
      maskCanvas.width = state.procW;
      maskCanvas.height = state.procH;
      maskImage = maskCtx.createImageData(state.procW, state.procH);
    }
    return maskImage;
  }

  // ---------- helpers ----------
  function loadSettings() {
    try { return JSON.parse(localStorage.getItem('fpv_settings') || '{}'); } catch { return {}; }
  }
  function saveSettings() {
    const data = JSON.stringify({
      diffThreshold: state.diffThreshold,
      enterThreshold: state.enterThreshold,
      exitThreshold: state.exitThreshold,
      cooldownMs: state.cooldownMs,
      procRes: els.procRes.value,
      roi: state.roi,
      pilots: state.pilots,
      currentPilot: state.currentPilot,
      pilotColors: state.pilotColors,
      showMotion: state.showMotion,
      audioEnabled: state.audioEnabled,
      countdownSecs: state.countdownSecs,
      announceMode: state.announceMode,
      announceRate: state.announceRate,
      direction: state.direction,
      driftComp: state.driftComp,
      camLock: state.camLock,
      camDeviceId: state.camDeviceId,
      autoStart: state.autoStart,
      armed: state.armed,
      autoLaps: state.autoLaps,
      setFilter: state.setFilter,
      accent: state.accent,
      sections: state.sections,
      lang: state.lang,
      voiceURI: state.voiceURI,
    });
    try {
      localStorage.setItem('fpv_settings', data);
      return true;
    } catch (e) {
      // Storage is full (usually because of the sets list): free space by
      // dropping the oldest sets, then retry this write once.
      if (trimSetsToFit() > 0) {
        toast(t('storage_trimmed'));
        try { localStorage.setItem('fpv_settings', data); return true; } catch (e2) { /* fall through */ }
      }
      storageError();
      return false;
    }
  }
  function loadSets() {
    try { return JSON.parse(localStorage.getItem('fpv_sets') || '[]'); } catch { return []; }
  }
  function rawSaveSets() {
    try { localStorage.setItem('fpv_sets', JSON.stringify(state.sets)); return true; }
    catch (e) { return false; }
  }
  // Drop the oldest sets until the data fits again (keeps at least one).
  function trimSetsToFit() {
    let dropped = 0;
    while (state.sets.length > 1) {
      const keep = Math.max(1, Math.floor(state.sets.length / 2));
      dropped += state.sets.length - keep;
      state.sets = state.sets.slice(-keep);
      if (rawSaveSets()) return dropped;
    }
    return dropped;
  }
  function saveSets() {
    let capped = 0;
    if (Array.isArray(state.sets) && state.sets.length > MAX_SETS) {
      capped = state.sets.length - MAX_SETS;
      state.sets = state.sets.slice(-MAX_SETS);
    }
    if (rawSaveSets()) {
      if (capped > 0) {
        toast(t('storage_trimmed'));
        try { if (els.setsList) renderSets(); } catch (e) { /* not ready yet */ }
      }
      return true;
    }
    const dropped = trimSetsToFit();
    if (dropped > 0) {
      toast(t('storage_trimmed'));
      try { if (els.setsList) renderSets(); } catch (e) { /* not ready yet */ }
      return true;
    }
    storageError();
    return false;
  }
  function formatAutoLaps(n) {
    return (n === 0 || n === '0') ? '∞' : String(n);
  }
  function fmt(ms) {
    if (!isFinite(ms) || ms < 0) ms = 0;
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const mm = Math.floor(ms % 1000);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(mm).padStart(3,'0')}`;
  }
  function setStatus(txt) { els.status.textContent = txt; }
  function haptic() { if (navigator.vibrate) navigator.vibrate(30); }

  // Small transient message at the bottom of the screen (warnings, hints).
  let toastTimer = 0;
  function toast(msg, ms = 6000) {
    if (!els.toast || !msg) return;
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { if (els.toast) els.toast.hidden = true; }, ms);
  }
  function storageError() { toast(t('storage_full')); }

  // ---------- settings wiring ----------
  function initSettings() {
    const s = state.settings || {};
    state.diffThreshold = s.diffThreshold ?? 35;
    state.enterThreshold = s.enterThreshold ?? 120;
    state.exitThreshold = s.exitThreshold ?? 60;
    state.cooldownMs = s.cooldownMs ?? 2000;
    state.pilots = s.pilots ?? [];
    state.currentPilot = s.currentPilot ?? null;
    state.pilotColors = (s.pilotColors && typeof s.pilotColors === 'object') ? s.pilotColors : {};
    // Backfill a colour for pilots created before colours existed.
    state.pilots.forEach((p, i) => {
      if (!state.pilotColors[p]) state.pilotColors[p] = PILOT_PALETTE[i % PILOT_PALETTE.length];
    });
    state.roi = s.roi ?? null;
    if (s.procRes) els.procRes.value = s.procRes;

    els.diffThresh.value = state.diffThreshold; els.diffThreshVal.textContent = state.diffThreshold;
    els.enterThresh.value = state.enterThreshold; els.enterThreshVal.textContent = state.enterThreshold;
    els.exitThresh.value = state.exitThreshold; els.exitThreshVal.textContent = state.exitThreshold;
    els.cooldown.value = state.cooldownMs; els.cooldownVal.textContent = state.cooldownMs;
    state.showMotion = s.showMotion ?? true;
    if (els.showMotion) els.showMotion.checked = state.showMotion;
    state.audioEnabled = s.audioEnabled ?? true;
    if (els.audioEnabled) els.audioEnabled.checked = state.audioEnabled;
    state.countdownSecs = s.countdownSecs ?? 5;
    state.announceMode = ANN_MODES.includes(s.announceMode) ? s.announceMode : 'jede';
    if (els.announceMode) els.announceMode.value = state.announceMode;
    state.announceRate = s.announceRate ?? 1;
    if (els.announceRate) { els.announceRate.value = state.announceRate; els.announceRateVal.textContent = (+state.announceRate).toFixed(2); }
    state.direction = s.direction ?? 'aus';
    updateDirectionButton();
    state.driftComp = s.driftComp ?? true;
    if (els.driftComp) els.driftComp.checked = state.driftComp;
    state.camLock = s.camLock ?? false;
    if (els.camLock) els.camLock.checked = state.camLock;
    state.camDeviceId = s.camDeviceId || '';
    state.autoStart = s.autoStart ?? false;
    if (els.autoStartQuick) els.autoStartQuick.checked = state.autoStart;
    state.armed = s.armed ?? false;
    if (els.armedToggle) els.armedToggle.checked = state.armed;
    state.autoLaps = s.autoLaps ?? 0;
    renderAutoLaps();
    renderCountdown();
    state.setFilter = s.setFilter || '';
    state.sections = (s.sections && typeof s.sections === 'object') ? s.sections : {};
    state.accent = s.accent || '#ff7a1a';
    state.sets = loadSets();
    state.lang = (s.lang === 'en') ? 'en' : 'de';
    if (els.langSelect) els.langSelect.value = state.lang;
    state.voiceURI = s.voiceURI || '';
    applyProcRes();
    applyAccent(state.accent, false);
    initSections();
    if (els.pilotColor) els.pilotColor.hidden = true;
    renderPilots();
  }

  // ---------- language / i18n ----------
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    const dict = I18N[state.lang] || I18N.de;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (k in dict) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const k = el.getAttribute('data-i18n-ph');
      if (k in dict) el.setAttribute('placeholder', dict[k]);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const k = el.getAttribute('data-i18n-title');
      if (k in dict) el.setAttribute('title', dict[k]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const k = el.getAttribute('data-i18n-aria');
      if (k in dict) el.setAttribute('aria-label', dict[k]);
    });
    document.title = t('title');
    updateDirectionButton();
    updateCamButtonText();
    populateVoices();
    renderPilots();
    renderLaps();
    renderSets();
    if (!state.stream && !state.raceActive && !state.countdownActive) {
      setStatus(t('status_ready') + ' (v' + APP_VERSION + ') – ' + t('start_camera'));
    }
  }

  function updateCamButtonText() {
    if (!els.btnStartCam) return;
    els.btnStartCam.textContent = state.stream ? t('stop_camera') : t('start_camera');
  }

  function applyProcRes() {
    const v = els.procRes.value;
    const oldW = state.procW, oldH = state.procH;
    if (v === '480x360') { state.procW = 480; state.procH = 360; }
    else { state.procW = 320; state.procH = 240; }
    procCanvas.width = state.procW; procCanvas.height = state.procH;
    // The ROI is stored in process-canvas pixels. Changing the processing
    // resolution re-maps the camera image onto a different grid, so scale the
    // ROI with it — otherwise a 320x240 frame would shrink/shift at 480x360.
    if (state.roi && oldW && oldH && (oldW !== state.procW || oldH !== state.procH)) {
      const rx = state.procW / oldW, ry = state.procH / oldH;
      state.roi = {
        x: Math.round(state.roi.x * rx),
        y: Math.round(state.roi.y * ry),
        w: Math.round(state.roi.w * rx),
        h: Math.round(state.roi.h * ry),
      };
    }
    if (state.roi) {
      state.roi.x = Math.max(0, Math.min(state.procW - 8, state.roi.x));
      state.roi.y = Math.max(0, Math.min(state.procH - 8, state.roi.y));
      state.roi.w = Math.min(state.roi.w, state.procW - state.roi.x);
      state.roi.h = Math.min(state.roi.h, state.procH - state.roi.y);
      if (state.roi.w < 8 || state.roi.h < 8) state.roi = null;
    }
  }

  els.diffThresh.addEventListener('input', e => { state.diffThreshold = +e.target.value; els.diffThreshVal.textContent = state.diffThreshold; saveSettings(); });
  els.enterThresh.addEventListener('input', e => { state.enterThreshold = +e.target.value; els.enterThreshVal.textContent = state.enterThreshold; saveSettings(); });
  els.exitThresh.addEventListener('input', e => { state.exitThreshold = +e.target.value; els.exitThreshVal.textContent = state.exitThreshold; saveSettings(); });
  els.cooldown.addEventListener('input', e => { state.cooldownMs = +e.target.value; els.cooldownVal.textContent = state.cooldownMs; saveSettings(); });
  els.procRes.addEventListener('change', () => { applyProcRes(); saveSettings(); });
  if (els.showMotion) {
    els.showMotion.addEventListener('change', e => { state.showMotion = e.target.checked; saveSettings(); });
  }
  if (els.audioEnabled) {
    els.audioEnabled.addEventListener('change', e => { state.audioEnabled = e.target.checked; unlockAudio(); saveSettings(); });
  }
  if (els.announceMode) {
    els.announceMode.addEventListener('change', e => {
      state.announceMode = ANN_MODES.includes(e.target.value) ? e.target.value : 'jede';
      els.announceMode.value = state.announceMode;
      saveSettings();
    });
  }
  if (els.announceRate) {
    els.announceRate.addEventListener('input', e => { state.announceRate = +e.target.value; els.announceRateVal.textContent = state.announceRate.toFixed(2); saveSettings(); });
  }

  // ---------- speech announcements (Text-to-Speech) ----------
  let ttsVoices = [];
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    ttsVoices = window.speechSynthesis.getVoices() || [];
    populateVoices();
  }
  function voicesForLang() {
    const pref = state.lang === 'en' ? /^en/i : /^de/i;
    const list = ttsVoices.filter(v => pref.test(v.lang));
    return list.length ? list : ttsVoices;
  }
  function populateVoices() {
    if (!els.voiceSelect) return;
    const list = voicesForLang();
    els.voiceSelect.innerHTML = '';
    const auto = document.createElement('option');
    auto.value = '';
    auto.textContent = t('voice_auto');
    els.voiceSelect.appendChild(auto);
    list.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI || v.name;
      opt.textContent = v.name + (v.lang ? ' (' + v.lang + ')' : '');
      els.voiceSelect.appendChild(opt);
    });
    els.voiceSelect.value = state.voiceURI || '';
  }
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }
  function pickVoice() {
    if (state.voiceURI) {
      const v = ttsVoices.find(v => (v.voiceURI || v.name) === state.voiceURI);
      if (v) return v;
    }
    const pref = state.lang === 'en' ? /^en/i : /^de/i;
    return ttsVoices.find(v => pref.test(v.lang)) || ttsVoices.find(v => pref.test(v.name)) || null;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = state.lang === 'en' ? 'en-US' : 'de-DE';
      u.rate = state.announceRate || 1;
      u.pitch = 1;
      u.volume = 1;
      const v = pickVoice();
      if (v) u.voice = v;
      // small delay after cancel avoids the utterance being dropped on some Android browsers
      setTimeout(() => { try { synth.speak(u); } catch (e) { /* ignore */ } }, 60);
    } catch (e) { /* ignore */ }
  }
  function primeSpeech() {
    if (!('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  function secondsToSpeech(ms) {
    const sep = t('decimal_sep');
    const totalSec = ms / 1000;
    if (totalSec < 60) {
      return totalSec.toFixed(2).replace('.', sep) + ' ' + t('seconds_word');
    }
    const min = Math.floor(totalSec / 60);
    const sec = (totalSec - min * 60).toFixed(2).replace('.', sep);
    return min + ' ' + (min === 1 ? t('minute_word') : t('minutes_word')) + ' ' + sec + ' ' + t('seconds_word');
  }
  if (els.btnTestVoice) {
    els.btnTestVoice.addEventListener('click', () => {
      primeSpeech();
      speak(t('voice_test'));
    });
  }

  // ---------- direction control ----------
  const DIRECTION_ORDER = ['aus', 'lr', 'rl', 'tb', 'bt'];
  const DIRECTION_LABEL = { aus: '↔ aus', lr: '→', rl: '←', tb: '↓', bt: '↑' };
  function updateDirectionButton() {
    if (els.btnDirection) {
      els.btnDirection.textContent = DIRECTION_LABEL[state.direction] || '↔ aus';
      els.btnDirection.title = t('direction_btn_title') + ' (' + dirText(state.direction) + ')';
    }
    if (els.directionSelect) els.directionSelect.value = state.direction;
  }
  function setDirection(dir, showToast) {
    state.direction = dir;
    updateDirectionButton();
    saveSettings();
    setStatus(t('direction_prefix') + dirText(state.direction));
    if (showToast) state.directionToastUntil = performance.now() + 1400;
  }
  if (els.btnDirection) {
    els.btnDirection.addEventListener('click', () => {
      const i = DIRECTION_ORDER.indexOf(state.direction);
      setDirection(DIRECTION_ORDER[(i + 1) % DIRECTION_ORDER.length], true);
    });
  }
  if (els.directionSelect) {
    els.directionSelect.addEventListener('change', e => setDirection(e.target.value, true));
  }
  if (els.driftComp) {
    els.driftComp.addEventListener('change', e => { state.driftComp = e.target.checked; saveSettings(); });
  }
  if (els.camLock) {
    els.camLock.addEventListener('change', e => {
      state.camLock = e.target.checked;
      saveSettings();
      if (state.stream) applyCameraLock();
    });
  }
  // Auto-Start is toggled from the timer card quick switch.
  function setAutoStart(on) {
    state.autoStart = !!on;
    if (els.autoStartQuick) els.autoStartQuick.checked = state.autoStart;
    saveSettings();
    if (state.autoStart && state.stream && !state.raceActive && !state.countdownActive) {
      armAutoWait(false);
    } else if (!state.autoStart) {
      state.awaitingStart = false;
    }
  }
  function renderAutoLaps() {
    const v = formatAutoLaps(state.autoLaps);
    if (els.autoLaps) els.autoLaps.value = state.autoLaps;
    if (els.autoLapsVal) els.autoLapsVal.textContent = v;
    if (els.autoLapsBadge) els.autoLapsBadge.textContent = v;
    if (els.lapsPopVal) els.lapsPopVal.textContent = v;
  }
  function setAutoLaps(v) {
    v = Math.max(0, Math.min(30, Math.round(Number(v) || 0)));
    state.autoLaps = v;
    renderAutoLaps();
    saveSettings();
    // If the limit was lowered below the laps already flown, end the stint now.
    if (state.autoStart && state.raceActive && v > 0 && state.laps.length >= v) finishAutoStint();
  }
  function toggleLapsPop(show) {
    if (!els.lapsPop) return;
    const willShow = (typeof show === 'boolean') ? show : els.lapsPop.hidden;
    closePops(els.lapsPop);
    els.lapsPop.hidden = !willShow;
  }
  // ---------- countdown badge (prep time) ----------
  function renderCountdown() {
    const v = String(state.countdownSecs) + 's';
    if (els.countdownBadge) els.countdownBadge.textContent = v;
    if (els.cdPopVal) els.cdPopVal.textContent = v;
    if (els.countdownInput) els.countdownInput.value = state.countdownSecs;
  }
  function setCountdown(v) {
    v = Math.max(0, Math.min(15, Math.round(Number(v) || 0)));
    state.countdownSecs = v;
    renderCountdown();
    saveSettings();
  }
  function toggleCountdownPop(show) {
    if (!els.countdownPop) return;
    const willShow = (typeof show === 'boolean') ? show : els.countdownPop.hidden;
    closePops(els.countdownPop);
    els.countdownPop.hidden = !willShow;
  }
  function closePops(except) {
    [els.lapsPop, els.countdownPop].forEach(p => { if (p && p !== except) p.hidden = true; });
  }
  if (els.autoStartQuick) {
    els.autoStartQuick.addEventListener('change', e => setAutoStart(e.target.checked));
  }
  // Same two values are also editable as plain fields in the timer settings.
  if (els.autoLaps) {
    els.autoLaps.addEventListener('change', e => setAutoLaps(e.target.value));
  }
  if (els.countdownInput) {
    els.countdownInput.addEventListener('change', e => setCountdown(e.target.value));
  }
  if (els.autoLapsBadge) {
    els.autoLapsBadge.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleLapsPop();
    });
  }
  if (els.lapsMinus) els.lapsMinus.addEventListener('click', e => { e.stopPropagation(); setAutoLaps(state.autoLaps - 1); });
  if (els.lapsPlus) els.lapsPlus.addEventListener('click', e => { e.stopPropagation(); setAutoLaps(state.autoLaps + 1); });
  if (els.lapsPop) {
    els.lapsPop.querySelectorAll('[data-laps]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        setAutoLaps(+btn.getAttribute('data-laps'));
        toggleLapsPop(false);
      });
    });
  }
  if (els.countdownBadge) {
    els.countdownBadge.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleCountdownPop();
    });
  }
  if (els.cdMinus) els.cdMinus.addEventListener('click', e => { e.stopPropagation(); setCountdown(state.countdownSecs - 1); });
  if (els.cdPlus) els.cdPlus.addEventListener('click', e => { e.stopPropagation(); setCountdown(state.countdownSecs + 1); });
  if (els.countdownPop) {
    els.countdownPop.querySelectorAll('[data-cd]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        setCountdown(+btn.getAttribute('data-cd'));
        toggleCountdownPop(false);
      });
    });
  }
  document.addEventListener('click', e => {
    const pops = [[els.lapsPop, els.autoLapsBadge], [els.countdownPop, els.countdownBadge]];
    pops.forEach(([pop, badge]) => {
      if (!pop || pop.hidden) return;
      if (pop.contains(e.target)) return;
      if (badge && badge.contains(e.target)) return;
      pop.hidden = true;
    });
  });
  if (els.langSelect) {
    els.langSelect.addEventListener('change', e => {
      state.lang = (e.target.value === 'en') ? 'en' : 'de';
      saveSettings();
      applyLanguage();
    });
  }
  if (els.voiceSelect) {
    els.voiceSelect.addEventListener('change', e => {
      state.voiceURI = e.target.value || '';
      saveSettings();
    });
  }

  // ---------- appearance (accent colour) ----------
  function hexLighten(hex, amt) {
    const h = String(hex).replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const mix = c => Math.round(c + (255 - c) * amt);
    return '#' + [mix(r), mix(g), mix(b)].map(v => v.toString(16).padStart(2, '0')).join('');
  }
  function applyAccent(hex, persist) {
    if (!/^#[0-9a-fA-F]{6}$/.test(String(hex || ''))) return;
    state.accent = String(hex).toLowerCase();
    document.documentElement.style.setProperty('--accent', state.accent);
    document.documentElement.style.setProperty('--accent2', hexLighten(state.accent, 0.35));
    if (els.accentCustom) els.accentCustom.value = state.accent;
    if (els.accentSwatches) {
      els.accentSwatches.querySelectorAll('button[data-color]').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-color').toLowerCase() === state.accent);
      });
    }
    if (persist) saveSettings();
  }
  if (els.accentSwatches) {
    els.accentSwatches.querySelectorAll('button[data-color]').forEach(btn => {
      btn.addEventListener('click', () => applyAccent(btn.getAttribute('data-color'), true));
    });
  }
  if (els.accentCustom) {
    els.accentCustom.addEventListener('input', e => applyAccent(e.target.value, true));
  }

  // ---------- collapsible main sections ----------
  function initSections() {
    document.querySelectorAll('details.card-collapsible').forEach(d => {
      const key = d.getAttribute('data-sec');
      if (key && state.sections[key] === false) d.open = false;
      d.addEventListener('toggle', () => {
        if (!key) return;
        state.sections[key] = d.open;
        saveSettings();
        if (d.open && key === 'sets') renderChart();
        if (d.open && key === 'camera') drawOverlay();
      });
    });
  }

  // ---------- settings panel ----------
  // Three contexts: app settings (home tile + topbar gear), timer settings
  // (gear inside the timer card) and camera settings (gear inside the camera
  // card). Only one overlay can be open at a time.
  const allSettingsOverlays = [els.settingsOverlay, els.timerSettingsOverlay, els.cameraSettingsOverlay].filter(Boolean);
  function openSettings(which) {
    const target = (which === 'timer') ? els.timerSettingsOverlay
      : (which === 'camera') ? els.cameraSettingsOverlay
      : els.settingsOverlay;
    closeSettings();
    if (target) target.hidden = false;
  }
  function closeSettings() {
    allSettingsOverlays.forEach(o => { o.hidden = true; });
  }
  function settingsOpen() { return allSettingsOverlays.some(o => !o.hidden); }
  if (els.btnSettings) els.btnSettings.addEventListener('click', () => { openSettings('app'); rememberHomeTile('tileSettings'); });
  if (els.btnSettingsClose) els.btnSettingsClose.addEventListener('click', closeSettings);
  if (els.tileSettings) els.tileSettings.addEventListener('click', () => openSettings('app'));
  if (els.btnTimerSettings) els.btnTimerSettings.addEventListener('click', () => openSettings('timer'));
  if (els.btnTimerSettingsClose) els.btnTimerSettingsClose.addEventListener('click', closeSettings);
  if (els.btnCameraSettings) els.btnCameraSettings.addEventListener('click', () => openSettings('camera'));
  if (els.btnCameraSettingsClose) els.btnCameraSettingsClose.addEventListener('click', closeSettings);
  allSettingsOverlays.forEach(o => {
    o.addEventListener('click', e => {
      if (e.target === o) closeSettings();
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (settingsOpen()) { closeSettings(); return; }
    if (els.homeScreen && els.homeScreen.hidden) openHome();
  });

  // ---------- home screen (the app's root: pick a feature) ----------
  function openHome() {
    if (!els.homeScreen) return;
    els.homeScreen.hidden = false;
    if (els.kwadScreen) els.kwadScreen.hidden = true;
    if (els.pilotsScreen) els.pilotsScreen.hidden = true;
    if (els.btnHome) els.btnHome.hidden = true;
    // The topbar gear belongs to the home screen (app settings); the timer view
    // has its own gear inside the timer card.
    if (els.btnSettings) els.btnSettings.hidden = false;
    els.homeScreen.scrollTop = 0;
  }
  function closeHome() {
    if (!els.homeScreen) return;
    els.homeScreen.hidden = true;
    if (els.kwadScreen) els.kwadScreen.hidden = true;
    if (els.pilotsScreen) els.pilotsScreen.hidden = true;
    if (els.btnHome) els.btnHome.hidden = false;
    if (els.btnSettings) els.btnSettings.hidden = true;
    closeSettings();
  }
  if (els.btnHome) els.btnHome.addEventListener('click', openHome);
  if (els.btnKwadHome) els.btnKwadHome.addEventListener('click', openHome);
  if (els.btnPilotsHome) els.btnPilotsHome.addEventListener('click', openHome);
  if (els.tileTimer) els.tileTimer.addEventListener('click', closeHome);

  // The home grid marks the tile that was used last (restored on reload).
  // Falls back to the first tile (Timer) when nothing sensible is stored.
  const homeTiles = [els.tileTimer, els.tileKwad, els.tilePilots, els.tileSettings].filter(Boolean);
  function highlightHomeTile(id) {
    homeTiles.forEach(t => t.classList.toggle('is-primary', t.id === id));
  }
  function rememberHomeTile(id) {
    highlightHomeTile(id);
    try { localStorage.setItem('lastHomeTile', id); } catch (e) { /* ignore */ }
  }
  homeTiles.forEach(t => t.addEventListener('click', () => rememberHomeTile(t.id)));
  (function restoreHomeTile() {
    let id = 'tileTimer';
    try { id = localStorage.getItem('lastHomeTile') || id; } catch (e) { /* ignore */ }
    if (!homeTiles.some(t => t.id === id)) id = 'tileTimer';
    highlightHomeTile(id);
  })();

  // ---------- audio feedback ----------
  // WebAudio only produces sound after a user gesture on Safari and on
  // Chromium browsers with a strict autoplay policy (Edge/Chrome). We unlock
  // the context on the first interaction (with a silent sample — the reliable
  // trick for iOS Safari), keep it alive across tab switches, and degrade
  // gracefully when no AudioContext is available.
  let audioCtx = null;
  let audioUnlocked = false;
  let speechPrimed = false;

  function audioCtor() { return window.AudioContext || window.webkitAudioContext || null; }

  // Resume the context and play one silent sample. MUST be called from a user
  // gesture to satisfy the browser autoplay policies.
  function unlockAudio() {
    try {
      const Ctor = audioCtor();
      if (!Ctor) return null;
      if (!audioCtx) audioCtx = new Ctor();
      const ctx = audioCtx;
      const markReady = () => {
        try {
          const buf = ctx.createBuffer(1, 1, ctx.sampleRate || 22050);
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.connect(ctx.destination);
          src.start(0);
        } catch (e) { /* ignore */ }
        audioUnlocked = true;
      };
      if (ctx.state === 'suspended') {
        const p = ctx.resume();
        if (p && typeof p.then === 'function') p.then(markReady).catch(() => {});
        else markReady();
      } else {
        markReady();
      }
    } catch (e) { /* audio not available */ }
    return audioCtx;
  }

  function ensureAudio() {
    try {
      if (!audioCtx) {
        const Ctor = audioCtor();
        if (Ctor) audioCtx = new Ctor();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        const p = audioCtx.resume();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    } catch (e) { /* audio not available */ }
    return audioCtx;
  }

  // Unlock on the first user interaction, then stop listening. Also resume when
  // the tab/app becomes visible again (mobile browsers suspend the context).
  function installAudioUnlock() {
    const events = ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'];
    function onGesture() {
      unlockAudio();
      if (!speechPrimed) { speechPrimed = true; try { primeSpeech(); } catch (e) { /* ignore */ } }
      if (audioUnlocked) detach();
    }
    const detach = () => events.forEach(ev => window.removeEventListener(ev, onGesture, true));
    events.forEach(ev => window.addEventListener(ev, onGesture, { capture: true, passive: true }));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && audioCtx && audioCtx.state === 'suspended') {
        const p = audioCtx.resume();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    });
  }

  function beep(freq, dur = 0.12, gain = 0.25, type = 'sine', delay = 0) {
    if (!state.audioEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    // Still locked (no gesture yet): skip instead of queuing stale beeps that
    // would all fire at once on the next unlock.
    if (ctx.state !== 'running') return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }
  function soundCountdownTick() { beep(700, 0.09, 0.22, 'square'); }
  function soundGo() { beep(1100, 0.35, 0.3, 'sine'); beep(1500, 0.3, 0.22, 'sine', 0.05); }
  function soundLap() { beep(900, 0.08, 0.25, 'square'); beep(1500, 0.12, 0.25, 'square', 0.1); }
  function soundBest() { beep(1000, 0.08, 0.25, 'square'); beep(1400, 0.08, 0.25, 'square', 0.1); beep(1900, 0.16, 0.28, 'square', 0.2); }
  function soundStop() { beep(500, 0.15, 0.22, 'sine'); beep(350, 0.2, 0.2, 'sine', 0.12); }

  // --- KWAD sounds ---
  function soundKwadPenalty() { beep(300, 0.18, 0.25, 'sawtooth'); beep(220, 0.25, 0.22, 'sawtooth', 0.08); }
  function soundKwadNewTrick() { beep(800, 0.1, 0.2, 'sine'); beep(1100, 0.12, 0.2, 'sine', 0.08); }
  function soundKwadGameOver() { beep(200, 0.3, 0.28, 'sawtooth'); beep(150, 0.4, 0.25, 'sawtooth', 0.15); beep(100, 0.5, 0.22, 'sawtooth', 0.3); }
  function soundKwadSuccess() { beep(600, 0.1, 0.22, 'sine'); beep(900, 0.12, 0.2, 'sine', 0.06); beep(1200, 0.15, 0.2, 'sine', 0.12); }

  // ---------- force update ----------
  async function forceUpdate() {
    setStatus(t('updating'));
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
      if (window.caches && caches.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) { /* ignore */ }
    const base = location.pathname.replace(/index\.html$/, '');
    location.href = base + '?v=' + Date.now();
  }
  if (els.btnForceUpdate) els.btnForceUpdate.addEventListener('click', forceUpdate);

  // --- Backup / Restore ---
  function createBackup() {
    const data = {
      version: 1,
      timestamp: Date.now(),
      settings: {
        diffThreshold: state.diffThreshold,
        enterThreshold: state.enterThreshold,
        exitThreshold: state.exitThreshold,
        cooldownMs: state.cooldownMs,
        procRes: els.procRes?.value,
        roi: state.roi,
        pilots: state.pilots,
        currentPilot: state.currentPilot,
        pilotColors: state.pilotColors,
        showMotion: state.showMotion,
        audioEnabled: state.audioEnabled,
        countdownSecs: state.countdownSecs,
        announceMode: state.announceMode,
        announceRate: state.announceRate,
        direction: state.direction,
        driftComp: state.driftComp,
        camLock: state.camLock,
        camDeviceId: state.camDeviceId,
        autoStart: state.autoStart,
        armed: state.armed,
        autoLaps: state.autoLaps,
        setFilter: state.setFilter,
        accent: state.accent,
        sections: state.sections,
        lang: state.lang,
        voiceURI: state.voiceURI,
      },
      sets: state.sets,
      laps: state.laps,
      kwad: {
        players: kwadPlayers,
        mode: kwadMode,
        categories: KWAD_CATEGORIES,
        stats: kwadStats,
        customTricks: KWAD_CATEGORIES?.custom?.tricks || [],
      },
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().slice(0,19).replace(/:/g,'-');
    const parts = ['fpv'];
    if (data.settings) parts.push('settings');
    if (data.sets?.length) parts.push('sets');
    if (data.laps?.length) parts.push('laps');
    if (data.kwad?.players?.length) parts.push('kwad-players');
    if (data.kwad?.categories) parts.push('kwad-cats');
    if (data.kwad?.stats) parts.push('kwad-stats');
    if (data.kwad?.customTricks?.length) parts.push('kwad-custom');
    const name = `${parts.join('-')}-${ts}.json`;
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    return name;
  }

  function restoreBackup(json) {
    try {
      const data = JSON.parse(json);
      if (!data || data.version !== 1) throw new Error('Invalid backup format');

      // Restore settings
      if (data.settings) {
        Object.assign(state, data.settings);
        // Apply UI
        if (data.settings.procRes) els.procRes.value = data.settings.procRes;
        if (els.diffThresh) { els.diffThresh.value = data.settings.diffThreshold; els.diffThreshVal.textContent = data.settings.diffThreshold; }
        if (els.enterThresh) { els.enterThresh.value = data.settings.enterThreshold; els.enterThreshVal.textContent = data.settings.enterThreshold; }
        if (els.exitThresh) { els.exitThresh.value = data.settings.exitThreshold; els.exitThreshVal.textContent = data.settings.exitThreshold; }
        if (els.cooldown) { els.cooldown.value = data.settings.cooldownMs; els.cooldownVal.textContent = data.settings.cooldownMs; }
        if (els.showMotion) els.showMotion.checked = data.settings.showMotion;
        if (els.audioEnabled) els.audioEnabled.checked = data.settings.audioEnabled;
        if (els.announceMode) els.announceMode.value = data.settings.announceMode;
        if (els.announceRate) { els.announceRate.value = data.settings.announceRate; els.announceRateVal.textContent = (+data.settings.announceRate).toFixed(2); }
        if (els.directionSelect) els.directionSelect.value = data.settings.direction;
        if (els.driftComp) els.driftComp.checked = data.settings.driftComp;
        if (els.camLock) els.camLock.checked = data.settings.camLock;
        if (els.autoStartQuick) els.autoStartQuick.checked = data.settings.autoStart;
        if (els.armedToggle) els.armedToggle.checked = data.settings.armed;
        if (els.autoLaps) els.autoLaps.value = data.settings.autoLaps;
        if (els.setPilotFilter) els.setPilotFilter.value = data.settings.setFilter;
        if (els.accentCustom) els.accentCustom.value = data.settings.accent;
        if (els.langSelect) els.langSelect.value = data.settings.lang;
        if (els.voiceSelect) els.voiceSelect.value = data.settings.voiceURI || '';
        state.accent = data.settings.accent;
        applyAccent(state.accent, false);
        if (data.settings.lang) { state.lang = data.settings.lang; if (els.langSelect) els.langSelect.value = state.lang; }
        applyLanguage();
        saveSettings();
      }

      // Restore sets & laps
      if (Array.isArray(data.sets)) {
        state.sets = data.sets;
        saveSets();
      }
      if (Array.isArray(data.laps)) {
        state.laps = data.laps;
        renderLaps();
        updateBest();
      }

      // Restore KWAD
      if (data.kwad) {
        if (Array.isArray(data.kwad.players)) {
          kwadPlayers = data.kwad.players;
        }
        if (data.kwad.mode) kwadMode = data.kwad.mode;
        if (data.kwad.categories) {
          Object.keys(data.kwad.categories).forEach(id => {
            if (KWAD_CATEGORIES[id] && typeof data.kwad.categories[id].enabled === 'boolean') {
              KWAD_CATEGORIES[id].enabled = data.kwad.categories[id].enabled;
            }
          });
        }
        if (data.kwad.stats) kwadStats = data.kwad.stats;
        if (data.kwad.customTricks) KWAD_CATEGORIES.custom.tricks = data.kwad.customTricks;
        kwadTrickPool = kwadBuildTrickPool();
        if (kwadMode === 'roundRobinCategory') {
          kwadCategoryOrder = Object.values(KWAD_CATEGORIES).filter(c => c.enabled && c.tricks.length).map(c => c.id);
          kwadCategoryIdx = 0;
        }
        kwadSave();
        kwadSaveCategories();
        kwadSaveCustomTricks();
        kwadSaveMode();
        kwadSaveStats();
      }

      // Re-render everything
      applyAccent(state.accent, false);
      applyLanguage();
      renderPilots();
      renderLaps();
      renderSets();
      renderKwad();
      if (els.kwadModeSelect) renderKwadMode();
      if (els.kwadCategoryGrid) renderKwadCategories();
      if (els.kwadCustomTricksList) renderKwadCustomTricks();
      if (els.kwadStatsGrid) renderKwadStats();

      return true;
    } catch (e) {
      console.error('Restore error:', e);
      throw e;
    }
  }

  if (els.btnBackup) {
    els.btnBackup.addEventListener('click', () => {
      try {
        const name = createBackup();
        if (els.backupStatus) {
          els.backupStatus.textContent = t('backup_done').replace('{name}', name);
          els.backupStatus.hidden = false;
          setTimeout(() => { els.backupStatus.hidden = true; }, 3000);
        }
      } catch (e) {
        console.error('Backup error:', e);
        toast('Backup fehlgeschlagen: ' + e.message);
      }
    });
  }

  if (els.fileRestore) {
    els.fileRestore.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          restoreBackup(ev.target.result);
          if (els.backupStatus) {
            els.backupStatus.textContent = t('restore_done');
            els.backupStatus.hidden = false;
          }
          setTimeout(() => location.reload(), 1500);
        } catch (e) {
          if (els.backupStatus) {
            els.backupStatus.textContent = t('restore_error').replace('{error}', e.message);
            els.backupStatus.hidden = false;
          }
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });
  }

  // ---------- camera ----------
  function isBackLabel(label) { return /(back|rear|environment|r[üu]ck)/i.test(label || ''); }
  function isFrontLabel(label) { return /(front|user|face)/i.test(label || ''); }
  async function enumerateCameras() {
    try {
      const devs = await navigator.mediaDevices.enumerateDevices();
      state.devices = devs.filter(d => d.kind === 'videoinput');
      els.camSelect.innerHTML = '';
      state.devices.forEach((d, i) => {
        const opt = document.createElement('option');
        opt.value = d.deviceId;
        opt.textContent = d.label || (t('camera_n') + (i+1));
        els.camSelect.appendChild(opt);
      });
    } catch (e) { console.error(e); }
  }

  // Make the dropdown show the camera that is actually delivering the preview,
  // and remember it for the next start.
  function selectActiveCamera(activeId, facing, wanted) {
    const opts = Array.from(els.camSelect.options);
    const has = id => id && opts.some(o => o.value === id);
    let chosen = '';
    if (has(activeId)) chosen = activeId;
    else if (has(wanted)) chosen = wanted;
    else if (facing) {
      const re = facing === 'environment' ? isBackLabel : isFrontLabel;
      const match = state.devices.find(d => re(d.label));
      if (match) chosen = match.deviceId;
    }
    if (!chosen && activeId) chosen = activeId;
    if (chosen) {
      els.camSelect.value = chosen;
      state.camDeviceId = chosen;
    }
    saveSettings();
  }

  // Best-effort: stop the camera from constantly hunting focus / exposure. This is
  // OPT-IN (state.camLock) because forcing manual exposure can freeze a dark image
  // on some phones. Applied ~1.5 s after start so auto-exposure can settle first.
  function applyCameraLock() {
    const track = state.stream && state.stream.getVideoTracks()[0];
    if (!track || !track.applyConstraints) return;
    if (!state.camLock) {
      // restore auto modes if possible
      const auto = [{ focusMode: 'continuous' }, { exposureMode: 'continuous' }, { whiteBalanceMode: 'continuous' }];
      try { track.applyConstraints({ advanced: auto }); } catch (e) { /* ignore */ }
      return;
    }
    setTimeout(() => {
      if (!state.camLock || !state.stream) return;
      const tr = state.stream.getVideoTracks()[0];
      if (!tr || !tr.applyConstraints) return;
      (async () => {
        for (const adv of [{ focusMode: 'manual' }, { focusMode: 'none' }, { exposureMode: 'manual' }, { whiteBalanceMode: 'manual' }]) {
          try { await tr.applyConstraints({ advanced: [adv] }); } catch (e) { /* not supported */ }
        }
      })().catch(() => {});
    }, 1500);
  }

  async function startCamera(deviceId) {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setStatus(t('cam_unavailable'));
      return;
    }
    if (state.stream) {
      state.stream.getTracks().forEach(t => t.stop());
      state.stream = null;
    }
    try {
      const wanted = deviceId || state.camDeviceId || '';
      const constraints = {
        video: {
          deviceId: wanted ? { ideal: wanted } : undefined,
          width: { ideal: 1280 }, height: { ideal: 720 },
          facingMode: { ideal: 'environment' }
        }, audio: false
      };
      state.stream = await navigator.mediaDevices.getUserMedia(constraints);
      els.video.srcObject = state.stream;
      const track = state.stream.getVideoTracks()[0];
      const tsettings = (track && track.getSettings) ? track.getSettings() : {};
      const activeId = tsettings.deviceId || '';
      const facing = tsettings.facingMode || '';
      applyCameraLock();
      await els.video.play();
      await enumerateCameras();
      selectActiveCamera(activeId, facing, wanted);
      setStatus(t('cam_running'));
      els.zoneHint.style.display = 'block';
      updateCamButtonText();
      els.btnStartCam.classList.remove('primary');
      startLoop();
      // Auto-calibrate the background once video is running, so detection works right away.
      setTimeout(() => { if (!state.background && state.stream) calibrateBackground(); }, 1200);
    } catch (e) {
      console.error(e);
      setStatus(t('cam_error') + (e.message || e));
    }
  }

  function stopCamera() {
    if (state.stream) {
      state.stream.getTracks().forEach(t => t.stop());
      state.stream = null;
    }
    if (state.rafId) { cancelAnimationFrame(state.rafId); state.rafId = null; }
    els.video.srcObject = null;
    state.background = null;
    state.view = null;
    state.motionBox = null;
    overlayCtx.clearRect(0, 0, els.overlay.width, els.overlay.height);
    updateCamButtonText();
    els.btnStartCam.classList.add('primary');
    els.zoneHint.style.display = 'block';
    setStatus(t('cam_stopped'));
  }

  els.btnStartCam.addEventListener('click', () => {
    if (state.stream) stopCamera();
    else startCamera(els.camSelect.value);
  });
  els.camSelect.addEventListener('change', () => { if (state.stream) startCamera(els.camSelect.value); });

  // ---------- ROI drawing ----------
  // Map the camera image ("contain" fit) onto the overlay canvas. This is the
  // single source of truth for both drawing the preview and converting ROI
  // screen coordinates into process-canvas coordinates — valid at any aspect
  // ratio, resolution or orientation.
  function computeView(w, h) {
    const vw = els.video.videoWidth, vh = els.video.videoHeight;
    const pw = state.procW, ph = state.procH;
    if (!w || !h || !vw || !vh || !pw || !ph) return null;
    const scale = Math.min(w / vw, h / vh);
    const dw = vw * scale, dh = vh * scale;
    return { dx: (w - dw) / 2, dy: (h - dh) / 2, dw, dh, sx: dw / pw, sy: dh / ph };
  }
  function currentView() {
    return state.view || computeView(els.overlay.width, els.overlay.height);
  }
  function toProc(pos) {
    const rect = els.overlay.getBoundingClientRect();
    const cx = (pos.x - rect.left) * (els.overlay.width / rect.width);
    const cy = (pos.y - rect.top) * (els.overlay.height / rect.height);
    const v = currentView() || { dx: 0, dy: 0, sx: els.overlay.width / state.procW, sy: els.overlay.height / state.procH };
    return { x: (cx - v.dx) / v.sx, y: (cy - v.dy) / v.sy };
  }
  function getPos(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  els.overlay.addEventListener('mousedown', e => startDraw(getPos(e)));
  els.overlay.addEventListener('mousemove', e => moveDraw(getPos(e)));
  window.addEventListener('mouseup', endDraw);
  els.overlay.addEventListener('touchstart', e => { e.preventDefault(); startDraw(getPos(e)); }, { passive: false });
  els.overlay.addEventListener('touchmove', e => { e.preventDefault(); moveDraw(getPos(e)); }, { passive: false });
  els.overlay.addEventListener('touchend', e => { e.preventDefault(); endDraw(); }, { passive: false });

  function startDraw(pos) {
    // Without a running camera there is no image to map the ROI onto; drawing
    // now would produce a frame that lands somewhere else once video starts.
    if (!state.stream || !els.video.videoWidth) { setStatus(t('start_camera_first')); return; }
    state.drawing = true;
    state.drawStart = toProc(pos);
    state.roi = null;
    saveSettings();
  }
  function moveDraw(pos) {
    if (!state.drawing) return;
    const cur = toProc(pos);
    const x0 = Math.min(state.drawStart.x, cur.x);
    const y0 = Math.min(state.drawStart.y, cur.y);
    const w = Math.abs(cur.x - state.drawStart.x);
    const h = Math.abs(cur.y - state.drawStart.y);
    state.roi = { x: x0, y: y0, w: Math.max(8, w), h: Math.max(8, h) };
  }
  function endDraw() {
    if (!state.drawing) return;
    state.drawing = false;
    if (state.roi) {
      state.roi.x = Math.max(0, Math.min(state.procW - 8, state.roi.x));
      state.roi.y = Math.max(0, Math.min(state.procH - 8, state.roi.y));
      state.roi.w = Math.min(state.roi.w, state.procW - state.roi.x);
      state.roi.h = Math.min(state.roi.h, state.procH - state.roi.y);
      if (state.roi.w < 8 || state.roi.h < 8) state.roi = null;
    }
    els.zoneHint.style.display = state.roi ? 'none' : 'block';
    saveSettings();
  }

  // ---------- processing loop ----------
  function startLoop() {
    if (state.rafId) cancelAnimationFrame(state.rafId);
    const loop = (ts) => {
      state.rafId = requestAnimationFrame(loop);
      processFrame();
    };
    state.rafId = requestAnimationFrame(loop);
  }

  function calibrateBackground() {
    if (!els.video.videoWidth) { setStatus(t('no_video')); return; }
    const n = 8;
    const acc = new Float32Array(state.procW * state.procH);
    let done = 0;
    const capture = () => {
      if (done >= n) {
        for (let i = 0; i < acc.length; i++) acc[i] /= n;
        state.background = acc;
        setStatus(t('bg_calibrated'));
        haptic();
        if (state.autoStart && !state.raceActive && !state.countdownActive) armAutoWait();
        return;
      }
      processGrayInto(acc, true);
      done++;
      setTimeout(capture, 40);
    };
    capture();
  }
  els.btnCalibrate.addEventListener('click', calibrateBackground);

  function processGrayInto(target, accumulate) {
    procCtx.drawImage(els.video, 0, 0, state.procW, state.procH);
    const data = procCtx.getImageData(0, 0, state.procW, state.procH).data;
    const n = state.procW * state.procH;
    for (let i = 0; i < n; i++) {
      const j = i * 4;
      const g = 0.299 * data[j] + 0.587 * data[j+1] + 0.114 * data[j+2];
      if (accumulate) target[i] += g; else target[i] = g;
    }
  }

  function processFrame() {
    // keep overlay size in sync with element
    const rect = els.overlay.getBoundingClientRect();
    if (els.overlay.width !== Math.round(rect.width) || els.overlay.height !== Math.round(rect.height)) {
      els.overlay.width = Math.round(rect.width);
      els.overlay.height = Math.round(rect.height);
    }
    const w = els.overlay.width, h = els.overlay.height;
    overlayCtx.clearRect(0, 0, w, h);

    const vw = els.video.videoWidth, vh = els.video.videoHeight;
    if (!vw || !vh || !state.stream) {
      // Video not ready yet
      if (state.stream) {
        overlayCtx.fillStyle = 'rgba(0,0,0,0.6)';
        overlayCtx.fillRect(0, h - 34, w, 34);
        overlayCtx.fillStyle = '#ff7a1a';
        overlayCtx.font = 'bold 15px sans-serif';
        overlayCtx.textAlign = 'center';
        overlayCtx.fillText(t('starting_cam'), w / 2, h - 12);
        overlayCtx.textAlign = 'left';
      }
      return;
    }

    // Draw the camera image ourselves with "contain" fit. This guarantees a
    // visible preview even if the <video> element fails to paint on some devices,
    // and it lets us map the ROI exactly onto the image.
    const view = computeView(w, h);
    if (view) {
      state.view = view;
      overlayCtx.drawImage(els.video, view.dx, view.dy, view.dw, view.dh);
    }

    const gray = new Float32Array(state.procW * state.procH);
    processGrayInto(gray, false);

    const now = performance.now();
    updateCountdown(now);

    if (!state.background) {
      els.metricState.textContent = t('status_prefix') + t('calibrating_bg') + ' (v' + APP_VERSION + ')';
      overlayCtx.fillStyle = 'rgba(0,0,0,0.55)';
      overlayCtx.fillRect(0, h - 34, w, 34);
      overlayCtx.fillStyle = '#ff7a1a';
      overlayCtx.font = 'bold 15px sans-serif';
      overlayCtx.textAlign = 'center';
      overlayCtx.fillText(t('calibrating_bg'), w / 2, h - 12);
      overlayCtx.textAlign = 'left';
      drawOverlay();
      return;
    }

    const roi = state.roi;
    let changed = 0;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let sumX = 0, sumY = 0;
    const mask = ensureMask();
    if (mask) mask.data.fill(0);
    if (roi) {
      for (let y = Math.floor(roi.y); y < Math.floor(roi.y + roi.h); y++) {
        if (y < 0 || y >= state.procH) continue;
        for (let x = Math.floor(roi.x); x < Math.floor(roi.x + roi.w); x++) {
          if (x < 0 || x >= state.procW) continue;
          const idx = y * state.procW + x;
          if (Math.abs(gray[idx] - state.background[idx]) > state.diffThreshold) {
            changed++;
            sumX += x; sumY += y;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            if (mask) {
              const m = idx * 4;
              mask.data[m] = 255;
              mask.data[m + 1] = 235;
              mask.data[m + 2] = 0;
              mask.data[m + 3] = 170;
            }
          }
        }
      }
    }
    state.lastChanged = changed;
    if (changed > state.maxChangedSeen) state.maxChangedSeen = changed; // debug
    state.motionBox = changed > 0
      ? { minX, minY, maxX, maxY, cx: sumX / changed, cy: sumY / changed, changed }
      : null;

    // How much of the frame changed? Autofocus / exposure shifts change a large
    // part of the WHOLE image, while a drone can only ever cover a small blob.
    const roiArea = roi ? Math.max(1, Math.floor(roi.w) * Math.floor(roi.h)) : 0;
    let changedAll = 0, sampled = 0;
    if (state.background) {
      const nAll = state.procW * state.procH;
      for (let i = 0; i < nAll; i += 4) { // every 4th pixel is enough and cheap
        sampled++;
        if (Math.abs(gray[i] - state.background[i]) > state.diffThreshold) changedAll++;
      }
    }
    const fullFrameChange = sampled > 0 && (changedAll / sampled) > 0.45;
    const globalChange = fullFrameChange || (!!roi && changed > roiArea * 0.9);

    // Slowly adapt the background to the current frame. This absorbs focus/exposure
    // drift so it does not show up as motion. It also runs while a crossing is
    // active: a crossing is over in a few frames, so the drone is not absorbed,
    // but a stale background (camera bump) heals itself within a few seconds.
    if (state.driftComp && state.background) {
      const bg = state.background;
      const a = 0.01;
      for (let i = 0; i < bg.length; i++) bg[i] += (gray[i] - bg[i]) * a;
    }

    // state machine
    if (globalChange) {
      // Almost the whole frame/ROI changed at once -> focus/light, not a drone.
      state.machine = 0;
      state.pendingLap = null;
      state.wrongFlashUntil = 0;
    } else if (state.armed && (state.raceActive || state.awaitingStart) && roi) {
      if (state.machine === 0 && changed <= state.exitThreshold) {
        // Gate really is clear again -> allow the next crossing to trigger.
        state.needsClear = false;
      }
      if (state.machine === 0 && changed >= state.enterThreshold && !state.needsClear) {
        state.machine = 1;
        state.machineEnterAt = now;
        state.pendingLap = {
          t: now,
          start: (state.motionBox && state.motionBox.changed > 0) ? { x: state.motionBox.cx, y: state.motionBox.cy } : null,
          last: (state.motionBox && state.motionBox.changed > 0) ? { x: state.motionBox.cx, y: state.motionBox.cy } : null,
        };
        if (state.awaitingStart) {
          // First crossing starts the race; it is not counted as a lap.
          beginRaceAt(now);
          state.pendingLap = null;
        } else if (state.direction === 'aus') {
          tryTriggerLap(now);
          state.pendingLap = null;
        }
      } else if (state.machine === 1) {
        // Safety: never stay "occupied" forever. A real crossing lasts well under
        // a second; if it does not, the background was stale (e.g. camera bump).
        // We force the gate clear but require it to really go quiet before another
        // lap may fire, so this can never produce phantom laps.
        if (now - (state.machineEnterAt || now) > 2500) {
          state.machine = 0;
          state.pendingLap = null;
          state.needsClear = true;
        } else {
          if (state.motionBox && state.motionBox.changed > 0 && state.pendingLap) {
            state.pendingLap.last = { x: state.motionBox.cx, y: state.motionBox.cy };
          }
          if (changed <= state.exitThreshold) {
            state.machine = 0;
            if (state.pendingLap && state.direction !== 'aus') {
              evaluatePendingLap(now);
            }
            state.pendingLap = null;
          }
        }
      }
    }

    // meter
    const pct = Math.min(100, (changed / Math.max(1, state.enterThreshold * 3)) * 100);
    els.meterFill.style.width = pct + '%';
    els.metricValue.textContent = changed + ' px';
    els.metricState.textContent = globalChange
      ? (t('status_prefix') + t('global_change'))
      : (t('status_prefix') + (state.machine === 1 ? t('gate_busy') : t('gate_free')) + (state.armed ? t('armed_suffix') : ''));

    drawOverlay();
    updateTimers();
  }

  function tryTriggerLap(now) {
    if (state.laps.length > 0 && now - state.lastTrigger < state.cooldownMs) return;
    if (state.laps.length === 0 && now - (state.raceStart || now) < 1000) return;
    state.lastTrigger = now;
    const recorded = recordLap(now);
    haptic();
    if (recorded && state.autoStart && state.autoLaps > 0 && state.laps.length >= state.autoLaps) {
      finishAutoStint();
    }
  }

  function evaluatePendingLap(now) {
    const p = state.pendingLap;
    if (!p || !p.start || !p.last) {
      // no usable trajectory -> fall back to counting at exit time
      tryTriggerLap(now);
      return;
    }
    const dx = p.last.x - p.start.x;
    const dy = p.last.y - p.start.y;
    // require the drone to actually travel a meaningful distance across the ROI
    const minTravel = state.roi ? Math.max(3, Math.min(state.roi.w, state.roi.h) * 0.05) : 4;
    const dir = state.direction;
    let ok = false;
    if (dir === 'lr') ok = dx >= Math.abs(dy) && dx >= minTravel;
    else if (dir === 'rl') ok = -dx >= Math.abs(dy) && -dx >= minTravel;
    else if (dir === 'tb') ok = dy >= Math.abs(dx) && dy >= minTravel;
    else if (dir === 'bt') ok = -dy >= Math.abs(dx) && -dy >= minTravel;
    else ok = true;
    if (ok) {
      // use the entry time so timing reflects when the drone entered the gate
      tryTriggerLap(p.t);
    } else {
      state.wrongFlashUntil = now + 600;
      setStatus(t('wrong_direction') + ' (' + dirText(dir) + ')');
    }
  }

  function recordLap(triggerTime) {
    const duration = triggerTime - state.currentLapStart;
    if (duration < 300) return false; // ignore tiny
    const prevBest = state.laps.length ? Math.min(...state.laps.map(l => l.duration)) : Infinity;
    const lapNumber = state.laps.length + 1;
    const isBest = duration < prevBest;
    state.laps.push({
      idx: lapNumber,
      pilot: state.currentPilot,
      duration,
      total: triggerTime - state.raceStart,
      at: triggerTime,
    });
    state.currentLapStart = triggerTime;
    state.machine = 0;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    renderLaps();
    updateBest();
    if (isBest) soundBest(); else soundLap();
    announceLap(lapNumber, duration, isBest);
    return true;
  }

  function announceLap(lapNumber, duration, isBest) {
    if (state.announceMode === 'aus') return;
    if (state.announceMode === 'best' && !isBest) return;
    const time = secondsToSpeech(duration);
    const text = (isBest ? t('best_time') + ' ' : '') + t('lap_word') + ' ' + lapNumber + ': ' + time;
    speak(text);
  }

  els.btnLapManual.addEventListener('click', () => {
    if (!state.raceActive) return;
    const recorded = recordLap(performance.now());
    haptic();
    if (recorded && state.autoStart && state.autoLaps > 0 && state.laps.length >= state.autoLaps) {
      finishAutoStint();
    }
  });

  // ---------- race control ----------
  function startCountdown() {
    if (!state.stream) { setStatus(t('start_camera_first')); return; }
    if (state.countdownActive || state.raceActive) return;
    if (state.autoStart) { armAutoWait(false); return; }
    unlockAudio();
    primeSpeech();
    state.laps = [];
    state.stintSaved = false;
    renderLaps();
    updateBest();
    els.lastLap.textContent = '--';
    state.armed = true;
    els.armedToggle.checked = true;
    state.awaitingStart = false;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.machineEnterAt = 0;
    state.needsClear = false;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    state.directionToastUntil = 0;
    state.maxChangedSeen = 0;
    state.lastTrigger = 0;
    if (state.countdownSecs <= 0) { beginRace(); return; }
    state.countdownActive = true;
    state.countdownEnd = performance.now() + state.countdownSecs * 1000;
    state.lastCountdownValue = null;
    setStatus(t('countdown'));
  }

  // Arm the timer and wait for the first gate crossing to start the race.
  function armAutoWait(requireClear) {
    if (!state.stream || state.raceActive || state.countdownActive) return;
    unlockAudio();
    primeSpeech();
    state.armed = true;
    els.armedToggle.checked = true;
    state.awaitingStart = true;
    state.laps = [];
    state.stintSaved = false;
    renderLaps();
    updateBest();
    els.lastLap.textContent = '--';
    state.raceStart = 0;
    state.currentLapStart = 0;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.machineEnterAt = 0;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    state.directionToastUntil = 0;
    state.maxChangedSeen = 0;
    state.lastTrigger = 0;
    // After a finished stint the drone is still in the gate: require it to clear
    // once before the next crossing may start the following set.
    state.needsClear = !!requireClear;
    setStatus(t('waiting_first'));
  }

  // Start the race at a given timestamp (used by auto-start on first crossing).
  function beginRaceAt(t) {
    beginRace(t);
  }

  function beginRace(startAt) {
    state.countdownActive = false;
    state.raceActive = true;
    state.awaitingStart = false;
    state.raceStart = (typeof startAt === 'number') ? startAt : performance.now();
    state.currentLapStart = state.raceStart;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 1;
    state.machineEnterAt = state.raceStart;
    state.needsClear = true;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    state.directionToastUntil = 0;
    state.maxChangedSeen = 0;
    state.lastTrigger = state.raceStart;
    state.goFlashUntil = performance.now() + 800;
    soundGo();
    if (state.announceMode !== 'aus') speak(t('go'));
    setStatus(t('race_running'));
  }

  function stopRace() {
    if (state.countdownActive) {
      state.countdownActive = false;
      setStatus(t('countdown_cancelled'));
      return;
    }
    if (state.awaitingStart) {
      state.awaitingStart = false;
      setStatus(t('race_stopped'));
      return;
    }
    if (!state.raceActive) return;
    const now = performance.now();
    state.raceElapsed = now - state.raceStart;
    state.frozenLap = now - state.currentLapStart;
    state.raceActive = false;
    soundStop();
    const set = saveStint();
    if (state.autoStart) {
      armAutoWait(true);
      setStatus((set ? (t('set_done') + ' · ' + t('set_word') + ' ' + set.n) : t('race_stopped')) + ' · ' + t('waiting_first'));
    } else {
      setStatus(t('race_stopped'));
      if (state.announceMode !== 'aus') speak(t('stop_total') + secondsToSpeech(state.raceElapsed));
    }
  }

  // Automatically end a stint when the configured lap count is reached.
  function finishAutoStint() {
    const now = performance.now();
    state.raceElapsed = state.laps.length ? state.laps[state.laps.length - 1].total : (now - state.raceStart);
    state.frozenLap = state.laps.length ? state.laps[state.laps.length - 1].duration : (now - state.currentLapStart);
    state.raceActive = false;
    const set = saveStint();
    soundStop();
    if (state.announceMode !== 'aus') speak(t('set_end') + secondsToSpeech(state.raceElapsed));
    if (state.autoStart) {
      armAutoWait(true);
      setStatus(t('set_done') + (set ? (' · ' + t('set_word') + ' ' + set.n) : '') + ' · ' + t('waiting_first'));
    } else {
      setStatus(t('set_done') + (set ? (' · ' + t('set_word') + ' ' + set.n) : ''));
    }
  }

  // Store the current laps as a completed set for later comparison.
  // Set numbers are per pilot: every pilot can have their own "Set 1", "Set 2", …
  function nextSetNumber(pilot) {
    const p = pilot || '';
    let max = 0;
    state.sets.forEach(s => {
      if ((s.pilot || '') === p) max = Math.max(max, s.n || 0);
    });
    return max + 1;
  }
  function saveStint() {
    if (!state.laps.length) return null;
    if (state.stintSaved) return null;
    const laps = state.laps.map(l => ({ idx: l.idx, duration: l.duration, total: l.total, pilot: l.pilot || '' }));
    const pilot = state.currentPilot || '';
    const set = {
      n: nextSetNumber(pilot),
      at: Date.now(),
      pilot,
      laps,
      totalMs: laps[laps.length - 1].total,
      bestMs: Math.min(...laps.map(l => l.duration)),
    };
    state.sets.push(set);
    saveSets();
    renderSets();
    state.stintSaved = true;
    return set;
  }

  function updateCountdown(now) {
    if (!state.countdownActive) return;
    const remaining = state.countdownEnd - now;
    if (remaining <= 0) { beginRace(); return; }
    const value = Math.ceil(remaining / 1000);
    if (value !== state.lastCountdownValue) {
      state.lastCountdownValue = value;
      soundCountdownTick();
    }
  }

  els.btnRaceStart.addEventListener('click', startCountdown);
  els.btnRaceStop.addEventListener('click', stopRace);
  els.btnReset.addEventListener('click', () => {
    // Save the current stint first so nothing is lost when resetting.
    if (state.laps.length) saveStint();
    state.raceActive = false;
    state.countdownActive = false;
    state.awaitingStart = false;
    state.laps = [];
    state.stintSaved = false;
    state.raceStart = 0;
    state.currentLapStart = 0;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.machineEnterAt = 0;
    state.needsClear = false;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    state.goFlashUntil = 0;
    state.maxChangedSeen = 0;
    renderLaps();
    updateBest();
    els.raceTime.textContent = '00:00.000';
    els.currentLap.textContent = '00:00.000';
    els.lastLap.textContent = '--';
    setStatus(t('reset_done'));
  });
  els.armedToggle.addEventListener('change', e => {
    state.armed = e.target.checked;
    state.machine = 0;
    state.machineEnterAt = 0;
    state.needsClear = false;
    state.pendingLap = null;
    state.wrongFlashUntil = 0;
    state.directionToastUntil = 0;
    state.maxChangedSeen = 0;
    saveSettings();
  });

  function updateTimers() {
    const now = performance.now();
    let mainTime, lapTime;
    if (state.countdownActive) {
      mainTime = fmt(Math.max(0, state.countdownEnd - now));
      lapTime = '00:00.000';
    } else if (state.raceActive) {
      mainTime = fmt(now - state.raceStart);
      lapTime = fmt(now - state.currentLapStart);
      if (state.laps.length) els.lastLap.textContent = fmt(state.laps[state.laps.length-1].duration);
    } else {
      // stopped / frozen
      mainTime = fmt(state.raceElapsed);
      lapTime = fmt(state.frozenLap);
    }
    els.raceTime.textContent = mainTime;
    els.currentLap.textContent = lapTime;
    if (els.timerSummary) els.timerSummary.textContent = mainTime;
  }

  function renderLaps() {
    els.lapTable.innerHTML = '';
    let prevTotal = 0;
    state.laps.forEach((l, i) => {
      const tr = document.createElement('tr');
      if (i === state.laps.length - 1) tr.style.background = 'rgba(255,122,26,0.12)';
      const lapDelta = i > 0 ? l.duration : l.duration;
      tr.innerHTML = `<td>${l.idx}</td><td>${esc(l.pilot || '-')}</td><td>${fmt(l.duration)}</td><td>${fmt(l.total)}</td><td>${i>0 ? fmt(l.total - (state.laps[i-1]?.total || 0)) : '-'}</td>`;
      els.lapTable.appendChild(tr);
    });
    // fix between column: distance between lap totals
  }

  function updateBest() {
    if (!state.laps.length) { els.bestLap.textContent = '--'; return; }
    const best = state.laps.reduce((a,b) => a.duration < b.duration ? a : b);
    els.bestLap.textContent = fmt(best.duration);
  }

  // ---------- sets (stints) ----------
  function timeLabel(ts) {
    try {
      const d = new Date(ts);
      const p = n => String(n).padStart(2, '0');
      return `${p(d.getHours())}:${p(d.getMinutes())}`;
    } catch { return ''; }
  }
  function downloadCsv(filename, rows) {
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function setCsvRows(set) {
    const rows = [['set', 'pilot', 'index', 'lap_ms', 'total_ms']];
    set.laps.forEach(l => rows.push([set.n, l.pilot || '', l.idx, Math.round(l.duration), Math.round(l.total)]));
    return rows;
  }
  // ---------- sets: filtering & pilot comparison ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fileSafe(s) {
    const cleaned = String(s == null ? '' : s)
      .replace(/[^\p{L}\p{N}_-]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);
    return cleaned || 'pilot';
  }
  function pilotLabel(p) { return p ? p : t('no_pilot'); }
  function pilotValues() {
    const names = [];
    const add = p => { const v = p || ''; if (!names.includes(v)) names.push(v); };
    state.sets.forEach(s => add(s.pilot));
    (state.pilots || []).forEach(add);
    names.sort((a, b) => pilotLabel(a).localeCompare(pilotLabel(b)));
    return names;
  }
  function filteredSets() {
    return state.setFilter ? state.sets.filter(s => (s.pilot || '') === state.setFilter) : state.sets;
  }
  function renderSetFilter() {
    if (!els.setPilotFilter) return;
    const names = pilotValues();
    if (state.setFilter && !names.includes(state.setFilter)) { state.setFilter = ''; saveSettings(); }
    const cur = state.setFilter || '';
    els.setPilotFilter.innerHTML = '';
    const all = document.createElement('option');
    all.value = '';
    all.textContent = t('all_pilots');
    els.setPilotFilter.appendChild(all);
    names.forEach(p => {
      const o = document.createElement('option');
      o.value = p;
      o.textContent = pilotLabel(p);
      els.setPilotFilter.appendChild(o);
    });
    els.setPilotFilter.value = cur;
    if (els.btnExportAll) els.btnExportAll.textContent = state.setFilter ? t('export_filtered') : t('export_all');
  }
  // Shared builder so the sets card and the dedicated Piloten screen show the
  // exact same comparison. Returns '' when fewer than two pilots have sets.
  function pilotCompareHTML() {
    const groups = new Map();
    state.sets.forEach(s => {
      const p = s.pilot || '';
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p).push(s);
    });
    if (groups.size < 2) return '';
    const rows = [...groups.entries()].map(([p, sets]) => {
      const laps = [];
      sets.forEach(s => s.laps.forEach(l => laps.push(l.duration)));
      return {
        p,
        count: sets.length,
        laps: laps.length,
        best: Math.min(...sets.map(s => s.bestMs)),
        avg: laps.length ? laps.reduce((a, d) => a + d, 0) / laps.length : 0,
        total: laps.reduce((a, d) => a + d, 0),
      };
    });
    const bestOverall = Math.min(...rows.map(r => r.best));
    rows.sort((a, b) => a.best - b.best);
    const head =
      `<tr><th>${t('th_pilot')}</th><th>${t('th_sets')}</th><th>${t('set_laps_word')}</th>` +
      `<th>${t('set_best_word')}</th><th>${t('avg_word')}</th><th>${t('th_total')}</th></tr>`;
    const body = rows.map(r =>
      `<tr><td><i class="dot" style="background:${pilotColor(r.p)}"></i>${esc(pilotLabel(r.p))}</td>` +
      `<td class="num">${r.count}</td><td class="num">${r.laps}</td>` +
      `<td class="num${r.best === bestOverall ? ' win' : ''}">${fmt(r.best)}</td>` +
      `<td class="num">${fmt(r.avg)}</td><td class="num">${fmt(r.total)}</td></tr>`
    ).join('');
    return `<h4>${t('pilot_compare_title')}</h4>` +
      `<table class="compare-table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
  }
  function renderPilotCompare() {
    const html = pilotCompareHTML();
    if (els.pilotCompare) els.pilotCompare.innerHTML = html;
    if (els.pilotsScreenCompare) els.pilotsScreenCompare.innerHTML = html;
  }

  function renderSets() {
    if (!els.setsList) return;
    renderSetFilter();
    renderPilotCompare();
    const sets = filteredSets();
    els.setsList.innerHTML = '';
    if (!sets.length) {
      const p = document.createElement('div');
      p.className = 'set-empty';
      p.textContent = state.sets.length ? t('no_sets_for_pilot') : t('no_sets');
      els.setsList.appendChild(p);
      renderChart(sets);
      return;
    }
    // newest first
    sets.slice().reverse().forEach(set => {
      const item = document.createElement('div');
      item.className = 'set-item';
      const head = document.createElement('div');
      head.className = 'set-summary';
      const avg = set.laps.length ? (set.laps.reduce((a,l) => a + l.duration, 0) / set.laps.length) : 0;
      head.innerHTML =
        `<span class="set-name">${t('set_word')} ${set.n}</span>` +
        `<span class="set-meta">` +
          `<span><i class="dot" style="background:${pilotColor(set.pilot)}"></i>${esc(pilotLabel(set.pilot))}</span>` +
          `<span>${timeLabel(set.at)}</span>` +
          `<span><b>${set.laps.length}</b> ${t('set_laps_word')}</span>` +
          `<span>${t('set_best_word')} <b>${fmt(set.bestMs)}</b></span>` +
          `<span>${t('avg_word')} <b>${fmt(avg)}</b></span>` +
          `<span>${t('th_total')} <b>${fmt(set.totalMs)}</b></span>` +
        `</span>`;
      const actions = document.createElement('span');
      actions.className = 'set-actions';
      const exp = document.createElement('button');
      exp.className = 'set-exp';
      exp.type = 'button';
      exp.textContent = '⬇';
      exp.title = t('export_set');
      exp.addEventListener('click', ev => {
        ev.stopPropagation();
        downloadCsv('fpv-set-' + fileSafe(pilotLabel(set.pilot)) + '-' + set.n + '.csv', setCsvRows(set));
      });
      const del = document.createElement('button');
      del.className = 'set-del';
      del.type = 'button';
      del.textContent = '🗑';
      del.title = t('delete_word');
      del.addEventListener('click', ev => {
        ev.stopPropagation();
        state.sets = state.sets.filter(s => s !== set);
        saveSets();
        renderSets();
      });
      const arrow = document.createElement('span');
      arrow.className = 'set-arrow';
      arrow.textContent = '▸';
      actions.appendChild(exp);
      actions.appendChild(del);
      actions.appendChild(arrow);
      head.appendChild(actions);
      const lapsBox = document.createElement('div');
      lapsBox.className = 'set-laps';
      lapsBox.hidden = true;
      const table = document.createElement('table');
      const bestDur = set.bestMs;
      table.innerHTML =
        `<thead><tr><th>${t('th_index')}</th><th>${t('th_lap')}</th><th>${t('th_total')}</th></tr></thead>` +
        `<tbody>${set.laps.map(l =>
          `<tr class="${l.duration === bestDur ? 'set-best-row' : ''}"><td>${l.idx}</td><td>${fmt(l.duration)}</td><td>${fmt(l.total)}</td></tr>`
        ).join('')}</tbody>`;
      lapsBox.appendChild(table);
      head.addEventListener('click', () => {
        lapsBox.hidden = !lapsBox.hidden;
        head.querySelector('.set-arrow').textContent = lapsBox.hidden ? '▸' : '▾';
      });
      item.appendChild(head);
      item.appendChild(lapsBox);
      els.setsList.appendChild(item);
    });
    renderChart(sets);
  }
  if (els.setPilotFilter) {
    els.setPilotFilter.addEventListener('change', e => {
      state.setFilter = e.target.value || '';
      saveSettings();
      renderSets();
    });
  }

  // ---------- comparison chart: lap times of all sets ----------
  const CHART_COLORS = ['#ff7a1a', '#20c4c4', '#4ade80', '#ffd23c', '#ff4d8d', '#a78bfa', '#60a5fa', '#fb923c'];
  function fmtSec(ms) {
    return (ms / 1000).toFixed(2).replace('.', t('decimal_sep'));
  }
  function renderChart(list) {
    const cv = els.setsChart;
    if (!cv) return;
    const sets = Array.isArray(list) ? list : state.sets;
    if (els.chartBlock) els.chartBlock.style.display = sets.length ? '' : 'none';
    const titleEl = els.chartBlock ? els.chartBlock.querySelector('.chart-title') : null;
    if (titleEl) titleEl.textContent = sets.length > 8 ? t('chart_last8') : t('chart_title');
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(120, Math.round(cv.clientWidth || cv.getBoundingClientRect().width || 300));
    const cssH = Math.max(100, Math.round(cv.clientHeight || cv.getBoundingClientRect().height || 190));
    if (cv.width !== Math.round(cssW * dpr)) cv.width = Math.round(cssW * dpr);
    if (cv.height !== Math.round(cssH * dpr)) cv.height = Math.round(cssH * dpr);
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    if (!sets.length) return;

    const shown = sets.slice(-8);
    const multiPilot = new Set(shown.map(s => s.pilot || '')).size > 1;
    const maxLaps = Math.max(1, ...shown.map(s => s.laps.length));
    let minMs = Infinity, maxMs = -Infinity;
    shown.forEach(s => s.laps.forEach(l => {
      if (l.duration < minMs) minMs = l.duration;
      if (l.duration > maxMs) maxMs = l.duration;
    }));
    if (!isFinite(minMs)) return;
    if (maxMs - minMs < 500) {
      const pad = (500 - (maxMs - minMs)) / 2;
      minMs -= pad; maxMs += pad;
    }
    const span = maxMs - minMs;
    const padTop = 16, padBottom = 20, padLeft = 52, padRight = multiPilot ? 96 : 60;
    const plotW = Math.max(30, cssW - padLeft - padRight);
    const plotH = Math.max(30, cssH - padTop - padBottom);
    const X = i => padLeft + (maxLaps <= 1 ? plotW / 2 : ((i - 1) / (maxLaps - 1)) * plotW);
    const Y = ms => padTop + (1 - (ms - minMs) / span) * plotH;

    // horizontal grid + y labels (seconds)
    ctx.lineWidth = 1;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let k = 0; k <= 2; k++) {
      const ms = minMs + (span * k) / 2;
      const y = Math.round(Y(ms)) + 0.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.beginPath(); ctx.moveTo(padLeft, y); ctx.lineTo(padLeft + plotW, y); ctx.stroke();
      ctx.fillStyle = '#9aa7b4';
      ctx.fillText(fmtSec(ms), padLeft - 6, y);
    }
    // x labels (lap index)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#9aa7b4';
    const step = Math.max(1, Math.ceil(maxLaps / 8));
    for (let i = 1; i <= maxLaps; i++) {
      if (i !== 1 && i !== maxLaps && i % step !== 0) continue;
      ctx.fillText(String(i), X(i), padTop + plotH + 5);
    }

    // overall best lap as dashed reference line
    const overallBest = Math.min(...shown.map(s => s.bestMs));
    const bestY = Math.round(Y(overallBest)) + 0.5;
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(74,222,128,0.7)';
    ctx.beginPath(); ctx.moveTo(padLeft, bestY); ctx.lineTo(padLeft + plotW, bestY); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#4ade80';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(t('set_best_word') + ' ' + fmtSec(overallBest), padLeft + plotW - 2, bestY - 3);

    // one line per set — colour by pilot when comparing several pilots
    const pilotSeen = {};
    const pilotTotal = {};
    shown.forEach(s => { const k = s.pilot || ''; pilotTotal[k] = (pilotTotal[k] || 0) + 1; });
    shown.forEach((s, si) => {
      const key = s.pilot || '';
      const color = multiPilot ? pilotColor(key) : CHART_COLORS[si % CHART_COLORS.length];
      pilotSeen[key] = (pilotSeen[key] || 0) + 1;
      const dashed = multiPilot && pilotTotal[key] > 1 && pilotSeen[key] > 1;
      if (s.laps.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(dashed ? [6, 4] : []);
        ctx.beginPath();
        s.laps.forEach((l, i) => {
          const x = X(l.idx), y = Y(l.duration);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      }
      s.laps.forEach(l => {
        const isBest = l.duration === s.bestMs;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(X(l.idx), Y(l.duration), isBest ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        if (isBest) { ctx.strokeStyle = '#0b0f14'; ctx.lineWidth = 1.5; ctx.stroke(); }
      });
      const last = s.laps[s.laps.length - 1];
      ctx.fillStyle = color;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const label = (multiPilot && s.pilot ? s.pilot + ' ' : '') + t('set_word') + ' ' + s.n;
      ctx.fillText(label, X(last.idx) + 6, Y(last.duration));
    });
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // legend (only meaningful when several pilots share the chart)
    if (els.chartLegend) {
      if (multiPilot) {
        const names = [...new Set(shown.map(s => s.pilot || ''))];
        els.chartLegend.innerHTML = names.map(p =>
          `<span class="legend-item"><i style="background:${pilotColor(p)}"></i>${esc(pilotLabel(p))}</span>`
        ).join('');
      } else {
        els.chartLegend.innerHTML = '';
      }
    }
  }

  if (els.btnClearSets) {
    els.btnClearSets.addEventListener('click', () => {
      if (!state.sets.length) return;
      if (!confirm(t('confirm_clear_sets'))) return;
      state.sets = [];
      saveSets();
      renderSets();
    });
  }
  if (els.btnExportAll) {
    els.btnExportAll.addEventListener('click', () => {
      const sets = filteredSets();
      if (!sets.length) return;
      const rows = [['set', 'pilot', 'index', 'lap_ms', 'total_ms']];
      sets.forEach(s => s.laps.forEach(l => rows.push([s.n, s.pilot || '', l.idx, Math.round(l.duration), Math.round(l.total)])));
      const suffix = state.setFilter ? '-' + fileSafe(pilotLabel(state.setFilter)) : '';
      downloadCsv('fpv-sets' + suffix + '.csv', rows);
    });
  }

  // ---------- pilots ----------
  const PILOT_PALETTE = ['#20c4c4', '#ff7a1a', '#4ade80', '#60a5fa', '#a78bfa', '#ff4d8d', '#ffd23c', '#fb923c'];
  function pilotColor(p) {
    const key = p || '';
    if (state.pilotColors && state.pilotColors[key]) return state.pilotColors[key];
    return key === '' ? '#9aa7b4' : '#ff7a1a';
  }
  function nextPilotColor() {
    const used = state.pilots.map(p => state.pilotColors[p]);
    for (const c of PILOT_PALETTE) if (!used.includes(c)) return c;
    return PILOT_PALETTE[state.pilots.length % PILOT_PALETTE.length];
  }
  function ensurePilotColorInput() {
    if (!els.pilotColor) return;
    const name = els.pilotName ? els.pilotName.value.trim() : '';
    if (name && state.pilots.includes(name)) {
      const col = state.pilotColors[name] || pilotColor(name);
      els.pilotColor.value = col;
      state.pilotColors[name] = col;
      els.pilotColor.hidden = false;
    } else if (name) {
      els.pilotColor.value = nextPilotColor();
      els.pilotColor.hidden = false;
    } else {
      els.pilotColor.hidden = true;
    }
  }
  function renderPilots() {
    ensurePilotColorInput();
    els.pilots.innerHTML = '';
    state.pilots.forEach(name => {
      const chip = document.createElement('div');
      const active = state.currentPilot === name;
      const col = pilotColor(name);
      chip.className = 'pilot-chip' + (active ? ' active' : '');
      chip.textContent = name;
      chip.style.borderColor = col;
      chip.style.color = active ? '#0b0f14' : col;
      if (active) chip.style.background = col;
      chip.addEventListener('click', () => { state.currentPilot = name; if (els.pilotName) els.pilotName.value = name; ensurePilotColorInput(); renderPilots(); saveSettings(); });
      els.pilots.appendChild(chip);
    });
    renderPilotsScreen();
    renderSets();
  }

  // Dedicated "Piloten" screen: full profile workflow (name + colour, select,
  // delete) with the comparison table and a CSV export.
  function renderPilotsScreen() {
    if (!els.pilotsScreenList) return;
    els.pilotsScreenList.innerHTML = '';
    if (!state.pilots.length) {
      const empty = document.createElement('div');
      empty.className = 'set-empty';
      empty.textContent = t('pilot_screen_empty');
      els.pilotsScreenList.appendChild(empty);
    }
    state.pilots.forEach(name => {
      const chip = document.createElement('div');
      const active = state.currentPilot === name;
      const col = pilotColor(name);
      chip.className = 'pilot-chip' + (active ? ' active' : '');
      chip.textContent = name;
      chip.style.borderColor = col;
      chip.style.color = active ? '#0b0f14' : col;
      if (active) chip.style.background = col;
      chip.title = t('pilots_active_hint');
      chip.addEventListener('click', () => {
        state.currentPilot = name;
        if (els.pilotName) els.pilotName.value = name;
        if (els.pilotScreenName) els.pilotScreenName.value = name;
        ensurePilotColorInput();
        renderPilots();
        saveSettings();
      });
      const rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'pilot-remove';
      rm.textContent = '✕';
      rm.title = t('pilot_delete');
      rm.setAttribute('aria-label', t('pilot_delete') + ': ' + name);
      rm.addEventListener('click', e => { e.stopPropagation(); removePilot(name); });
      chip.appendChild(rm);
      els.pilotsScreenList.appendChild(chip);
    });
    if (els.pilotScreenColor) els.pilotScreenColor.value = nextPilotColor();
  }

  function addPilot(name, color) {
    name = (name || '').trim();
    if (!name) return false;
    if (!state.pilots.includes(name)) state.pilots.push(name);
    if (color) state.pilotColors[name] = color;
    state.currentPilot = name;
    renderPilots();
    saveSettings();
    return true;
  }
  function removePilot(name) {
    const idx = state.pilots.indexOf(name);
    if (idx === -1) return;
    state.pilots.splice(idx, 1);
    if (state.pilotColors) delete state.pilotColors[name];
    if (state.currentPilot === name) state.currentPilot = state.pilots[0] || null;
    renderPilots();
    saveSettings();
  }

  function openPilots() {
    if (!els.pilotsScreen) return;
    if (els.homeScreen) els.homeScreen.hidden = true;
    if (els.kwadScreen) els.kwadScreen.hidden = true;
    els.pilotsScreen.hidden = false;
    if (els.btnHome) els.btnHome.hidden = false;
    // The topbar gear is the app-settings gear for the home screen only.
    if (els.btnSettings) els.btnSettings.hidden = true;
    renderPilotsScreen();
    els.pilotsScreen.scrollTop = 0;
  }
  if (els.tilePilots) els.tilePilots.addEventListener('click', openPilots);
  if (els.pilotName) {
    els.pilotName.addEventListener('input', () => {
      ensurePilotColorInput();
    });
  }
  els.btnAddPilot.addEventListener('click', () => {
    const ok = addPilot(els.pilotName.value, els.pilotColor ? els.pilotColor.value : null);
    if (!ok) return;
    els.pilotName.value = '';
    if (els.pilotColor) els.pilotColor.hidden = true;
  });
  if (els.btnPilotScreenAdd) {
    els.btnPilotScreenAdd.addEventListener('click', () => {
      addPilot(els.pilotScreenName.value, els.pilotScreenColor ? els.pilotScreenColor.value : null);
      if (els.pilotScreenName) els.pilotScreenName.value = '';
    });
  }
  if (els.pilotScreenName) {
    els.pilotScreenName.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); if (els.btnPilotScreenAdd) els.btnPilotScreenAdd.click(); }
    });
  }
  if (els.btnPilotExport) {
    els.btnPilotExport.addEventListener('click', () => {
      const rows = [['pilot', 'colour', 'sets', 'laps', 'best_ms', 'avg_ms', 'total_ms']];
      state.pilots.forEach(name => {
        const sets = state.sets.filter(s => (s.pilot || '') === name);
        const laps = [];
        sets.forEach(s => s.laps.forEach(l => laps.push(l.duration)));
        rows.push([
          name, pilotColor(name), sets.length, laps.length,
          laps.length ? Math.round(Math.min(...laps)) : '',
          laps.length ? Math.round(laps.reduce((a, d) => a + d, 0) / laps.length) : '',
          laps.length ? Math.round(laps.reduce((a, d) => a + d, 0)) : '',
        ]);
      });
      if (rows.length === 1) return;
      downloadCsv('fpv-pilots.csv', rows);
    });
  }

  // ---------- export ----------
  els.btnExport.addEventListener('click', () => {
    if (!state.laps.length) return;
    const rows = [['index','pilot','lap_ms','total_ms']];
    state.laps.forEach(l => rows.push([l.idx, l.pilot || '', Math.round(l.duration), Math.round(l.total)]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'fpv-laps.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // ---------- overlay drawing ----------
  function drawOverlay() {
    const w = els.overlay.width, h = els.overlay.height;
    if (!w || !h) return;
    const v = currentView() || { dx: 0, dy: 0, sx: w / state.procW, sy: h / state.procH };
    const X = x => v.dx + x * v.sx;
    const Y = y => v.dy + y * v.sy;
    const r = state.roi;

    if (r) {
      // ROI hint fill
      overlayCtx.fillStyle = 'rgba(255,122,26,0.10)';
      overlayCtx.fillRect(X(r.x), Y(r.y), r.w * v.sx, r.h * v.sy);
    }

    // Motion mask (where pixels differ from the background)
    const box = state.motionBox;
    if (state.showMotion && r && box && box.changed > 0 && maskImage) {
      maskCtx.putImageData(maskImage, 0, 0);
      overlayCtx.imageSmoothingEnabled = false;
      overlayCtx.drawImage(
        maskCanvas,
        Math.floor(r.x), Math.floor(r.y), Math.ceil(r.w), Math.ceil(r.h),
        X(Math.floor(r.x)), Y(Math.floor(r.y)),
        Math.ceil(r.w) * v.sx, Math.ceil(r.h) * v.sy
      );
      overlayCtx.imageSmoothingEnabled = true;

      // Bounding box of detected motion
      overlayCtx.strokeStyle = '#00ff88';
      overlayCtx.lineWidth = 2;
      overlayCtx.setLineDash([6, 4]);
      overlayCtx.strokeRect(X(box.minX), Y(box.minY), (box.maxX - box.minX + 1) * v.sx, (box.maxY - box.minY + 1) * v.sy);
      overlayCtx.setLineDash([]);

      // Centroid marker
      overlayCtx.fillStyle = '#00ff88';
      overlayCtx.beginPath();
      overlayCtx.arc(X(box.cx), Y(box.cy), 5, 0, Math.PI * 2);
      overlayCtx.fill();
      overlayCtx.strokeStyle = '#003322';
      overlayCtx.lineWidth = 1.5;
      overlayCtx.stroke();
    }

    if (r) {
      // ROI border on top
      overlayCtx.strokeStyle = '#ff7a1a';
      overlayCtx.lineWidth = 2;
      overlayCtx.strokeRect(X(r.x), Y(r.y), r.w * v.sx, r.h * v.sy);
    }

    const nowp = performance.now();

    // Expected direction arrow drawn in the ROI center
    if (r && state.direction && state.direction !== 'aus') {
      const cx = X(r.x + r.w / 2);
      const cy = Y(r.y + r.h / 2);
      const size = Math.max(22, Math.min(r.h * v.sy, r.w * v.sx) * 0.5);
      overlayCtx.save();
      overlayCtx.globalAlpha = 0.8;
      overlayCtx.fillStyle = '#ffd23c';
      overlayCtx.strokeStyle = 'rgba(0,0,0,0.55)';
      overlayCtx.lineWidth = 4;
      overlayCtx.font = 'bold ' + Math.round(size) + 'px sans-serif';
      overlayCtx.textAlign = 'center';
      overlayCtx.textBaseline = 'middle';
      overlayCtx.strokeText(DIRECTION_LABEL[state.direction], cx, cy);
      overlayCtx.fillText(DIRECTION_LABEL[state.direction], cx, cy);
      overlayCtx.restore();
    }

    // Wrong-direction flash
    if (r && state.wrongFlashUntil && nowp < state.wrongFlashUntil) {
      overlayCtx.fillStyle = 'rgba(255,60,60,0.30)';
      overlayCtx.fillRect(X(r.x), Y(r.y), r.w * v.sx, r.h * v.sy);
      overlayCtx.strokeStyle = '#ff3c3c';
      overlayCtx.lineWidth = 4;
      overlayCtx.strokeRect(X(r.x), Y(r.y), r.w * v.sx, r.h * v.sy);
    }

    // Direction-change toast (short feedback when tapping the direction button)
    if (state.directionToastUntil && nowp < state.directionToastUntil) {
      const label = (DIRECTION_LABEL[state.direction] || '') + '  ' + dirText(state.direction);
      overlayCtx.save();
      overlayCtx.font = 'bold ' + Math.round(h * 0.075) + 'px sans-serif';
      overlayCtx.textAlign = 'center';
      overlayCtx.textBaseline = 'middle';
      const tw = overlayCtx.measureText(label).width;
      const boxW = tw + 32;
      const boxH = h * 0.13;
      overlayCtx.fillStyle = 'rgba(0,0,0,0.7)';
      overlayCtx.fillRect((w - boxW) / 2, h * 0.06, boxW, boxH);
      overlayCtx.fillStyle = '#ffd23c';
      overlayCtx.fillText(label, w / 2, h * 0.06 + boxH / 2);
      overlayCtx.restore();
    }

    // Countdown / GO overlay
    if (state.countdownActive) {
      const remaining = Math.max(0, state.countdownEnd - nowp);
      const num = Math.ceil(remaining / 1000);
      overlayCtx.fillStyle = 'rgba(0,0,0,0.35)';
      overlayCtx.fillRect(0, 0, w, h);
      overlayCtx.fillStyle = '#ff7a1a';
      overlayCtx.textAlign = 'center';
      overlayCtx.textBaseline = 'middle';
      overlayCtx.font = 'bold ' + Math.round(h * 0.38) + 'px sans-serif';
      overlayCtx.fillText(String(num), w / 2, h / 2);
      overlayCtx.textAlign = 'left';
      overlayCtx.textBaseline = 'alphabetic';
    } else if (state.goFlashUntil && nowp < state.goFlashUntil) {
      overlayCtx.fillStyle = '#4ade80';
      overlayCtx.textAlign = 'center';
      overlayCtx.textBaseline = 'middle';
      overlayCtx.font = 'bold ' + Math.round(h * 0.32) + 'px sans-serif';
      overlayCtx.fillText('GO!', w / 2, h / 2);
      overlayCtx.textAlign = 'left';
      overlayCtx.textBaseline = 'alphabetic';
    }

    // Auto-start: show that we are waiting for the first crossing
    if (state.awaitingStart && !state.countdownActive) {
      const label = t('overlay_waiting');
      overlayCtx.save();
      overlayCtx.font = 'bold ' + Math.round(h * 0.062) + 'px sans-serif';
      overlayCtx.textAlign = 'center';
      overlayCtx.textBaseline = 'middle';
      const tw = overlayCtx.measureText(label).width;
      const boxW = tw + 36;
      const boxH = h * 0.12;
      overlayCtx.fillStyle = 'rgba(0,0,0,0.72)';
      overlayCtx.fillRect((w - boxW) / 2, h - boxH - 12, boxW, boxH);
      overlayCtx.fillStyle = '#ffd23c';
      overlayCtx.fillText(label, w / 2, h - boxH / 2 - 12);
      overlayCtx.restore();
      overlayCtx.textAlign = 'left';
      overlayCtx.textBaseline = 'alphabetic';
    }
  }

  // ---------- Game of K.W.A.D (local party mode) ----------
  // Game of SKATE for FPV freestyle: a random trick is called out and the group
  // judges it. Whoever cannot fly it collects one penalty letter (K → W → A → D);
  // the first pilot holding all four letters loses. Deliberately local and manual —
  // no server, no camera. Players live in their own storage key (`kwad_players`),
  // so a problem in the game can never touch the timer settings or the lap sets.
  const KWAD_LETTERS = 'KWAD';

  // --- Trick Categories with difficulty (1-5), descriptions, and default enabled state ---
  // `check` is the Prüfart: 'free' (Freiflug), 'gate' (Tor/Gate), 'obstacle' (Hindernis).
  // A trick marked 'obstacle' makes the game ask the group who picks the obstacle.
  const KWAD_CATEGORIES = {
    basics: {
      id: 'basics',
      label: 'Basics',
      emoji: '🟢',
      difficulty: 1,
      enabled: true,
      tricks: [
        { name: 'Dive', desc: 'Steiler Sturzflug durch das Gap, dann Pull-up', check: 'gate' },
        { name: 'Gap Roll', desc: 'Eine Rolle (Roll) genau im Gap', check: 'gate' },
        { name: 'Straight Pass', desc: 'Sauberer Geradeaus-Flug durch das Gap', check: 'gate' },
        { name: 'Level Pass', desc: 'Höhe halten, ohne zu steigen oder zu fallen', check: 'free' },
      ]
    },
    intermediate: {
      id: 'intermediate',
      label: 'Intermediate',
      emoji: '🟡',
      difficulty: 2,
      enabled: true,
      tricks: [
        { name: 'Power Loop', desc: 'Looping über das Tor (Rückwärts-Loop)', check: 'gate' },
        { name: 'Split-S', desc: 'Halber Loop nach unten, dann halber Roll', check: 'free' },
        { name: 'Orbit', desc: 'Kreisfahrt um ein Hindernis (Flagge, Tor, Baum)', check: 'obstacle' },
        { name: 'Yaw Spin', desc: 'Schnelle 360°-Drehung um die Yaw-Achse', check: 'free' },
        { name: 'Wall Scrape', desc: 'Nah an einem Hindernis entlangschrappen (Wand, Tor, Boden)', check: 'obstacle' },
        { name: 'Corkscrew', desc: 'Kombination aus Loop und Roll (Korkenzieher)', check: 'free' },
      ]
    },
    advanced: {
      id: 'advanced',
      label: 'Advanced',
      emoji: '🟠',
      difficulty: 3,
      enabled: true,
      tricks: [
        { name: 'Matty Flip', desc: 'Rückwärts-Flip mit 180° Yaw (Matty Stuntz Style)', check: 'free' },
        { name: 'Juicy Flick', desc: 'Schneller Pitch + Roll + Yaw Combo (Freestyle-Klassiker)', check: 'free' },
        { name: 'Trippy Spin', desc: 'Mehrfache Rotation um mehrere Achsen gleichzeitig', check: 'free' },
        { name: 'Inverted Pass', desc: 'Auf dem Rücken (inverted) durch das Tor', check: 'gate' },
        { name: 'Backwards Pass', desc: 'Rückwärts durch das Tor fliegen', check: 'gate' },
        { name: 'Knife Edge', desc: 'Auf der Seite (90° Roll) durch das Tor', check: 'gate' },
      ]
    },
    pro: {
      id: 'pro',
      label: 'Pro',
      emoji: '🔴',
      difficulty: 4,
      enabled: false,
      tricks: [
        { name: 'Rubik\'s Cube', desc: '3 Achsen nacheinander: Roll → Pitch → Yaw', check: 'free' },
        { name: 'Double Backflip', desc: 'Zwei Rückwärts-Loops direkt hintereinander', check: 'free' },
        { name: 'Fakie Flip', desc: 'Rückwärts-Flip aus inverted Position', check: 'free' },
        { name: 'Tornado', desc: 'Schneller Yaw-Spin während Loop/Roll', check: 'free' },
        { name: 'Alien', desc: 'Inverted Yaw-Spin mit Pitch-Variation', check: 'free' },
      ]
    },
    custom: {
      id: 'custom',
      label: 'Eigene Tricks',
      emoji: '⭐',
      difficulty: 0,
      enabled: true,
      tricks: [] // user-defined tricks stored in localStorage
    }
  };

  // Prüfart of a trick ('free' when an old/custom entry does not carry one yet).
  function kwadCheck(trick) {
    const c = trick && trick.check;
    return (c === 'gate' || c === 'obstacle') ? c : 'free';
  }

  // Build flat trick list from enabled categories (used for drawing)
  function kwadBuildTrickPool() {
    const pool = [];
    Object.values(KWAD_CATEGORIES).forEach(cat => {
      if (cat.enabled && cat.tricks.length) {
        cat.tricks.forEach(t => pool.push({ ...t, category: cat.id }));
      }
    });
    return pool;
  }

  let kwadTrickPool = []; // current active pool (built from enabled categories)
  let kwadPlayers = [];   // [{ name, letters, color }] — persisted in `kwad_players`
  let kwadTurnIdx = 0;
  let kwadTrick = '';
  let kwadTrickObj = null; // current trick object with category, desc
  let kwadTried = [];     // names that already had a go at the current trick
  let kwadLastTrick = -1;
  let kwadLastPenalty = null; // { playerIdx, letter } for undo
  let kwadMode = 'random'; // 'random' | 'sequential' | 'roundRobinCategory'
  let kwadCategoryOrder = []; // for roundRobinCategory mode
  let kwadCategoryIdx = 0;
  let kwadObstaclePicker = ''; // player name who picks the obstacle (persisted)
  let kwadStats = {}; // { trickName: { attempted: n, succeeded: n } }
  let kwadCategoryFilter = null; // deprecated, use category.enabled

  // -- pure helpers (unit-tested in tests/kwad_test.js) --
  function kwadNormalizeLetters(value) {
    return String(value == null ? '' : value).toUpperCase().replace(/[^KWAD]/g, '').slice(0, KWAD_LETTERS.length);
  }
  function kwadIsOut(letters) {
    return kwadNormalizeLetters(letters).length >= KWAD_LETTERS.length;
  }
  function kwadNextLetter(letters) {
    const n = kwadNormalizeLetters(letters).length;
    return n < KWAD_LETTERS.length ? KWAD_LETTERS.charAt(n) : '';
  }
  function kwadDrawIndex(prevIdx, count) {
    if (count < 2) return 0;
    let idx = prevIdx;
    while (idx === prevIdx) idx = Math.floor(Math.random() * count);
    return idx;
  }
  function kwadLoserIndex(players) {
    for (let i = 0; i < players.length; i++) if (kwadIsOut(players[i].letters)) return i;
    return -1;
  }

  // -- persistence (own key; guarded against corrupt JSON / quota errors) --
  function kwadLoad() {
    // Load players
    let list = [];
    try {
      const raw = JSON.parse(localStorage.getItem('kwad_players') || '[]');
      if (Array.isArray(raw)) list = raw;
    } catch { list = []; }
    kwadPlayers = list
      .filter(p => p && typeof p.name === 'string' && p.name.trim())
      .map(p => ({ name: p.name.trim(), letters: kwadNormalizeLetters(p.letters), color: p.color || (typeof state !== 'undefined' && state.pilotColors && state.pilotColors[p.name.trim()]) }));
    const first = kwadPlayers.findIndex(p => !kwadIsOut(p.letters));
    kwadTurnIdx = first === -1 ? 0 : first;

    // Load custom tricks
    try {
      const customRaw = JSON.parse(localStorage.getItem('kwad_custom_tricks') || '[]');
      if (Array.isArray(customRaw)) {
        KWAD_CATEGORIES.custom.tricks = customRaw.map(t => ({ name: t.name, desc: t.desc || '', check: kwadCheck(t), custom: true }));
      }
    } catch { KWAD_CATEGORIES.custom.tricks = []; }

    // Load category enabled states
    try {
      const catRaw = JSON.parse(localStorage.getItem('kwad_categories') || '{}');
      Object.keys(catRaw).forEach(id => {
        if (KWAD_CATEGORIES[id] && typeof catRaw[id].enabled === 'boolean') {
          KWAD_CATEGORIES[id].enabled = catRaw[id].enabled;
        }
      });
    } catch { /* ignore */ }

    // Load mode
    try {
      const modeRaw = localStorage.getItem('kwad_mode');
      if (['random', 'sequential', 'roundRobinCategory'].includes(modeRaw)) {
        kwadMode = modeRaw;
      }
    } catch { /* ignore */ }

    // Load stats
    try {
      const statsRaw = JSON.parse(localStorage.getItem('kwad_stats') || '{}');
      if (statsRaw && typeof statsRaw === 'object') kwadStats = statsRaw;
    } catch { kwadStats = {}; }

    // Load the obstacle picker
    try {
      const pickerRaw = localStorage.getItem('kwad_obstacle_picker') || '';
      kwadObstaclePicker = typeof pickerRaw === 'string' ? pickerRaw : '';
    } catch { kwadObstaclePicker = ''; }

    // Build initial trick pool
    kwadTrickPool = kwadBuildTrickPool();
    if (kwadMode === 'roundRobinCategory') {
      kwadCategoryOrder = Object.values(KWAD_CATEGORIES)
        .filter(c => c.enabled && c.tricks.length)
        .map(c => c.id);
      kwadCategoryIdx = 0;
    }

    // Build initial trick pool
    kwadTrickPool = kwadBuildTrickPool();
  }
  function kwadSave() {
    try { localStorage.setItem('kwad_players', JSON.stringify(kwadPlayers)); }
    catch { storageError(); }
  }
  function kwadSaveCategories() {
    try {
      const data = {};
      Object.keys(KWAD_CATEGORIES).forEach(id => { data[id] = { enabled: KWAD_CATEGORIES[id].enabled }; });
      localStorage.setItem('kwad_categories', JSON.stringify(data));
    } catch { storageError(); }
  }
  function kwadSaveCustomTricks() {
    try {
      localStorage.setItem('kwad_custom_tricks', JSON.stringify(KWAD_CATEGORIES.custom.tricks));
    } catch { storageError(); }
  }
  function kwadSaveMode() {
    try { localStorage.setItem('kwad_mode', kwadMode); } catch { /* ignore */ }
  }
  function kwadSaveStats() {
    try { localStorage.setItem('kwad_stats', JSON.stringify(kwadStats)); } catch { /* ignore */ }
  }
  function kwadSaveObstaclePicker() {
    try { localStorage.setItem('kwad_obstacle_picker', kwadObstaclePicker || ''); } catch { /* ignore */ }
  }

  // Next player (cyclically from `start`) who is still in the game, or -1.
  function kwadActiveFrom(start) {
    const n = kwadPlayers.length;
    if (!n) return -1;
    for (let k = 0; k < n; k++) {
      const i = ((start + k) % n + n) % n;
      if (!kwadIsOut(kwadPlayers[i].letters)) return i;
    }
    return -1;
  }
  function kwadActiveCount() {
    return kwadPlayers.filter(p => !kwadIsOut(p.letters)).length;
  }

  function renderKwad() {
    if (!els.kwadScreen) return;
    // Populate pilot select from main pilots list
    if (els.kwadPilotSelect) {
      const current = els.kwadPilotSelect.value;
      els.kwadPilotSelect.innerHTML = '<option value="">– Piloten aus App übernehmen –</option>';
      state.pilots.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        els.kwadPilotSelect.appendChild(opt);
      });
      els.kwadPilotSelect.value = current || '';
    }
    const loser = kwadLoserIndex(kwadPlayers);
    if (loser === -1) {
      const active = kwadActiveFrom(kwadTurnIdx);
      if (active !== -1) kwadTurnIdx = active;
    }
    const active = loser === -1 ? kwadActiveFrom(kwadTurnIdx) : -1;
    const canPlay = loser === -1 && kwadActiveCount() >= 2;

    if (els.kwadTrick) els.kwadTrick.textContent = kwadTrick || '—';

    // Prüfart "Hindernis": the group nominates who picks the obstacle.
    const trickCheck = kwadTrickObj ? kwadCheck(kwadTrickObj) : 'free';
    const isObstacle = trickCheck === 'obstacle';
    if (els.kwadObstacle) els.kwadObstacle.hidden = !isObstacle;
    if (els.kwadObstaclePicker && isObstacle) {
      const actives = kwadPlayers.filter(p => !kwadIsOut(p.letters)).map(p => p.name);
      if (actives.indexOf(kwadObstaclePicker) === -1) kwadObstaclePicker = actives[0] || '';
      els.kwadObstaclePicker.innerHTML = '';
      const blank = document.createElement('option');
      blank.value = '';
      blank.textContent = t('kwad_obstacle_none');
      els.kwadObstaclePicker.appendChild(blank);
      actives.forEach(nm => {
        const o = document.createElement('option');
        o.value = nm;
        o.textContent = nm;
        els.kwadObstaclePicker.appendChild(o);
      });
      els.kwadObstaclePicker.value = kwadObstaclePicker || '';
    }

    if (els.kwadPlayers) {
      els.kwadPlayers.textContent = '';
      kwadPlayers.forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'kwad-player';
        if (i === active) row.classList.add('is-turn');
        if (kwadIsOut(p.letters)) row.classList.add('is-out');

        const color = p.color || (typeof state !== 'undefined' && state.pilotColors && state.pilotColors[p.name]) || (typeof PILOT_PALETTE !== 'undefined' ? PILOT_PALETTE[i % PILOT_PALETTE.length] : '#20c4c4');
        const name = document.createElement('span');
        name.className = 'kwad-name';
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (dot.style) dot.style.background = color;
        name.appendChild(dot);
        name.textContent = p.name;

        const letters = document.createElement('span');
        letters.className = 'kwad-letters';
        KWAD_LETTERS.split('').forEach((ch, j) => {
          const b = document.createElement('b');
          b.textContent = ch;
          if (j < kwadNormalizeLetters(p.letters).length) b.className = 'on';
          letters.appendChild(b);
        });

        const rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'kwad-remove';
        rm.textContent = '✕';
        rm.title = t('kwad_remove') + ': ' + p.name;
        rm.setAttribute('aria-label', t('kwad_remove') + ': ' + p.name);
        rm.addEventListener('click', () => kwadRemovePlayer(i));

        row.appendChild(name);
        row.appendChild(letters);
        row.appendChild(rm);
        els.kwadPlayers.appendChild(row);
      });
    }

    if (els.kwadResult) {
      if (loser !== -1) {
        els.kwadResult.hidden = false;
        els.kwadResult.textContent = kwadPlayers[loser].name + ' ' + t('kwad_loses');
      } else {
        els.kwadResult.hidden = true;
      }
    }
    if (els.kwadTurnCard) els.kwadTurnCard.hidden = kwadActiveCount() < 2;
    if (els.kwadTurn) els.kwadTurn.textContent = active !== -1 ? kwadPlayers[active].name : t('kwad_no_players');
    if (els.btnKwadDone) els.btnKwadDone.disabled = !canPlay;
    if (els.btnKwadFail) els.btnKwadFail.disabled = !canPlay;
    if (els.btnKwadUndo) els.btnKwadUndo.disabled = !kwadLastPenalty;
  }

  function kwadNewTrick() {
    if (kwadLoserIndex(kwadPlayers) !== -1) return;
    if (kwadTrickPool.length === 0) {
      kwadTrick = '—';
      kwadTrickObj = null;
      renderKwad();
      return;
    }

    let pickIdx;
    if (kwadMode === 'sequential') {
      // Sequential through pool: pick next, wrap around
      pickIdx = (kwadLastTrick + 1) % kwadTrickPool.length;
    } else if (kwadMode === 'roundRobinCategory') {
      // Round-robin through categories
      if (kwadCategoryOrder.length === 0) {
        kwadCategoryOrder = Object.values(KWAD_CATEGORIES)
          .filter(c => c.enabled && c.tricks.length)
          .map(c => c.id);
        kwadCategoryIdx = 0;
      }
      // Find next trick from current category
      let attempts = 0;
      while (attempts < kwadCategoryOrder.length) {
        const catId = kwadCategoryOrder[kwadCategoryIdx];
        const catTricks = KWAD_CATEGORIES[catId]?.tricks || [];
        if (catTricks.length > 0) {
          const catTrickIdx = catTricks.findIndex(t => t.name === kwadTrick);
          let nextCatTrickIdx = (catTrickIdx + 1) % catTricks.length;
          const nextTrick = catTricks[nextCatTrickIdx];
          pickIdx = kwadTrickPool.findIndex(t => t.name === nextTrick.name && t.category === catId);
          if (pickIdx !== -1) break;
        }
        kwadCategoryIdx = (kwadCategoryIdx + 1) % kwadCategoryOrder.length;
        attempts++;
      }
      if (pickIdx === undefined || pickIdx === -1) {
        // Fallback to random
        pickIdx = kwadDrawIndex(kwadLastTrick, kwadTrickPool.length);
      }
    } else {
      // Random (default): weighted by difficulty (higher = less frequent)
      const weights = kwadTrickPool.map(t => {
        const cat = KWAD_CATEGORIES[t.category];
        const diff = cat?.difficulty || 1;
        return 1 / diff; // lower difficulty = higher weight
      });
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * totalWeight;
      pickIdx = 0;
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) { pickIdx = i; break; }
      }
    }

    kwadLastTrick = pickIdx;
    kwadTrickObj = kwadTrickPool[pickIdx];
    kwadTrick = kwadTrickObj.name;
    kwadTried = [];
    kwadLastPenalty = null;
    const active = kwadActiveFrom(kwadTurnIdx);
    if (active !== -1) kwadTurnIdx = active;
    if (typeof soundKwadNewTrick === 'function') soundKwadNewTrick();
    renderKwad();
  }

  // One attempt turned in by the current player. `ok === false` adds a letter.
  function kwadRound(ok) {
    if (kwadLoserIndex(kwadPlayers) !== -1) return;
    const active = kwadActiveFrom(kwadTurnIdx);
    if (active === -1) return;
    const p = kwadPlayers[active];
    const currentTrickName = kwadTrickObj?.name || kwadTrick;
    if (!ok) {
      const letter = kwadNextLetter(p.letters);
      if (letter) {
        p.letters = kwadNormalizeLetters(p.letters) + letter;
        kwadLastPenalty = { playerIdx: active, letter, trick: currentTrickName };
        if (typeof soundKwadPenalty === 'function') soundKwadPenalty();
      }
      kwadRecordStat(currentTrickName, false);
      kwadSave();
      if (kwadIsOut(p.letters)) {
        if (typeof soundKwadGameOver === 'function') soundKwadGameOver();
        renderKwad();
        return;
      }   // that player has lost
    } else {
      kwadLastPenalty = null; // successful attempt clears undo
      kwadRecordStat(currentTrickName, true);
      if (typeof soundKwadSuccess === 'function') soundKwadSuccess();
    }
    if (kwadTried.indexOf(p.name) === -1) kwadTried.push(p.name);
    const n = kwadPlayers.length;
    let next = -1;
    for (let k = 1; k <= n; k++) {
      const i = (active + k) % n;
      if (kwadIsOut(kwadPlayers[i].letters)) continue;
      if (kwadTried.indexOf(kwadPlayers[i].name) !== -1) continue;
      next = i;
      break;
    }
    if (next === -1) {
      // Everyone still in the game had a go at this trick → call a fresh one.
      kwadTurnIdx = (active + 1) % n;
      kwadNewTrick();
      toast(t('kwad_round_done'), 2000);
      return;
    }
    kwadTurnIdx = next;
    renderKwad();
  }

  // Anti-cheat undo: take back only the penalty letter handed out last. It is
  // cleared as soon as a new trick is drawn or somebody succeeds, so you can
  // never rewind more than the very last letter.
  function kwadUndoPenalty() {
    if (!kwadLastPenalty) return;
    const { playerIdx, letter, trick } = kwadLastPenalty;
    kwadLastPenalty = null;
    const p = kwadPlayers[playerIdx];
    if (!p) { renderKwad(); return; }
    const letters = kwadNormalizeLetters(p.letters);
    p.letters = (letter && letters.slice(-1) === letter) ? letters.slice(0, -1) : letters;
    // The player gets their go back at the same trick.
    const at = kwadTried.indexOf(p.name);
    if (at !== -1) kwadTried.splice(at, 1);
    if (trick && kwadStats[trick] && kwadStats[trick].attempted > 0) {
      kwadStats[trick].attempted--;
      kwadSaveStats();
    }
    kwadTurnIdx = playerIdx;
    kwadSave();
    toast(t('kwad_undone').replace('{letter}', letter || '').replace('{name}', p.name), 2000);
    renderKwad();
  }

  // Record stat for a trick attempt
  function kwadRecordStat(trickName, succeeded) {
    if (!kwadStats[trickName]) kwadStats[trickName] = { attempted: 0, succeeded: 0 };
    kwadStats[trickName].attempted++;
    if (succeeded) kwadStats[trickName].succeeded++;
    kwadSaveStats();
  }

  function kwadAddPlayer(name) {
    if (!name && els.kwadName) name = (els.kwadName.value || '').trim();
    if (!name) return;
    if (els.kwadName) els.kwadName.value = '';
    if (kwadPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) return;
    // Use pilot color from main app if available
    const color = (typeof state !== 'undefined' && state.pilotColors && state.pilotColors[name]) || (typeof PILOT_PALETTE !== 'undefined' ? PILOT_PALETTE[kwadPlayers.length % PILOT_PALETTE.length] : '#20c4c4');
    kwadPlayers.push({ name, letters: '', color });
    kwadSave();
    if (els.kwadPilotSelect) els.kwadPilotSelect.value = '';
    renderKwad();
  }
  function kwadRemovePlayer(idx) {
    if (idx < 0 || idx >= kwadPlayers.length) return;
    const gone = kwadPlayers[idx].name;
    kwadPlayers.splice(idx, 1);
    kwadTried = kwadTried.filter(nm => nm !== gone);
    if (kwadTurnIdx >= kwadPlayers.length) kwadTurnIdx = 0;
    kwadSave();
    renderKwad();
  }
  function kwadResetGame() {
    kwadPlayers.forEach(p => { p.letters = ''; });
    kwadTurnIdx = 0;
    kwadTried = [];
    kwadTrick = '';
    kwadLastPenalty = null;
    kwadSave();
    kwadNewTrick();
  }

  // KWAD Settings functions
  function openKwadSettings() {
    if (!els.kwadSettingsOverlay) return;
    closeSettings();
    els.kwadSettingsOverlay.hidden = false;
  }
  function closeKwadSettings() {
    if (!els.kwadSettingsOverlay) return;
    els.kwadSettingsOverlay.hidden = true;
  }

  function renderKwadCategories() {
    if (!els.kwadCategoryGrid) return;
    els.kwadCategoryGrid.innerHTML = '';
    Object.values(KWAD_CATEGORIES).forEach(cat => {
      if (cat.id === 'custom') return; // handled separately
      const item = document.createElement('div');
      item.className = 'kwad-category-item';
      item.innerHTML = `
        <span class="cat-emoji">${cat.emoji}</span>
        <div class="cat-info">
          <div class="cat-label" data-i18n="kwad_category_${cat.id}">${t('kwad_category_' + cat.id)}</div>
          <div class="cat-diff">${t('kwad_difficulty')}: ${'★'.repeat(cat.difficulty)}${'☆'.repeat(4 - cat.difficulty)}</div>
        </div>
        <span class="cat-count">${cat.tricks.length} Tricks</span>
        <label class="cat-toggle check-row">
          <input type="checkbox" ${cat.enabled ? 'checked' : ''} data-cat="${cat.id}" />
          <span data-i18n="kwad_enabled">${t('kwad_enabled')}</span>
        </label>
      `;
      els.kwadCategoryGrid.appendChild(item);
    });
    // Add checkbox listeners
    els.kwadCategoryGrid.querySelectorAll('input[data-cat]').forEach(cb => {
      cb.addEventListener('change', e => {
        const catId = e.target.dataset.cat;
        KWAD_CATEGORIES[catId].enabled = e.target.checked;
        kwadSaveCategories();
        kwadTrickPool = kwadBuildTrickPool();
        if (kwadMode === 'roundRobinCategory') {
          kwadCategoryOrder = Object.values(KWAD_CATEGORIES).filter(c => c.enabled && c.tricks.length).map(c => c.id);
          kwadCategoryIdx = 0;
        }
        renderKwadCategories();
      });
    });
  }

  function renderKwadMode() {
    if (!els.kwadModeSelect) return;
    els.kwadModeSelect.value = kwadMode;
  }

  function renderKwadCustomTricks() {
    if (!els.kwadCustomTricksList) return;
    els.kwadCustomTricksList.innerHTML = '';
    KWAD_CATEGORIES.custom.tricks.forEach((t, idx) => {
      const item = document.createElement('div');
      item.className = 'kwad-custom-trick';
      item.innerHTML = `
        <span class="custom-name">${t.name}</span>
        <span class="custom-desc">${t.desc || '—'}</span>
        <span class="custom-check" data-i18n="kwad_check_${kwadCheck(t)}">${t('kwad_check_' + kwadCheck(t))}</span>
        <span class="custom-cat">${t.custom ? '⭐ Eigen' : ''}</span>
        <button type="button" class="custom-del btn btn-danger" data-idx="${idx}" data-i18n-title="kwad_custom_delete" aria-label="${t('kwad_custom_delete')}">✕</button>
      `;
      els.kwadCustomTricksList.appendChild(item);
    });
    // Add delete listeners
    els.kwadCustomTricksList.querySelectorAll('.custom-del').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx, 10);
        kwadRemoveCustomTrick(idx);
      });
    });
  }

  function kwadAddCustomTrick() {
    if (!els.kwadCustomName || !els.kwadCustomDesc) return;
    const name = (els.kwadCustomName.value || '').trim();
    const desc = (els.kwadCustomDesc.value || '').trim();
    const check = kwadCheck({ check: els.kwadCustomCheck ? els.kwadCustomCheck.value : '' });
    if (!name) return;
    if (KWAD_CATEGORIES.custom.tricks.some(t => t.name.toLowerCase() === name.toLowerCase())) return;
    KWAD_CATEGORIES.custom.tricks.push({ name, desc, check, custom: true });
    kwadSaveCustomTricks();
    kwadTrickPool = kwadBuildTrickPool();
    els.kwadCustomName.value = '';
    els.kwadCustomDesc.value = '';
    renderKwadCustomTricks();
  }

  function kwadRemoveCustomTrick(idx) {
    if (idx < 0 || idx >= KWAD_CATEGORIES.custom.tricks.length) return;
    KWAD_CATEGORIES.custom.tricks.splice(idx, 1);
    kwadSaveCustomTricks();
    kwadTrickPool = kwadBuildTrickPool();
    renderKwadCustomTricks();
  }

  function renderKwadStats() {
    if (!els.kwadStatsGrid) return;
    const entries = Object.entries(kwadStats).sort((a, b) => b[1].attempted - a[1].attempted);
    if (entries.length === 0) {
      els.kwadStatsGrid.innerHTML = `<p class="hint" style="grid-column:1/-1;">${t('kwad_no_players')}</p>`;
      return;
    }
    els.kwadStatsGrid.innerHTML = `
      <div class="kwad-stat-row header">
        <div class="kwad-stat-name">${t('kwad_trick')}</div>
        <div class="kwad-stat-num">${t('kwad_stats_attempted')}</div>
        <div class="kwad-stat-num">${t('kwad_stats_succeeded')}</div>
        <div class="kwad-stat-rate">${t('kwad_stats_rate')}</div>
      </div>
    `;
    entries.forEach(([name, s]) => {
      const rate = s.attempted > 0 ? Math.round((s.succeeded / s.attempted) * 100) : 0;
      const row = document.createElement('div');
      row.className = 'kwad-stat-row';
      row.innerHTML = `
        <div class="kwad-stat-name">${name}</div>
        <div class="kwad-stat-num">${s.attempted}</div>
        <div class="kwad-stat-num">${s.succeeded}</div>
        <div class="kwad-stat-rate">${rate}%</div>
      `;
      els.kwadStatsGrid.appendChild(row);
    });
  }

  function openKwad() {
    if (!els.kwadScreen) return;
    if (els.homeScreen) els.homeScreen.hidden = true;
    if (els.pilotsScreen) els.pilotsScreen.hidden = true;
    els.kwadScreen.hidden = false;
    if (els.btnHome) els.btnHome.hidden = false;
    // The topbar gear is the app-settings gear; the timer view owns its own.
    if (els.btnSettings) els.btnSettings.hidden = true;
    els.kwadScreen.scrollTop = 0;
    if (!kwadTrick) kwadNewTrick();
    renderKwad();
  }
  if (els.tileKwad) els.tileKwad.addEventListener('click', openKwad);
  if (els.btnKwadNewTrick) els.btnKwadNewTrick.addEventListener('click', kwadNewTrick);
  if (els.btnKwadDone) els.btnKwadDone.addEventListener('click', () => kwadRound(true));
  if (els.btnKwadFail) els.btnKwadFail.addEventListener('click', () => kwadRound(false));
  if (els.btnKwadUndo) els.btnKwadUndo.addEventListener('click', kwadUndoPenalty);
  if (els.kwadObstaclePicker) els.kwadObstaclePicker.addEventListener('change', e => {
    kwadObstaclePicker = e.target.value || '';
    kwadSaveObstaclePicker();
  });
  if (els.btnKwadAdd) els.btnKwadAdd.addEventListener('click', () => kwadAddPlayer());
  if (els.kwadName) els.kwadName.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); kwadAddPlayer(); } });
  if (els.kwadPilotSelect) els.kwadPilotSelect.addEventListener('change', e => { if (e.target.value) kwadAddPlayer(e.target.value); });
  if (els.btnKwadReset) els.btnKwadReset.addEventListener('click', kwadResetGame);
  // KWAD Settings
  if (els.btnKwadSettings) els.btnKwadSettings.addEventListener('click', () => {
    openKwadSettings();
    renderKwadCategories();
    renderKwadMode();
    renderKwadCustomTricks();
    renderKwadStats();
  });
  if (els.btnKwadSettingsClose) els.btnKwadSettingsClose.addEventListener('click', closeKwadSettings);
  if (els.kwadSettingsOverlay) els.kwadSettingsOverlay.addEventListener('click', e => { if (e.target === els.kwadSettingsOverlay) closeKwadSettings(); });
  if (els.kwadModeSelect) els.kwadModeSelect.addEventListener('change', e => { kwadMode = e.target.value; kwadSaveMode(); if (kwadMode === 'roundRobinCategory') { kwadCategoryOrder = Object.values(KWAD_CATEGORIES).filter(c => c.enabled && c.tricks.length).map(c => c.id); kwadCategoryIdx = 0; } renderKwadMode(); });
  if (els.btnKwadCustomSave) els.btnKwadCustomSave.addEventListener('click', kwadAddCustomTrick);
  kwadLoad();

  // ---------- init ----------
  function init() {
    initSettings();
    installAudioUnlock();
    // Buttons inside a <summary> must not toggle the collapsible section.
    document.querySelectorAll('.card-summary button, .card-summary select').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
    });
    // initial overlay sizing
    const r = els.overlay.getBoundingClientRect();
    els.overlay.width = Math.round(r.width) || 320;
    els.overlay.height = Math.round(r.height) || 240;
    if (els.versionBadge) els.versionBadge.textContent = 'v' + APP_VERSION;
    if (els.homeVersionBadge) els.homeVersionBadge.textContent = 'v' + APP_VERSION;
    applyLanguage();
    saveSettings();
    // Start on the home screen — the app's features (Timer, …) are opened from here.
    openHome();
  }

  window.addEventListener('resize', () => { drawOverlay(); renderChart(); });
  window.addEventListener('orientationchange', () => setTimeout(() => { drawOverlay(); renderChart(); }, 250));
  init();
  // try to enumerate after potential permission later
})();
