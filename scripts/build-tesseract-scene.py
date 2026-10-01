#!/usr/bin/env python3
"""
Build the model-over-scan scenes the /tesseract page cycles through.

Scenes (all ours, all already public elsewhere):
  office  the keel office full floor, bim.landexsystems.com/office (bim_site/data/office): the detailed
          "real look" parts in elements.json (walls cut at doors and glazing, frames, glass, leaves, lights)
  bridge  the Van Brienenoord main span: open AHN5 aerial LiDAR (CC0) cropped in astra_eval/inputs/
          brienenoord_span and the 233-element model from astra_eval/runs/bridge_v1, same local frame
  shell   the Rohbau3D 07000 shell under construction, bim.landexsystems.com/shell
          (bim_site/data/rohbau_07000; scan CC BY 4.0, credited on the page)

Everything is drawn in its real look, the bim site's palette (plaster, concrete, glass, steel, lit
fittings), each element blended with the colour of the scan points it sits on, so the model reads as the
building rather than as a class map. Points ship in true colour. Floors and ceilings of the office and
ceilings of the shell are left out so the orbiting camera looks into the building.

Output, one folder per scene (public/tesseract-scene/<id>/):
  cloud.bin      headerless little-endian uint16 q[3N] (quantised to lo/hi), then uint8 rgb[3N]
  manifest.json  count, lo/hi (already centred), point size, camera distance
  model.json     {groups: [{kind: solid|glass|light, p: [xyz...], i: [tri...], c: [rgb per vertex...]}]}

Regenerate: python3 scripts/build-tesseract-scene.py
"""

import json
import math
import os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
EVAL = os.path.normpath(os.path.join(REPO, "..", "astra_eval"))
BIM_SITE = os.path.normpath(os.path.join(REPO, "..", "bim_site", "data"))
OUT = os.path.join(REPO, "public", "tesseract-scene")

MAX_POINTS = 480_000
SEED = 7

# --- the real-look palette (bim_site/office.html ARCH / SUBS) ----------------------------------
# name: (colour, opacity, blend the measured scan colour)
STYLE = {
    "Wall": (0xE8E2D6, 1, True), "Window": (0x9CCBE6, 0.35, False), "Frame": (0x3A3D42, 1, False),
    "Door": (0xA5703E, 1, True), "Metal": (0xB9BCC2, 1, False), "Slab": (0x6F7378, 1, True),
    "Column": (0xC8C4BC, 1, True), "Beam": (0xC8C4BC, 1, True), "Other": (0xB8B4AD, 1, True),
    "Duct": (0xB4B8BD, 1, False), "Conduit": (0x5A5D61, 1, False), "Pipe": (0x8E9AA6, 1, False),
    "Light": (0xFFF3D6, 1, False), "Device": (0xF0F0F0, 1, False), "Panel": (0x9AA0A6, 1, True),
    "Equipment": (0xB0B4B8, 1, True),
    # civil
    "Steel": (0xB9BCC2, 1, True), "Asphalt": (0x55585C, 1, True), "Concrete": (0xC8C4BC, 1, True),
}
SUB_STYLE = {
    ("Wall", "glazed_partition"): "Window", ("Beam", "bulkhead"): (0xF3F0E8, 1, True),
    ("Column", "steel"): (0x8D9298, 1, False), ("Pipe", "sprinkler_main"): (0xC0392B, 1, False),
    ("Pipe", "sprinkler_branch"): (0xC0392B, 1, False), ("Pipe", "chilled_water"): (0x2E86C1, 1, False),
    ("Pipe", "heating"): (0xD35400, 1, False),
}
BLEND = 0.75  # how much of the scan colour a blended element takes


def style_of(cls, sub=None):
    s = SUB_STYLE.get((cls, sub))
    if isinstance(s, str):
        s = STYLE[s]
    return s or STYLE.get(cls) or STYLE["Other"]


def hex_rgb(h):
    return np.array([(h >> 16) & 255, (h >> 8) & 255, h & 255], float)


