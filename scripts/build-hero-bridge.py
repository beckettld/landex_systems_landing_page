#!/usr/bin/env python3
"""
Build the homepage hero scene: the Van Brienenoord main span (open AHN5 aerial LiDAR, CC0), every point
carrying the bridge part it belongs to (arch rib, deck, lighting column, ...), so a hero question can light
its part up. The 233-element model the "convert this scan" ask fades in is NOT copied here: the hero reads
the one /tesseract already serves (public/tesseract-scene/bridge/model.json, built by
build-tesseract-scene.py in the same local frame).

Source: the demo.landexsystems.com bridge bundle (owner_demo bridge_scene), whose per-point labels are the
model's elements (nearest element surface within 0.6 m). Its frame is y-down; the tesseract frame is
z-up, centred in plan, deck at z = 0 (raw z - 25). Points are written Y-up for the hero:
    tesseract (x, y, z) = (bx, bz, -by - 25)    hero (x, y, z) = (tx, tz, -ty)

Output public/hero-bridge/:
  cloud.bin      float32 xyz[3N] at offsets.position, uint16 label[N] at offsets.label
  manifest.json  count, offsets, bounds, classes, view (camera distance, slope, point size)

Regenerate: python3 scripts/build-hero-bridge.py   (needs numpy)
"""

import json
import os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.normpath(os.path.join(REPO, "..", "owner_demo_bridge_wt", "owner", "public", "scenes", "bridge_scene"))
OUT = os.path.join(REPO, "public", "hero-bridge")

MAX_POINTS = 340_000
SEED = 7
# Parts a hero question lights up keep every point; the rest is thinned to fit the budget.
KEEP_ALL = {"arch_rib", "lighting_column", "portal_frame", "sign_gantry", "pier", "pier_head"}


def main():
    m = json.load(open(os.path.join(SRC, "manifest.json")))
    s = m["scenes"][0]
    n = s["pointCount"]
    raw = open(os.path.join(SRC, s["file"]), "rb").read()
    b = np.frombuffer(raw, np.float32, n * 3, s["offsets"]["position"]).reshape(n, 3).astype(np.float64)
    lab = np.frombuffer(raw, np.uint16, n, s["offsets"]["label"]).copy()

    t = np.c_[b[:, 0], b[:, 2], -b[:, 1] - 25.0]          # tesseract frame, z-up
    xyz = np.c_[t[:, 0], t[:, 2], -t[:, 1]].astype(np.float32)  # hero frame, Y-up

    names = {c["id"]: c["name"] for c in m["classes"]}
    must = np.isin(lab, [i for i, nm in names.items() if nm in KEEP_ALL])
    rest = np.flatnonzero(~must)
    rng = np.random.default_rng(SEED)
    take = max(0, MAX_POINTS - int(must.sum()))
    keep = np.sort(np.concatenate([np.flatnonzero(must), rng.choice(rest, min(take, len(rest)), replace=False)]))
    xyz, lab = xyz[keep], lab[keep]

    os.makedirs(OUT, exist_ok=True)
    pos_bytes = xyz.astype("<f4").tobytes()
    with open(os.path.join(OUT, "cloud.bin"), "wb") as f:
        f.write(pos_bytes)
        f.write(lab.astype("<u2").tobytes())
    lo, hi = xyz.min(0), xyz.max(0)
    present = set(np.unique(lab).tolist())
    manifest = {
        "count": int(len(xyz)),
        "offsets": {"position": 0, "label": len(pos_bytes)},
        "bounds": {"min": lo.round(3).tolist(), "max": hi.round(3).tolist(), "diag": float(np.linalg.norm(hi - lo))},
        "classes": [{"id": c["id"], "name": c["name"], "hex": c["hex"]} for c in m["classes"] if c["id"] in present],
        # the span is long and low: come in on the long side, a little above the deck
        "view": {"dist": 1.0, "polar": 66, "size": 0.05, "target": [0, 6, 0]},
        "model": "/tesseract-scene/bridge/model.json",
        "credit": "Scan: AHN5 (CC0)",
    }
    json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), indent=1)
    print(f"hero-bridge: {len(xyz):,} points, {os.path.getsize(os.path.join(OUT, 'cloud.bin')) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
