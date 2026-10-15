(() => {
  'use strict';

  const APP_VERSION = '0.5.0';

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
    laps: [],
    pilots: [],
    currentPilot: null,
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
    countdownSecs: document.getElementById('countdownSecs'),
    countdownSecsVal: document.getElementById('countdownSecsVal'),
    audioEnabled: document.getElementById('audioEnabled'),
    announceMode: document.getElementById('announceMode'),
    announceRate: document.getElementById('announceRate'),
    announceRateVal: document.getElementById('announceRateVal'),
    versionBadge: document.getElementById('versionBadge'),
    btnForceUpdate: document.getElementById('btnForceUpdate'),
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
    localStorage.setItem('fpv_settings', JSON.stringify({
      diffThreshold: state.diffThreshold,
      enterThreshold: state.enterThreshold,
      exitThreshold: state.exitThreshold,
      cooldownMs: state.cooldownMs,
      procRes: els.procRes.value,
      roi: state.roi,
      pilots: state.pilots,
      currentPilot: state.currentPilot,
      showMotion: state.showMotion,
      audioEnabled: state.audioEnabled,
      countdownSecs: state.countdownSecs,
      announceMode: state.announceMode,
      announceRate: state.announceRate,
    }));
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

  // ---------- settings wiring ----------
  function initSettings() {
    const s = state.settings || {};
    state.diffThreshold = s.diffThreshold ?? 35;
    state.enterThreshold = s.enterThreshold ?? 120;
    state.exitThreshold = s.exitThreshold ?? 60;
    state.cooldownMs = s.cooldownMs ?? 2000;
    state.pilots = s.pilots ?? [];
    state.currentPilot = s.currentPilot ?? null;
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
    if (els.countdownSecs) { els.countdownSecs.value = state.countdownSecs; els.countdownSecsVal.textContent = state.countdownSecs; }
    state.announceMode = s.announceMode ?? 'jede';
    if (els.announceMode) els.announceMode.value = state.announceMode;
    state.announceRate = s.announceRate ?? 1;
    if (els.announceRate) { els.announceRate.value = state.announceRate; els.announceRateVal.textContent = (+state.announceRate).toFixed(2); }
    applyProcRes();
    renderPilots();
  }

  function applyProcRes() {
    const v = els.procRes.value;
    if (v === '480x360') { state.procW = 480; state.procH = 360; }
    else { state.procW = 320; state.procH = 240; }
    procCanvas.width = state.procW; procCanvas.height = state.procH;
    // scale roi if present? keep ratios
    if (state.roi) {
      // store roi in process coords; if resolution changed, approximate via ratio
      // not enough info; reset roi to null on change? We'll just clamp.
      state.roi.x = Math.min(state.roi.x, state.procW - 10);
      state.roi.y = Math.min(state.roi.y, state.procH - 10);
      state.roi.w = Math.min(state.roi.w, state.procW - state.roi.x);
      state.roi.h = Math.min(state.roi.h, state.procH - state.roi.y);
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
  if (els.countdownSecs) {
    els.countdownSecs.addEventListener('input', e => { state.countdownSecs = +e.target.value; els.countdownSecsVal.textContent = state.countdownSecs; saveSettings(); });
  }
  if (els.audioEnabled) {
    els.audioEnabled.addEventListener('change', e => { state.audioEnabled = e.target.checked; ensureAudio(); saveSettings(); });
  }
  if (els.announceMode) {
    els.announceMode.addEventListener('change', e => { state.announceMode = e.target.value; saveSettings(); });
  }
  if (els.announceRate) {
    els.announceRate.addEventListener('input', e => { state.announceRate = +e.target.value; els.announceRateVal.textContent = state.announceRate.toFixed(2); saveSettings(); });
  }

  // ---------- speech announcements (Text-to-Speech) ----------
  let ttsVoices = [];
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    ttsVoices = window.speechSynthesis.getVoices() || [];
  }
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      u.rate = state.announceRate || 1;
      u.pitch = 1;
      u.volume = 1;
      const de = ttsVoices.find(v => /^de/i.test(v.lang)) || ttsVoices.find(v => /de/i.test(v.name));
      if (de) u.voice = de;
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
    const totalSec = ms / 1000;
    if (totalSec < 60) {
      return totalSec.toFixed(2).replace('.', ',') + ' Sekunden';
    }
    const min = Math.floor(totalSec / 60);
    const sec = (totalSec - min * 60).toFixed(2).replace('.', ',');
    return min + (min === 1 ? ' Minute ' : ' Minuten ') + sec + ' Sekunden';
  }

  // ---------- audio feedback ----------
  let audioCtx = null;
  function ensureAudio() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) { /* audio not available */ }
    return audioCtx;
  }
  function beep(freq, dur = 0.12, gain = 0.25, type = 'sine', delay = 0) {
    if (!state.audioEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
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

  // ---------- force update ----------
  async function forceUpdate() {
    setStatus('Aktualisiere …');
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

  // ---------- camera ----------
  async function enumerateCameras() {
    try {
      const devs = await navigator.mediaDevices.enumerateDevices();
      state.devices = devs.filter(d => d.kind === 'videoinput');
      els.camSelect.innerHTML = '';
      state.devices.forEach((d, i) => {
        const opt = document.createElement('option');
        opt.value = d.deviceId;
        opt.textContent = d.label || `Kamera ${i+1}`;
        els.camSelect.appendChild(opt);
      });
    } catch (e) { console.error(e); }
  }

  async function startCamera(deviceId) {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setStatus('Kamera nicht verfügbar: diese Seite läuft nicht über HTTPS/sicheren Kontext. Bitte per HTTPS öffnen (z. B. Netlify Drop).');
      return;
    }
    if (state.stream) {
      state.stream.getTracks().forEach(t => t.stop());
      state.stream = null;
    }
    try {
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1280 }, height: { ideal: 720 },
          facingMode: { ideal: 'environment' }
        }, audio: false
      };
      state.stream = await navigator.mediaDevices.getUserMedia(constraints);
      els.video.srcObject = state.stream;
      await els.video.play();
      await enumerateCameras();
      if (deviceId) els.camSelect.value = deviceId;
      setStatus('Kamera läuft');
      els.zoneHint.style.display = 'block';
      els.btnStartCam.textContent = 'Kamera stoppen';
      els.btnStartCam.classList.remove('primary');
      startLoop();
      // Auto-calibrate the background once video is running, so detection works right away.
      setTimeout(() => { if (!state.background && state.stream) calibrateBackground(); }, 1200);
    } catch (e) {
      console.error(e);
      setStatus('Kamera-Fehler: ' + (e.message || e));
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
    els.btnStartCam.textContent = 'Kamera starten';
    els.btnStartCam.classList.add('primary');
    els.zoneHint.style.display = 'block';
    setStatus('Kamera gestoppt');
  }

  els.btnStartCam.addEventListener('click', () => {
    if (state.stream) stopCamera();
    else startCamera(els.camSelect.value);
  });
  els.camSelect.addEventListener('change', () => { if (state.stream) startCamera(els.camSelect.value); });

  // ---------- ROI drawing ----------
  function toProc(pos) {
    const rect = els.overlay.getBoundingClientRect();
    const cx = (pos.x - rect.left) * (els.overlay.width / rect.width);
    const cy = (pos.y - rect.top) * (els.overlay.height / rect.height);
    const v = state.view || { dx: 0, dy: 0, sx: els.overlay.width / state.procW, sy: els.overlay.height / state.procH };
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
    if (!els.video.videoWidth) { setStatus('Kein Videobild'); return; }
    const n = 8;
    const acc = new Float32Array(state.procW * state.procH);
    let done = 0;
    const capture = () => {
      if (done >= n) {
        for (let i = 0; i < acc.length; i++) acc[i] /= n;
        state.background = acc;
        setStatus('Hintergrund kalibriert');
        haptic();
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
        overlayCtx.fillText('Kamera startet …', w / 2, h - 12);
        overlayCtx.textAlign = 'left';
      }
      return;
    }

    // Draw the camera image ourselves with "contain" fit. This guarantees a
    // visible preview even if the <video> element fails to paint on some devices,
    // and it lets us map the ROI exactly onto the image.
    const scale = Math.min(w / vw, h / vh);
    const dw = vw * scale, dh = vh * scale;
    const dx = (w - dw) / 2, dy = (h - dh) / 2;
    state.view = { dx, dy, dw, dh, sx: dw / state.procW, sy: dh / state.procH };
    overlayCtx.drawImage(els.video, dx, dy, dw, dh);

    const gray = new Float32Array(state.procW * state.procH);
    processGrayInto(gray, false);

    const now = performance.now();
    updateCountdown(now);

    if (!state.background) {
      els.metricState.textContent = 'Status: Hintergrund kalibrieren… (v' + APP_VERSION + ')';
      overlayCtx.fillStyle = 'rgba(0,0,0,0.55)';
      overlayCtx.fillRect(0, h - 34, w, 34);
      overlayCtx.fillStyle = '#ff7a1a';
      overlayCtx.font = 'bold 15px sans-serif';
      overlayCtx.textAlign = 'center';
      overlayCtx.fillText('Hintergrund wird kalibriert …', w / 2, h - 12);
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

    // state machine
    if (state.armed && state.raceActive && roi) {
      if (state.machine === 0 && changed >= state.enterThreshold) {
        state.machine = 1;
        tryTriggerLap(now);
      } else if (state.machine === 1 && changed <= state.exitThreshold) {
        state.machine = 0;
      }
    }

    // meter
    const pct = Math.min(100, (changed / Math.max(1, state.enterThreshold * 3)) * 100);
    els.meterFill.style.width = pct + '%';
    els.metricValue.textContent = changed + ' px';
    els.metricState.textContent = 'Status: ' + (state.machine === 1 ? 'belegt' : 'frei') + (state.armed ? ' · armed' : '');

    drawOverlay();
    updateTimers();
  }

  function tryTriggerLap(now) {
    if (now - state.lastTrigger < state.cooldownMs) return;
    state.lastTrigger = now;
    recordLap(now);
    haptic();
  }

  function recordLap(triggerTime) {
    const duration = triggerTime - state.currentLapStart;
    if (duration < 300) return; // ignore tiny
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
    renderLaps();
    updateBest();
    if (isBest) soundBest(); else soundLap();
    announceLap(lapNumber, duration, isBest);
  }

  function announceLap(lapNumber, duration, isBest) {
    if (state.announceMode === 'aus') return;
    if (state.announceMode === 'best' && !isBest) return;
    const time = secondsToSpeech(duration);
    const text = (isBest ? 'Neue Bestzeit! ' : '') + 'Runde ' + lapNumber + ': ' + time;
    speak(text);
  }

  els.btnLapManual.addEventListener('click', () => {
    if (!state.raceActive) return;
    recordLap(performance.now());
    haptic();
  });

  // ---------- race control ----------
  function startCountdown() {
    if (!state.stream) { setStatus('Erst Kamera starten'); return; }
    if (state.countdownActive || state.raceActive) return;
    ensureAudio();
    primeSpeech();
    state.laps = [];
    renderLaps();
    updateBest();
    els.lastLap.textContent = '--';
    state.armed = true;
    els.armedToggle.checked = true;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.lastTrigger = 0;
    if (state.countdownSecs <= 0) { beginRace(); return; }
    state.countdownActive = true;
    state.countdownEnd = performance.now() + state.countdownSecs * 1000;
    state.lastCountdownValue = null;
    setStatus('Countdown …');
  }

  function beginRace() {
    state.countdownActive = false;
    state.raceActive = true;
    state.raceStart = performance.now();
    state.currentLapStart = state.raceStart;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.lastTrigger = 0;
    state.goFlashUntil = performance.now() + 800;
    soundGo();
    if (state.announceMode !== 'aus') speak('Los');
    setStatus('Rennen läuft');
  }

  function stopRace() {
    if (state.countdownActive) {
      state.countdownActive = false;
      setStatus('Countdown abgebrochen');
      return;
    }
    if (!state.raceActive) return;
    const now = performance.now();
    state.raceElapsed = now - state.raceStart;
    state.frozenLap = now - state.currentLapStart;
    state.raceActive = false;
    soundStop();
    setStatus('Rennen gestoppt');
    if (state.announceMode !== 'aus') speak('Stopp. Gesamtzeit ' + secondsToSpeech(state.raceElapsed));
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
    state.raceActive = false;
    state.countdownActive = false;
    state.laps = [];
    state.raceStart = 0;
    state.currentLapStart = 0;
    state.raceElapsed = 0;
    state.frozenLap = 0;
    state.machine = 0;
    state.goFlashUntil = 0;
    renderLaps();
    updateBest();
    els.raceTime.textContent = '00:00.000';
    els.currentLap.textContent = '00:00.000';
    els.lastLap.textContent = '--';
    setStatus('Zurückgesetzt');
  });
  els.armedToggle.addEventListener('change', e => {
    state.armed = e.target.checked;
    state.machine = 0;
  });

  function updateTimers() {
    const now = performance.now();
    if (state.countdownActive) {
      els.raceTime.textContent = fmt(Math.max(0, state.countdownEnd - now));
      els.currentLap.textContent = '00:00.000';
      return;
    }
    if (state.raceActive) {
      els.raceTime.textContent = fmt(now - state.raceStart);
      els.currentLap.textContent = fmt(now - state.currentLapStart);
      if (state.laps.length) els.lastLap.textContent = fmt(state.laps[state.laps.length-1].duration);
      return;
    }
    // stopped / frozen
    els.raceTime.textContent = fmt(state.raceElapsed);
    els.currentLap.textContent = fmt(state.frozenLap);
  }

  function renderLaps() {
    els.lapTable.innerHTML = '';
    let prevTotal = 0;
    state.laps.forEach((l, i) => {
      const tr = document.createElement('tr');
      if (i === state.laps.length - 1) tr.style.background = 'rgba(255,122,26,0.12)';
      const lapDelta = i > 0 ? l.duration : l.duration;
      tr.innerHTML = `<td>${l.idx}</td><td>${l.pilot || '-'}</td><td>${fmt(l.duration)}</td><td>${fmt(l.total)}</td><td>${i>0 ? fmt(l.total - (state.laps[i-1]?.total || 0)) : '-'}</td>`;
      els.lapTable.appendChild(tr);
    });
    // fix between column: distance between lap totals
  }

  function updateBest() {
    if (!state.laps.length) { els.bestLap.textContent = '--'; return; }
    const best = state.laps.reduce((a,b) => a.duration < b.duration ? a : b);
    els.bestLap.textContent = fmt(best.duration);
  }

  // ---------- pilots ----------
  function renderPilots() {
    els.pilots.innerHTML = '';
    state.pilots.forEach(name => {
      const chip = document.createElement('div');
      chip.className = 'pilot-chip' + (state.currentPilot === name ? ' active' : '');
      chip.textContent = name;
      chip.addEventListener('click', () => { state.currentPilot = name; renderPilots(); saveSettings(); });
      els.pilots.appendChild(chip);
    });
  }
  els.btnAddPilot.addEventListener('click', () => {
    const name = els.pilotName.value.trim();
    if (!name) return;
    if (!state.pilots.includes(name)) state.pilots.push(name);
    state.currentPilot = name;
    els.pilotName.value = '';
    renderPilots();
    saveSettings();
  });

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
    const v = state.view || { dx: 0, dy: 0, sx: w / state.procW, sy: h / state.procH };
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

    // Countdown / GO overlay
    const nowp = performance.now();
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
  }

  // ---------- init ----------
  function init() {
    initSettings();
    // initial overlay sizing
    const r = els.overlay.getBoundingClientRect();
    els.overlay.width = Math.round(r.width) || 320;
    els.overlay.height = Math.round(r.height) || 240;
    if (els.versionBadge) els.versionBadge.textContent = 'v' + APP_VERSION;
    saveSettings();
    setStatus('Bereit (v' + APP_VERSION + ') – Kamera starten');
  }

  window.addEventListener('resize', () => { drawOverlay(); });
  init();
  // try to enumerate after potential permission later
})();