# --- scan colour lookup: mean colour per voxel ---------------------------------------------------

class ColourField:
    def __init__(self, xyz, rgb, voxel):
        self.v = voxel
        k = self._keys(xyz)
        self.keys, inv = np.unique(k, return_inverse=True)
        n = np.bincount(inv)
        self.rgb = np.stack([np.bincount(inv, rgb[:, c].astype(float)) / n for c in range(3)], 1)

    def _keys(self, p):
        ijk = np.floor(np.asarray(p) / self.v).astype(np.int64) + (1 << 20)
        return (ijk[:, 0] << 42) | (ijk[:, 1] << 21) | ijk[:, 2]

    def sample(self, pts):
        """Mean scan colour at the given points, or None when none of them land in a scanned voxel."""
        if len(pts) == 0:
            return None
        k = self._keys(pts)
        j = np.clip(np.searchsorted(self.keys, k), 0, len(self.keys) - 1)
        hit = self.keys[j] == k
        return self.rgb[j[hit]].mean(0) if hit.any() else None


# --- triangulation ------------------------------------------------------------------------------

def ear_clip(poly2):
    """Triangles (index triples) for a simple polygon, any winding."""
    n = len(poly2)
    if n < 3:
        return []
    P = np.asarray(poly2, float)
    area = 0.5 * sum(P[i, 0] * P[(i + 1) % n, 1] - P[(i + 1) % n, 0] * P[i, 1] for i in range(n))
    idx = list(range(n)) if area > 0 else list(range(n))[::-1]

    def cross(a, b, c):
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

    def inside(p, a, b, c):
        return cross(a, b, p) >= 0 and cross(b, c, p) >= 0 and cross(c, a, p) >= 0

    tris, guard = [], 0
    while len(idx) > 3 and guard < 10 * n:
        guard += 1
        for k in range(len(idx)):
            i0, i1, i2 = idx[k - 1], idx[k], idx[(k + 1) % len(idx)]
            a, b, c = P[i0], P[i1], P[i2]
            if cross(a, b, c) <= 1e-12:
                continue
            if any(inside(P[j], a, b, c) for j in idx if j not in (i0, i1, i2)):
                continue
            tris.append((i0, i1, i2))
            idx.pop(k)
            break
        else:
            break  # degenerate leftovers: fan the rest
    for k in range(1, len(idx) - 1):
        tris.append((idx[0], idx[k], idx[k + 1]))
    return tris


