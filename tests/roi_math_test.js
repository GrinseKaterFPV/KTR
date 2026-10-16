// Extracts the real ROI-mapping functions from app.js and verifies the
// invariant: drawing the same screen rectangle must stay on the same screen
// area, regardless of processing resolution / aspect ratio / orientation.
const fs = require('fs');
const path = require('path');
const APP = path.join(__dirname, '..', 'app.js');
const src = fs.readFileSync(APP, 'utf8');

function extract(name) {
  const key = 'function ' + name + '(';
  const start = src.indexOf(key);
  if (start < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('{', start), depth = 0, end = -1;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return src.slice(start, end);
}

const sandbox = {
  els: {
    video: { videoWidth: 640, videoHeight: 480 },
    overlay: {
      width: 360, height: 480,
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 360, height: 480 }),
      procRes: null,
    },
    procRes: { value: '320x240' },
    zoneHint: { style: {} },
  },
  procCanvas: { width: 0, height: 0 },
  state: { procW: 320, procH: 240, roi: null, exclusionRects: [], view: null },
  saveSettings: () => {},
  rebuildExclusionMap: () => {},
  syncMaskControls: () => {},
};

const code = [
  extract('computeView'), extract('currentView'), extract('toProc'), extract('applyProcRes'), extract('endDraw'),
].join('\n');
const factory = new Function(
  'els', 'procCanvas', 'state', 'saveSettings', 'rebuildExclusionMap', 'syncMaskControls',
  code + '\nreturn { computeView, currentView, toProc, applyProcRes, endDraw };'
);
const api = factory(sandbox.els, sandbox.procCanvas, sandbox.state, sandbox.saveSettings,
  sandbox.rebuildExclusionMap, sandbox.syncMaskControls);
const { state, els } = sandbox;
// The app finalises a drawn ROI through endDraw() (clamping it to the image),
// so the test must do the same instead of testing a raw hand-made rectangle.
function finalizeRoi() { state.drawing = true; state.view = null; api.endDraw(); }

function screenOfRoi() {
  const v = api.currentView();
  return { x: v.dx + state.roi.x * v.sx, y: v.dy + state.roi.y * v.sy, w: state.roi.w * v.sx, h: state.roi.h * v.sy };
}
const near = (a, b, eps = 0.75) => Math.abs(a - b) <= eps;
// Expected result of a drag: the drawn rect clipped to the camera image
// (that is what endDraw() does).
function expectedRect(x0, y0, x1, y1) {
  const v = api.currentView();
  const ix0 = Math.max(x0, v.dx), iy0 = Math.max(y0, v.dy);
  const ix1 = Math.min(x1, v.dx + v.dw), iy1 = Math.min(y1, v.dy + v.dh);
  return { x: ix0, y: iy0, w: ix1 - ix0, h: iy1 - iy0 };
}
function sameRect(a, b) {
  return near(a.x, b.x) && near(a.y, b.y) && near(a.w, b.w) && near(a.h, b.h);
}

let pass = 0, fail = 0;
function check(name, cond) { cond ? pass++ : fail++; console.log((cond ? 'PASS ' : 'FAIL ') + name); }

// --- Case A: portrait canvas, 4:3 video, draw a rect, then switch res ---
els.video.videoWidth = 640; els.video.videoHeight = 480;
els.procRes.value = '320x240';
api.applyProcRes();
state.roi = null;
const a0 = api.toProc({ x: 100, y: 150 });
const a1 = api.toProc({ x: 260, y: 400 });
state.roi = { x: Math.min(a0.x, a1.x), y: Math.min(a0.y, a1.y), w: Math.abs(a1.x - a0.x), h: Math.abs(a1.y - a0.y) };
finalizeRoi();
const before = screenOfRoi();
const preFixRoi = Object.assign({}, state.roi);   // same ROI, pre-rescale
state.exclusionRects = [{ x: 20, y: 30, w: 40, h: 25 }];
const beforeMask = {
  x: api.currentView().dx + state.exclusionRects[0].x * api.currentView().sx,
  y: api.currentView().dy + state.exclusionRects[0].y * api.currentView().sy,
  w: state.exclusionRects[0].w * api.currentView().sx,
  h: state.exclusionRects[0].h * api.currentView().sy,
};
check('A: drawn rect maps back onto the image', sameRect(before, expectedRect(100, 150, 260, 400)));

