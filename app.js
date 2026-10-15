(() => {
  'use strict';

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
  };

  const procCanvas = document.createElement('canvas');
  const procCtx = procCanvas.getContext('2d', { willReadFrequently: true });
  const overlayCtx = els.overlay.getContext('2d');

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
      startLoop();
    } catch (e) {
      console.error(e);
      setStatus('Kamera-Fehler: ' + (e.message || e));
    }
  }

  els.btnStartCam.addEventListener('click', () => startCamera(els.camSelect.value));
  els.camSelect.addEventListener('change', () => startCamera(els.camSelect.value));

  // ---------- ROI drawing ----------
  function toProc(pos) {
    const rect = els.overlay.getBoundingClientRect();
    const scaleX = state.procW / rect.width;
    const scaleY = state.procH / rect.height;
    return { x: (pos.x - rect.left) * scaleX, y: (pos.y - rect.top) * scaleY };
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
    if (!els.video.videoWidth || !state.stream) return;
    overlayCtx.clearRect(0, 0, els.overlay.width, els.overlay.height);
    // keep overlay size in sync with element
    const rect = els.overlay.getBoundingClientRect();
    if (els.overlay.width !== Math.round(rect.width) || els.overlay.height !== Math.round(rect.height)) {
      els.overlay.width = Math.round(rect.width);
      els.overlay.height = Math.round(rect.height);
    }

    const gray = new Float32Array(state.procW * state.procH);
    processGrayInto(gray, false);

    if (!state.background) {
      drawOverlay();
      return;
    }

    const roi = state.roi;
    let changed = 0;
    if (roi) {
      for (let y = Math.floor(roi.y); y < Math.floor(roi.y + roi.h); y++) {
        if (y < 0 || y >= state.procH) continue;
        for (let x = Math.floor(roi.x); x < Math.floor(roi.x + roi.w); x++) {
          if (x < 0 || x >= state.procW) continue;
          const idx = y * state.procW + x;
          if (Math.abs(gray[idx] - state.background[idx]) > state.diffThreshold) changed++;
        }
      }
    }
    state.lastChanged = changed;
    if (changed > state.maxChangedSeen) state.maxChangedSeen = changed; // debug

    // state machine
    const now = performance.now();
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
    state.laps.push({
      idx: state.laps.length + 1,
      pilot: state.currentPilot,
      duration,
      total: triggerTime - state.raceStart,
      at: triggerTime,
    });
    state.currentLapStart = triggerTime;
    renderLaps();
    updateBest();
  }

  els.btnLapManual.addEventListener('click', () => {
    if (!state.raceActive) return;
    recordLap(performance.now());
    haptic();
  });

  // ---------- race control ----------
  els.btnRaceStart.addEventListener('click', () => {
    if (!state.stream) { setStatus('Erst Kamera starten'); return; }
    state.laps = [];
    state.raceActive = true;
    state.raceStart = performance.now();
    state.currentLapStart = state.raceStart;
    state.lastTrigger = 0;
    state.machine = 0;
    renderLaps();
    els.lastLap.textContent = '--';
    setStatus('Rennen läuft');
  });
  els.btnRaceStop.addEventListener('click', () => {
    state.raceActive = false;
    setStatus('Rennen gestoppt');
  });
  els.btnReset.addEventListener('click', () => {
    state.raceActive = false;
    state.laps = [];
    state.raceStart = 0;
    state.currentLapStart = 0;
    state.machine = 0;
    renderLaps();
    els.raceTime.textContent = '00:00.000';
    els.currentLap.textContent = '00:00.000';
    els.lastLap.textContent = '--';
    els.bestLap.textContent = '--';
    setStatus('Zurückgesetzt');
  });
  els.armedToggle.addEventListener('change', e => {
    state.armed = e.target.checked;
    state.machine = 0;
    saveSettings(); // not strictly
  });

  function updateTimers() {
    if (!state.raceActive) {
      if (state.raceStart) {
        els.raceTime.textContent = fmt(performance.now() - state.raceStart);
      }
      return;
    }
    const now = performance.now();
    els.raceTime.textContent = fmt(now - state.raceStart);
    els.currentLap.textContent = fmt(now - state.currentLapStart);
    if (state.laps.length) {
      els.lastLap.textContent = fmt(state.laps[state.laps.length-1].duration);
    }
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
    // draw ROI
    if (state.roi) {
      const scaleX = w / state.procW, scaleY = h / state.procH;
      const r = state.roi;
      overlayCtx.strokeStyle = '#ff7a1a';
      overlayCtx.lineWidth = 2;
      overlayCtx.strokeRect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);
      overlayCtx.fillStyle = 'rgba(255,122,26,0.12)';
      overlayCtx.fillRect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);
    }
    if (state.drawing && state.roi) {
      // already
    }
    // crosshair hint
  }

  // ---------- init ----------
  function init() {
    initSettings();
    // initial overlay sizing
    const r = els.overlay.getBoundingClientRect();
    els.overlay.width = Math.round(r.width) || 320;
    els.overlay.height = Math.round(r.height) || 240;
    saveSettings();
    setStatus('Bereit – Kamera starten');
  }

  window.addEventListener('resize', () => { drawOverlay(); });
  init();
  // try to enumerate after potential permission later
})();