class Part:
    """One element's triangles, before it is coloured."""

    def __init__(self):
        self.p, self.i = [], []

    def add(self, verts, tris):
        base = len(self.p)
        self.p.extend([[float(c) for c in v] for v in verts])
        self.i.extend([[a + base, b + base, c + base] for a, b, c in tris])
        return self

    def prism(self, bottom, top):
        n = len(bottom)
        caps = ear_clip([v[:2] for v in bottom])
        self.add(bottom, caps)
        self.add(top, caps)
        side = []
        for k in range(n):
            j = (k + 1) % n
            side += [(k, j, n + j), (k, n + j, n + k)]
        return self.add(list(bottom) + list(top), side)

    def sweep(self, pts, w, h, sides):
        P = np.asarray(pts, float)
        if len(P) < 2:
            return self
        rings = []
        for k in range(len(P)):
            t = P[min(k + 1, len(P) - 1)] - P[max(k - 1, 0)]
            t /= np.linalg.norm(t) or 1
            ref = np.array([0, 0, 1.0]) if abs(t[2]) < 0.9 else np.array([1.0, 0, 0])
            u = np.cross(ref, t)
            u /= np.linalg.norm(u) or 1
            v = np.cross(t, u)
            if sides == 4:
                offs = [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]
            else:
                offs = [(w / 2 * math.cos(2 * math.pi * s / sides), h / 2 * math.sin(2 * math.pi * s / sides)) for s in range(sides)]
            rings.append([P[k] + a * u + b * v for a, b in offs])
        m = len(rings[0])
        tris = []
        for k in range(len(rings) - 1):
            for s in range(m):
                a, b = k * m + s, k * m + (s + 1) % m
                tris += [(a, b, b + m), (a, b + m, a + m)]
        for ring, flip in ((0, False), (len(rings) - 1, True)):  # end caps
            for s in range(1, m - 1):
                t3 = (ring * m, ring * m + s, ring * m + s + 1)
                tris.append((t3[0], t3[2], t3[1]) if flip else t3)
        return self.add([v for r in rings for v in r], tris)

    def box(self, c, size, yaw_deg, pitch_deg=0.0):
        """Oriented box: pitch about y, then yaw about z (three.js Euler order ZYX, as the bim site draws it)."""
        sx, sy, sz = (max(float(v), 0.02) / 2 for v in size[:3])
        cy, sy_ = math.cos(math.radians(yaw_deg)), math.sin(math.radians(yaw_deg))
        cp, sp = math.cos(math.radians(-pitch_deg)), math.sin(math.radians(-pitch_deg))
        R = np.array([[cy, -sy_, 0], [sy_, cy, 0], [0, 0, 1]]) @ np.array([[cp, 0, sp], [0, 1, 0], [-sp, 0, cp]])
        corners = np.array([[x, y, z] for z in (-sz, sz) for x, y in ((-sx, -sy), (sx, -sy), (sx, sy), (-sx, sy))])
        F = [(0, 2, 1), (0, 3, 2), (4, 5, 6), (4, 6, 7)]
        for k in range(4):
            j = (k + 1) % 4
            F += [(k, j, 4 + j), (k, 4 + j, 4 + k)]
        return self.add(corners @ R.T + np.asarray(c, float), F)

    def samples(self, n=48, rng=np.random.default_rng(SEED)):
        """Points spread over the part's surface, area-weighted, for the scan colour lookup."""
        if not self.i:
            return np.zeros((0, 3))
        P, I = np.asarray(self.p), np.asarray(self.i)
        a, b, c = P[I[:, 0]], P[I[:, 1]], P[I[:, 2]]
        area = np.linalg.norm(np.cross(b - a, c - a), axis=1)
        if area.sum() <= 0:
            return P
        pick = rng.choice(len(I), n, p=area / area.sum())
        r1, r2 = rng.random((2, n))
        s = np.sqrt(r1)
        return (1 - s)[:, None] * a[pick] + (s * (1 - r2))[:, None] * b[pick] + (s * r2)[:, None] * c[pick]


class Model:
    """Coloured parts, grouped by how they are drawn."""

    def __init__(self, field):
        self.field = field
        self.groups = {"solid": ([], [], []), "glass": ([], [], []), "light": ([], [], [])}

    def put(self, part, style, scan_rgb=None):
        if not part.i:
            return
        colour, opacity, blend = style
        rgb = hex_rgb(colour)
        if blend:
            measured = scan_rgb if scan_rgb is not None else (self.field.sample(part.samples()) if self.field else None)
            if measured is not None:
                rgb = rgb + (np.asarray(measured, float) - rgb) * BLEND
        kind = "light" if style is STYLE["Light"] else "glass" if opacity < 1 else "solid"
        P, I, C = self.groups[kind]
        base = len(P) // 3
        for v in part.p:
            P.extend(v)
            C.extend(int(round(x)) for x in rgb)
        for t in part.i:
            I.extend(x + base for x in t)


