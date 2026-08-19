# Embedding a real 3D model on the landing page

Feasibility notes + a recommendation. Written 2026 while the hero shows a
**static screenshot** of the viewer (`/assets/product-photo-july.png`) and the
background is a **decorative 2D point field** (`components/PointField`). The
question: can we put an *actual* interactive model on the page?

## TL;DR

Yes — and we're already 80% set up for it: **`three@0.183.2` is a dependency**
(Vanta uses it on `/smb`, loaded client-only via `dynamic import`). So we can
render a real model with zero new hard dependencies.

**Recommendation:** ship it in two phases.

1. **Phase 1 — orbitable point cloud** of a real scanned space, decimated to
   ~200–400k points, rendered with the `three` we already have, **lazy-loaded
   in its own "See it live" section** (not the hero — protect LCP). Static
   screenshot stays as the poster/fallback. ~1–2 days.
2. **Phase 2 — the actual product** — attach per-element **labels + click/hover
   raycasting** so pointing at a pipe reads back "4-inch CHW → LP-2". This is
   the whole value prop made interactive. ~3–5 days once we have a labeled
   export.

Do **not** make the model the hero's LCP element. Keep the screenshot as the
first paint; reveal the live model on scroll or behind a "Launch viewer" click.

## What "a model" can mean here (pick one to start)

| Option | What it is | Fidelity to Landex | Size (web) | Effort | Notes |
|---|---|---|---|---|---|
| **Decimated point cloud** | Real scan, downsampled `THREE.Points` | ★★★★★ (this *is* the input) | 3–12 MB | Low–Med | Most authentic; reuses `three`. **Recommended start.** |
| **glTF/`.glb` mesh** | Clean labeled mesh (Draco/meshopt) | ★★★☆ (stylized, not the raw output) | 1–6 MB | Low | Best tooling (`<model-viewer>`, drei). Most *controllable* demo. |
| **Gaussian splat** | Photoreal radiance field | ★★★☆ (photoreal, but not "labeled") | 15–60 MB | Med–High | Gorgeous, heavy, off-message (we sell *labels*, not photos). |
| **Potree cloud** | Streamed octree of a huge cloud | ★★★★★ | streams GB | High | Overkill for a landing page; great for the actual app. |
| **Pre-rendered turntable video** | `.webm`/`.mp4` loop of the model spinning | ★★★☆ | 2–8 MB | Very low | Not interactive, but a cheap "looks alive" win. Good stopgap. |

## Rendering approaches on *this* stack (Next 16, app router)

- **Raw `three` (recommended).** We already import it. A `THREE.Points` +
  `OrbitControls` scene is ~120 lines. No new deps, smallest footprint, full
  control over point size/color/label overlays. Mirrors the `PointField`
  canvas work already in the repo.
- **react-three-fiber + drei.** Nicer DX (`<Canvas>`, `<OrbitControls>`,
  `<Points>`, `<Html>` labels). Adds ~40–50 KB gz. Worth it *if* Phase 2 labels
  get complex — `drei`'s `<Html>` and `<Bvh>` raycasting save real time.
- **`<model-viewer>` web component.** Lowest effort for a **mesh** `.glb`
  (orbit, lighting, AR, lazy-load, poster all built in). **Poor fit for point
  clouds** — it's a glTF viewer. Use only if we go the mesh route.

All three must be **client-only**. Follow the pattern already in
`src/app/smb/page.tsx`: `"use client"` + `useEffect` init, or
`dynamic(() => import('./Viewer'), { ssr: false })`. Keep `three` out of the
initial bundle via dynamic import so first load doesn't pay for it.

## The data reality (the real gating factor)

We have **no model file in the repo today** — this needs an export from the
Landex pipeline. Practical targets for the web:

- **Point cloud:** raw scans are 10M–1B+ points / hundreds of MB–GB. Decimate
  (voxel downsample) to **200k–400k points**. Serve as a compact binary
  (packed `Float32` position + `Uint8` color buffer, or `.ply`/`.pcd`, or a
  `.splat`). Target **< 10 MB gzipped**. Load once with `fetch` +
  `THREE.BufferGeometry`.
- **Mesh:** export `.glb`, compress with **Draco or meshopt**. Target
  **< 5 MB**.
- **Labels (Phase 2):** a small JSON sidecar — `[{ id, label, system, bbox |
  centroid, points[] }]` — so we can raycast a click to an element and show its
  name. This is the piece that turns a pretty demo into *the product*.

Pick **one representative room/floor**, not a whole building — small, fast,
tells the story.

## Performance & UX guardrails (non-negotiable)

- **Protect LCP.** Hero stays the screenshot. Live model loads lazily
  (IntersectionObserver / on-click), never blocking first paint.
- **Poster + fallback.** Show `product-photo-july.png` until the model is ready;
  keep it on mobile / low-power / WebGL-unavailable.
- **`prefers-reduced-motion`:** no auto-spin; render a static framed view.
- **Cap it:** DPR ≤ 2, pause `requestAnimationFrame` when offscreen or tab
  hidden (we already do this in `PointField`), throttle point count on mobile.
- **Bundle:** dynamic-import the viewer chunk so `three` (~150 KB gz) isn't in
  the initial JS.

## Where it should live

1. **Best:** a dedicated **"See it live"** section (could replace or sit under
   the current hero screenshot) — "Drag to orbit. Click a part." A clear
   interactive beat, not competing with the headline.
2. **Or:** swap the hero's static panel for the live model **after** it's loaded
   (screenshot → fade to canvas), only once perf is validated.
3. **Nice bridge:** the existing `PointField` could morph from decorative noise
   into the *actual* scanned cloud on scroll — a strong thematic transition, but
   more work.

## Phased plan

- **Phase 0 (½ day):** get one decimated cloud/`.glb` of a real room out of the
  pipeline. *This is the blocker — everything else is ready.*
- **Phase 1 (1–2 days):** `components/Viewer` — dynamic-imported `three` scene,
  `THREE.Points` + `OrbitControls`, poster fallback, reduced-motion + mobile
  guards, lazy mount. Drop into a "See it live" section.
- **Phase 2 (3–5 days):** label JSON + raycasting; hover/click highlights an
  element and shows "what it is → what it connects to". Optional: a query bar
  that filters/hilites ("show every sprinkler head") — ties directly to the
  "What you can ask it" section.

## Risks / watch-outs

- **File size vs. fidelity** — the tension is real; decimation + one room keeps
  it honest.
- **WebGL support / mobile GPUs** — always keep the poster fallback.
- **SSR** — anything touching `window`/WebGL must be client-only + dynamic.
- **Message drift** — a photoreal splat looks cool but undersells that our
  differentiator is *labels*, not pictures. Favor point cloud + labels.
- **Maintenance** — a real export needs a repeatable way to regenerate as the
  product evolves; don't hand-massage a one-off.

## What I need from you to build Phase 1

1. One exported model of a representative room — decimated point cloud
   (`.ply`/`.pcd`/packed binary) **or** a `.glb` mesh, ideally < 10 MB.
2. (Phase 2) the per-element label sidecar JSON.
3. A call on placement: dedicated "See it live" section vs. swapping the hero
   panel.

Give me a file that fits and I can have Phase 1 on the page quickly — the
rendering stack is already here.
