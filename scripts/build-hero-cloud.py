#!/usr/bin/env python3
"""
Build the hero point cloud that ships to the browser.

Source: the owner_demo_v1 rohbau_02005 bundle ("Structural shell — frame &
MEP": exposed beams, columns, cutouts). It's a documented per-point cloud with
positions, a semantic class label, and true RGB. We deliberately ship ONLY
positions + class label. RGB, provenance, keyframe JPEGs, and any embeddings
are never written here, so nothing reverse-engineerable leaves the pipeline —
the browser gets white dots + a class id each, nothing more.

Output (public/hero-cloud/):
  cloud.bin      — headerless, little-endian: float32 pos[3N], uint16 label[N].
                   Offsets are the plain 0 / 12N.
  manifest.json  — count, byte offsets, bounds, and the present-class table
                   {id, name, hex} (palette colors, used only when highlighting).

Regenerate: python3 scripts/build-hero-cloud.py
The source bundle lives outside this repo (see SRC below) and is not committed.
"""

import json
import os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.normpath(os.path.join(
    REPO, "..", "owner_demo_v1", "owner", "public", "scenes", "rohbau_02005"))
OUT = os.path.join(REPO, "public", "hero-cloud")

SCENE_INDEX = 0

# Per-class point budget. Enclosure classes are capped hard (they're just
# context for the rotation); the frame + MEP classes we want highlightable
# keep more points so a query lights up something crisp. The cutout classes
# are tiny and kept in full via DEFAULT_CAP.
CAPS = {
    "wall": 28000,
    "ceiling": 16000,
    "floor": 16000,
    "unlabelled": 8000,
    "beam": 42000,
    "column": 22000,
    "tga": 22000,
}
DEFAULT_CAP = 20000
SEED = 7


def main():
    manifest = json.load(open(os.path.join(SRC, "manifest.json")))
    classes = manifest["classes"]
    id_to_name = {c["id"]: c["name"] for c in classes}
    id_to_hex = {c["id"]: c["hex"] for c in classes}
    name_to_cap = CAPS

    scene = manifest["scenes"][SCENE_INDEX]
    n = scene["pointCount"]
    off = scene["offsets"]
    buf = open(os.path.join(SRC, scene["file"]), "rb").read()

    pos = np.frombuffer(buf, "<f4", 3 * n, offset=off["position"]).reshape(n, 3)
    lab = np.frombuffer(buf, "<u2", n, offset=off["label"])
    rgb = np.frombuffer(buf, "u1", 3 * n, offset=off["rgb"]).reshape(n, 3)

    rng = np.random.default_rng(SEED)

    keep_idx = []
    for cid in np.unique(lab):
        idx = np.where(lab == cid)[0]
        cap = name_to_cap.get(id_to_name.get(int(cid), ""), DEFAULT_CAP)
        if len(idx) > cap:
            idx = rng.choice(idx, size=cap, replace=False)
        keep_idx.append(idx)
    keep = np.concatenate(keep_idx)
    rng.shuffle(keep)  # break class-contiguous ordering so draw isn't banded

    pos = pos[keep].astype("<f4")
    lab = lab[keep].astype("<u2")

    # Source frame is x-right, y-DOWN, z-forward. Flip y so world-up is +y and
    # standard three.js OrbitControls (up = 0,1,0) just works. Center on the
    # kept-point centroid so the cloud rotates about itself.
    pos[:, 1] *= -1.0
    center = pos.mean(axis=0)
    pos = (pos - center).astype("<f4")

    m = int(len(keep))
    lo = pos.min(axis=0).tolist()
    hi = pos.max(axis=0).tolist()
    diag = float(np.linalg.norm(np.array(hi) - np.array(lo)))

    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "cloud.bin"), "wb") as f:
        f.write(pos.tobytes())
        f.write(lab.tobytes())

    present = sorted(int(c) for c in np.unique(lab))
    out_manifest = {
        "count": m,
        "offsets": {"position": 0, "label": 12 * m},
        "bounds": {"min": lo, "max": hi, "diag": diag},
        "classes": [
            {"id": cid, "name": id_to_name[cid], "hex": id_to_hex[cid]}
            for cid in present
        ],
    }
    json.dump(out_manifest, open(os.path.join(OUT, "manifest.json"), "w"), indent=2)

    print(f"wrote {m:,} points -> {OUT}/cloud.bin "
          f"({(12*m + 2*m)/1e6:.2f} MB), {len(present)} classes")
    counts = {id_to_name[int(c)]: int((lab == c).sum()) for c in present}
    top = sorted(counts.items(), key=lambda kv: -kv[1])[:14]
    for name, cnt in top:
        print(f"  {name:>14}: {cnt:,}")


if __name__ == "__main__":
    main()