els.procRes.value = '480x360';
api.applyProcRes();
const after = screenOfRoi();
check('A: 320x240 -> 480x360 keeps the same screen rect',
  near(after.x, before.x) && near(after.y, before.y) && near(after.w, before.w) && near(after.h, before.h));
const scaledMask = state.exclusionRects[0];
const afterMask = {
  x: api.currentView().dx + scaledMask.x * api.currentView().sx,
  y: api.currentView().dy + scaledMask.y * api.currentView().sy,
  w: scaledMask.w * api.currentView().sx,
  h: scaledMask.h * api.currentView().sy,
};
check('A: exclusion mask keeps the same screen rect when processing resolution changes', sameRect(beforeMask, afterMask));

els.procRes.value = '320x240';
api.applyProcRes();
const back = screenOfRoi();
check('A: 480x360 -> 320x240 keeps the same screen rect',
  near(back.x, before.x) && near(back.y, before.y) && near(back.w, before.w) && near(back.h, before.h));

// --- Case F: control — the OLD behaviour (clamp only, no rescale) must fail,
// so we know this test really catches the bug it was written for.
state.procW = 480; state.procH = 360;
state.roi = preFixRoi;
const vf = api.currentView();
const preFixRect = { x: vf.dx + state.roi.x * vf.sx, y: vf.dy + state.roi.y * vf.sy, w: state.roi.w * vf.sx, h: state.roi.h * vf.sy };
check('F: pre-fix behaviour (no rescale) loses the screen rect', !sameRect(preFixRect, before));
state.procW = 320; state.procH = 240; state.roi = preFixRoi;

// --- Case B: 16:9 video in a portrait canvas (letterbox), 480x360 ---
els.video.videoWidth = 1280; els.video.videoHeight = 720;
els.procRes.value = '480x360';
api.applyProcRes();
state.view = null;
state.roi = null;
const b0 = api.toProc({ x: 90, y: 200 });
const b1 = api.toProc({ x: 300, y: 380 });
state.roi = { x: Math.min(b0.x, b1.x), y: Math.min(b0.y, b1.y), w: Math.abs(b1.x - b0.x), h: Math.abs(b1.y - b0.y) };
finalizeRoi();
const bb = screenOfRoi();
check('B: 16:9 in portrait, drawn rect lands clipped on the image',
  sameRect(bb, expectedRect(90, 200, 300, 380)));

// --- Case C: aspect mismatch (16:9 video vs 4:3 proc) round-trip identity ---
let ok = true;
for (const [sx, sy] of [[10, 140], [180, 240], [350, 470], [5, 5]]) {
  const p = api.toProc({ x: sx, y: sy });
  const v = api.currentView();
  const x2 = v.dx + p.x * v.sx, y2 = v.dy + p.y * v.sy;
  if (!near(x2, sx) || !near(y2, sy)) { ok = false; console.log('   mismatch', sx, sy, '->', x2, y2); }
}
check('C: screen -> proc -> screen is identity for 16:9 video', ok);

// --- Case D: view is stable even before the first processed frame ---
state.view = null;
check('D: currentView() computes a view without state.view', !!api.currentView());

// --- Case E: landscape canvas 16:9 video ---
els.video.videoWidth = 640; els.video.videoHeight = 480;
els.overlay.width = 800; els.overlay.height = 450;
els.overlay.getBoundingClientRect = () => ({ left: 0, top: 0, width: 800, height: 450 });
els.procRes.value = '480x360';
api.applyProcRes();
state.view = null;
const e0 = api.toProc({ x: 200, y: 120 });
const e1 = api.toProc({ x: 600, y: 330 });
state.view = null;
const v2 = api.currentView();
const x2 = v2.dx + e0.x * v2.sx, y2 = v2.dy + e0.y * v2.sy;
check('E: landscape round-trip identity', near(x2, 200) && near(y2, 120));

console.log('\n' + (fail === 0 ? 'ALL_OK true' : 'ALL_OK false') + '  pass=' + pass + ' fail=' + fail);
process.exit(fail === 0 ? 0 : 1);
