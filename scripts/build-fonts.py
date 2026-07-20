#!/usr/bin/env python3
"""
Self-host the icon font, small.

Material Symbols' full static instance is ~361 KB and pulls in every icon (and
when served as the variable font, ~5 MB). This subsets it down to only the icons
the site actually renders, so it can be preloaded and shown with
font-display:optional (no FOIT/flash, no layout shift, and it clears Lighthouse's
font-display audit).

Also measures Inter's real metrics and prints an "Inter Fallback" @font-face with
ascent/descent/size-adjust overrides so swapping Inter in causes no reflow (CLS).

Run from repo root:  python3 scripts/build-fonts.py

Input: a full Material Symbols Rounded font at /tmp/cwfonts/ms-static.woff2. If it
is missing (e.g. /tmp was cleared), the subset can't be rebuilt and silently goes
stale as new icons are added. Recreate it by pinning the variable font to a static
instance:
  curl -sL 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsRounded%5BFILL%2CGRAD%2Copsz%2Cwght%5D.woff2' -o /tmp/cwfonts/ms-variable.woff2
  python3 -c "from fontTools.ttLib import TTFont; from fontTools.varLib.instancer import instantiateVariableFont as inst; f=TTFont('/tmp/cwfonts/ms-variable.woff2'); inst(f, {'FILL':0,'wght':400,'GRAD':0,'opsz':24}, inplace=True); f.flavor='woff2'; f.save('/tmp/cwfonts/ms-static.woff2')"
"""

import re
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT_DIR = ROOT / "static" / "assets" / "fonts"
MS_IN = Path("/tmp/cwfonts/ms-static.woff2")
INTER_IN = Path("/tmp/cwfonts/inter400.woff2")

# ---- 1. Collect every icon name actually rendered -------------------------
# Matches <span class="...material-symbols-rounded...">name</span>, tolerating
# extra classes/attrs, PLUS dynamic icon names declared as `icon: 'name'` or
# `ic: 'name'` in data arrays (e.g. the Header products menu renders {p.icon},
# agCharts.ts builds icon spans via innerHTML from `ic:` props). .ts files are
# scanned too - chart/viewer modules inject icons outside any .svelte template.
ICON_RE = re.compile(
    r'class="[^"]*material-symbols-rounded[^"]*"[^>]*>\s*([a-z0-9_]+)\s*<', re.I
)
ICON_PROP_RE = re.compile(r"\b(?:icon|ic):\s*'([a-z0-9_]+)'")
# `DEFAULT_NEWS_ICON = 'campaign'`-style constants in .ts modules.
ICON_CONST_RE = re.compile(r"\bICON\w*\s*=\s*'([a-z0-9_]+)'")
# `"icon": "gavel"` in news article JSON (static/news/*.json).
ICON_JSON_RE = re.compile(r'"icon"\s*:\s*"([a-z0-9_]+)"')

names = set()
for pattern in ("*.svelte", "*.ts"):
    for f in SRC.rglob(pattern):
        text = f.read_text(encoding="utf-8")
        names.update(ICON_RE.findall(text))
        names.update(ICON_PROP_RE.findall(text))
        names.update(ICON_CONST_RE.findall(text))
for f in (ROOT / "static" / "news").glob("*.json"):
    names.update(ICON_JSON_RE.findall(f.read_text(encoding="utf-8")))

names = sorted(names)
print(f"Found {len(names)} distinct icons: {', '.join(names)}")

# ---- 2. Subset Material Symbols (keep ligatures) --------------------------
# Icon names are GSUB ligatures: the text "ac_unit" collapses to one glyph. We
# must keep (a) the component letter glyphs, (b) each name's target ligature
# glyph, and (c) the liga lookups. The trap: with layout-closure ON, feeding the
# component letters re-pulls EVERY icon whose letters are present (≈the whole
# font). So we resolve the exact target glyphs up front and disable closure.
OUT_DIR.mkdir(parents=True, exist_ok=True)
full = TTFont(MS_IN)
full_cmap = full.getBestCmap()
full_glyphs = set(full.getGlyphOrder())


def resolve_target(f_cmap, gsub, name):
    try:
        glyphs = [f_cmap[ord(c)] for c in name]
    except KeyError:
        return None
    first, rest = glyphs[0], glyphs[1:]
    for lookup in gsub.table.LookupList.Lookup:
        for sub in lookup.SubTable:
            tgt = getattr(sub, "ExtSubTable", sub)
            ligs = getattr(tgt, "ligatures", None)
            if not ligs or first not in ligs:
                continue
            for lig in ligs[first]:
                if lig.Component == rest:
                    return lig.LigGlyph
    return None


