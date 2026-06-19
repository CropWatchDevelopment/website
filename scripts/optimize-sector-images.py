#!/usr/bin/env python3
"""
Regenerate the homepage sector-splitter images at sensible sizes.

The three sector panels render the photo as an object-fit:cover background that
is, at most, ~half the viewport wide on desktop and the full width on mobile
(displayed ~1071px). The source files shipped far larger than needed, so this
script emits a responsive set per image:

    sector-<name>.webp       1200w  (the <img src> fallback + 1200w srcset entry)
    sector-<name>-sm.webp     800w  (small / low-DPR phones)
    sector-<name>-lg.webp   <=1600w (retina / wide desktop, capped at source width)

Run from the repo root:  python3 scripts/optimize-sector-images.py
Requires Pillow with WebP support.
"""

from pathlib import Path

from PIL import Image

PHOTOS = Path(__file__).resolve().parent.parent / "static" / "assets" / "photos"
QUALITY = 72
METHOD = 6  # slowest / best WebP compression

# Only the two oversized panels flagged by Lighthouse. Cold-chain (50 KB) is
# already efficient and is the LCP, so it is left as a single optimized file.
TARGETS = ["sector-agriculture", "sector-livestock"]


def encode(src_img: Image.Image, width: int, dest: Path) -> None:
    ratio = width / src_img.width
    height = round(src_img.height * ratio)
    resized = src_img.resize((width, height), Image.LANCZOS)
    resized.save(dest, "WEBP", quality=QUALITY, method=METHOD)
    print(f"  {dest.name:<32} {width}x{height}  {dest.stat().st_size // 1024} KiB")


def main() -> None:
    for name in TARGETS:
        original = PHOTOS / f"{name}.webp"
        print(f"{original.name} (source {Image.open(original).size}):")
        # Read the source fully into memory before we overwrite the main file.
        with Image.open(original) as im:
            im = im.convert("RGB")
            src_w = im.width
            lg_w = min(1600, src_w)
            main_w = min(1200, src_w)
            sm_w = min(800, src_w)

            encode(im, sm_w, PHOTOS / f"{name}-sm.webp")
            encode(im, lg_w, PHOTOS / f"{name}-lg.webp")
            encode(im, main_w, original)  # overwrite main last
        print()


if __name__ == "__main__":
    main()