def write_scene(sid, xyz, rgb, centre, model, point_size, dist):
    rng = np.random.default_rng(SEED)
    if len(xyz) > MAX_POINTS:
        keep = np.sort(rng.choice(len(xyz), MAX_POINTS, replace=False))
        xyz, rgb = xyz[keep], rgb[keep]
    xyz = xyz - centre
    lo, hi = xyz.min(0), xyz.max(0)
    q = np.round((xyz - lo) / (hi - lo) * 65535).astype("<u2")
    out = os.path.join(OUT, sid)
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "cloud.bin"), "wb") as f:
        f.write(q.tobytes())
        f.write(np.ascontiguousarray(rgb, np.uint8).tobytes())
    groups = []
    for kind, (P, I, C) in model.groups.items():
        if I:
            p = (np.asarray(P).reshape(-1, 3) - centre).round(2).ravel().tolist()
            groups.append({"kind": kind, "p": p, "i": I, "c": C})
    json.dump({"groups": groups}, open(os.path.join(out, "model.json"), "w"), separators=(",", ":"))
    json.dump(
        {"count": int(len(xyz)), "lo": lo.round(3).tolist(), "hi": hi.round(3).tolist(), "point_size": point_size, "dist": dist},
        open(os.path.join(out, "manifest.json"), "w"),
        indent=1,
    )
    sz = lambda f: os.path.getsize(os.path.join(out, f)) / 1e6
    print(f"{sid}: {len(xyz):,} points ({sz('cloud.bin'):.1f} MB), model {sz('model.json'):.1f} MB")


def bim_site_cloud(folder, drop):
    src = os.path.join(BIM_SITE, folder)
    meta = json.load(open(os.path.join(src, "meta.json")))
    raw = open(os.path.join(src, "cloud.bin"), "rb").read()
    N = meta["n"]
    q = np.frombuffer(raw, np.uint16, N * 3, 0).reshape(N, 3).astype(np.float64)
    rgb = np.frombuffer(raw, np.uint8, N * 3, N * 6).reshape(N, 3)
    lab = np.frombuffer(raw, np.uint8, N, N * 9)
    lo, hi = np.array(meta["lo"]), np.array(meta["hi"])
    xyz = lo + q / 65535 * (hi - lo)
    keep = ~np.isin(lab, [i for i, n in enumerate(meta["classes"]) if n in drop])
    return xyz[keep], rgb[keep]


def plan_centre(xyz):
    return np.array([(xyz[:, 0].min() + xyz[:, 0].max()) / 2, (xyz[:, 1].min() + xyz[:, 1].max()) / 2,
                     (np.percentile(xyz[:, 2], 2) + np.percentile(xyz[:, 2], 98)) / 2])


# --- the scenes ---------------------------------------------------------------------------------

def office_scene():
    """The detailed parts the bim site's office page draws in its real look; no floor, no ceilings."""
    xyz, rgb = bim_site_cloud("office", {"ceiling"})
    els = json.load(open(os.path.join(BIM_SITE, "office", "elements.json")))
    model = Model(None)  # every part already carries its measured scan colour (rgb)
    for e in els:
        if e["grp"] in ("Floor", "Ceiling"):
            continue
        part = Part()
        if e.get("sweep") and len(e["sweep"].get("p") or []) >= 2:
            s = e["sweep"]
            part.sweep(s["p"], s["w"], s["h"], 12 if s.get("shape") == "circle" else 4)
        elif e.get("polygon") and len(e["polygon"]) >= 3:
            z0 = e["z0"]
            z1 = e.get("z1") if e.get("z1") is not None else z0 + 0.05
            part.prism([(x, y, z0) for x, y in e["polygon"]], [(x, y, z1) for x, y in e["polygon"]])
        elif e.get("center") and e.get("size"):
            part.box(e["center"], e["size"], e.get("yaw_deg") or 0, e.get("pitch_deg") or 0)
        model.put(part, style_of(e["cls"], e.get("sub")), e.get("rgb"))
    write_scene("office", xyz, rgb, plan_centre(xyz), model, 0.05, 46)


SHELL_STYLE = {
    "Slab": "Slab", "Wall": "Wall", "Column": "Column", "Beam": "Beam", "Cable tray": "Metal",
    "Conduit": "Conduit", "Facade": "Metal", "Channel": "Metal", "Window opening": "Window",
}