gsub = full.get("GSUB")
target_glyphs = set()
unresolved = []
for n in names:
    g = resolve_target(full_cmap, gsub, n)
    if g and g in full_glyphs:
        target_glyphs.add(g)
    else:
        unresolved.append(n)
if unresolved:
    # Don't hard-fail on a single bad name (e.g. a typo or a non-Material-Symbols
    # icon): that would silently freeze the WHOLE subset as stale. Skip the bad
    # names loudly and build the subset from the ones that do resolve.
    print(f"!! Skipping {len(unresolved)} name(s) not found in the source font "
          f"(typo or not a valid Material Symbol?): {unresolved}")
    names = [n for n in names if n not in set(unresolved)]

# Component characters that appear in any icon name (+ space).
component_unicodes = {ord(c) for n in names for c in n} | {0x20}

opt = Options()
opt.flavor = "woff2"
opt.layout_features = ["liga", "clig", "rlig", "calt", "ccmp", "dlig"]
opt.layout_closure = False  # do NOT expand the glyph set through GSUB
opt.ignore_missing_glyphs = True
opt.notdef_outline = True
opt.glyph_names = True

ss = Subsetter(options=opt)
ss.populate(unicodes=component_unicodes, glyphs=target_glyphs)
ss.subset(full)
out_path = OUT_DIR / "material-symbols-rounded-subset.woff2"
full.save(out_path)
print(
    f"\nSubset written: {out_path.relative_to(ROOT)}  "
    f"({out_path.stat().st_size // 1024} KiB, {len(target_glyphs)} icons + components)"
)

# ---- 3. Verify every icon name still resolves to a single ligature glyph ---
v = TTFont(out_path)
cmap = v.getBestCmap()
glyph_set = set(v.getGlyphOrder())


def ligature_target(name: str):
    """Return the glyph a name's char-sequence collapses to via GSUB liga, or None."""
    try:
        glyphs = [cmap[ord(c)] for c in name]
    except KeyError:
        return None  # a component char is missing entirely
    if not glyphs:
        return None
    gsub = v.get("GSUB")
    if not gsub:
        return None
    first, rest = glyphs[0], glyphs[1:]
    for lookup in gsub.table.LookupList.Lookup:
        for sub in lookup.SubTable:
            # Follow extension subtables.
            tgt = getattr(sub, "ExtSubTable", sub)
            ligs = getattr(tgt, "ligatures", None)
            if not ligs or first not in ligs:
                continue
            for lig in ligs[first]:
                if lig.Component == rest:
                    return lig.LigGlyph
    return None


missing = [n for n in names if ligature_target(n) not in glyph_set]
if missing:
    print(f"\n!! VERIFICATION FAILED — these icons do not resolve: {missing}")
    raise SystemExit(1)
print(f"Verified: all {len(names)} icons resolve to a ligature glyph in the subset. OK")

# ---- 3b. Cache-bust the font URL --------------------------------------------
# The subset's filename never changes, so browsers keep serving a stale cached
# font after a regeneration — new icon names then render as raw ligature text
# ("campaign") because the old font lacks the glyph. Stamp a content-hash
# ?v= query onto every reference (the preload in app.html and the @font-face
# src in fonts.css must stay byte-identical for the preload to match).
import hashlib

digest = hashlib.md5(out_path.read_bytes()).hexdigest()[:8]
for target in (ROOT / "src" / "app.html", ROOT / "src" / "lib" / "styles" / "tokens" / "fonts.css"):
    text = target.read_text(encoding="utf-8")
    stamped = re.sub(
        r"material-symbols-rounded-subset\.woff2(\?v=[0-9a-f]*)?",
        f"material-symbols-rounded-subset.woff2?v={digest}",
        text,
    )
    if stamped != text:
        target.write_text(stamped, encoding="utf-8")
        print(f"Stamped font version ?v={digest} into {target.relative_to(ROOT)}")

# ---- 4. Inter fallback metric overrides ------------------------------------
# Computing size-adjust needs the font-wide average glyph width, but Google
# serves a *latin subset* whose OS/2.xAvgCharWidth is skewed (it recalculates
# over a handful of glyphs), which gave a bogus 138%. These are the established
# Inter-over-Arial overrides (the same values next/font and Fontaine emit for
# the full font); matching the fallback's box to Inter's removes the reflow when
# Inter swaps in. Printed here for reference; they live in fonts.css.
print("\n--- Inter Fallback @font-face (in fonts.css) ---")
print("@font-face {")
print("\tfont-family: 'Inter Fallback';")
print("\tsrc: local('Arial');")
print("\tascent-override: 90.49%;")
print("\tdescent-override: 22.56%;")
print("\tline-gap-override: 0.00%;")
print("\tsize-adjust: 107.06%;")
print("}")