def shell_scene():
    """Element boxes; door openings are left as the holes they are."""
    xyz, rgb = bim_site_cloud("rohbau_07000", {"ceiling"})
    model = Model(ColourField(xyz, rgb, 0.25))
    for b in json.load(open(os.path.join(BIM_SITE, "rohbau_07000", "model.json")))["boxes"]:
        name = SHELL_STYLE.get(b["cls"])
        if name is None or (b["cls"] == "Slab" and (b.get("ceiling") or b["c"][2] > 2)):  # the soffit is the ceiling
            continue
        model.put(Part().box(b["c"], b["s"], b["yaw"]), STYLE[name])
    write_scene("shell", xyz, rgb, plan_centre(xyz), model, 0.07, 62)


def bridge_style(e):
    t, s = (e.get("type") or "").lower(), (e.get("subtype") or "").lower()
    if t in ("pier", "pier_cap", "abutment", "wing_wall", "footing", "fender", "superstructure_surface", "kerb", "reserve"):
        return STYLE["Concrete"]
    if t == "deck":
        return STYLE["Asphalt"]
    if t in ("parapet", "barrier") or (t == "member" and s in ("lighting_column", "gantry")):
        return STYLE["Metal"]
    if t == "member":
        return STYLE["Steel"]
    if t == "equipment" and s == "light":
        return STYLE["Light"]
    return STYLE["Equipment"]


def section(s, dflt):
    """(sides, w, h) of a member section."""
    s = s or {}
    if s.get("shape") in ("circle", "tube", "cable") or (s.get("d") and not s.get("outer_width")):
        d = float(s.get("d") or s.get("outer_width") or dflt)
        return 12, d, d
    w = float(s.get("outer_width") or s.get("d") or dflt)
    return 4, w, float(s.get("outer_depth") or w)


def bridge_scene():
    d = np.load(os.path.join(EVAL, "inputs", "brienenoord_span", "cloud.npz"))
    xyz, rgb = d["xyz"].astype(np.float64), d["rgb"]
    model = Model(ColourField(xyz, rgb, 1.5))
    elements = json.load(open(os.path.join(EVAL, "runs", "bridge_v1", "brienenoord_span", "bim", "model.json")))["elements"]
    for e in elements:
        g = e.get("geometry") or {}
        r = g.get("representation")
        part = Part()
        if r == "member" and g.get("axis_3d"):
            sides, w, h = section(g.get("section"), 0.3)
            part.sweep(g["axis_3d"], w, h, sides)
        elif r == "run" and g.get("polyline"):
            w, h = float(g.get("width") or 0.3), float(g.get("height_above_deck") or 1.0)
            part.sweep([[q[0], q[1], q[2] - h / 2] for q in g["polyline"]], w, h, 4)  # the polyline is the top
        elif r == "prism" and len(g.get("outline") or []) >= 3:
            z0, z1 = float(g["bottom_z"]), float(g["top_z"])
            part.prism([(q[0], q[1], z0) for q in g["outline"]], [(q[0], q[1], z1) for q in g["outline"]])
        elif r == "slab" and len(g.get("top_vertices") or []) >= 3:
            th = float(g.get("thickness") or 0.1)
            top = [tuple(q) for q in g["top_vertices"]]
            part.prism([(x, y, z - th) for x, y, z in top], top)
        elif r == "surface_mesh" and g.get("vertices") and g.get("triangles"):
            part.add(g["vertices"], [tuple(t) for t in g["triangles"]])
        elif r == "box" and g.get("center") and g.get("size"):
            part.box(g["center"], g["size"], float(g.get("yaw_deg") or 0), float(g.get("pitch_deg") or 0))
        model.put(part, bridge_style(e))
    # centre on the bridge: middle of the crop in plan, deck height in z
    centre = np.array([(xyz[:, 0].min() + xyz[:, 0].max()) / 2, (xyz[:, 1].min() + xyz[:, 1].max()) / 2, 25.0])
    write_scene("bridge", xyz, rgb, centre, model, 0.55, 430)


def main():
    office_scene()
    bridge_scene()
    shell_scene()


if __name__ == "__main__":
    main()
