#!/usr/bin/env python3
"""
Regenerate the homepage sector-splitter images at sensible sizes + compression.

All three panels render the photo as an object-fit:cover background sitting under
a dark gradient (.panel__in), so they tolerate aggressive WebP compression. Each
image gets a responsive set:

    sector-<name>.webp       (the <img src> fallback + mid srcset entry)
    sector-<name>-sm.webp    (small / low-DPR phones)
    sector-<name>-lg.webp    (retina / wide desktop, capped at source width)

Run from repo root:  python3 scripts/optimize-sector-images.py
Requires Pillow with WebP support.
"""

from pathlib import Path

from PIL import Image

PHOTOS = Path(__file__).resolve().parent.parent / "static" / "assets" / "photos"
METHOD = 6
# Quality per role. The small/main variants are the ones shipped to phones and
# sit under an 84%+ dark gradient, so they take heavy compression invisibly; the
# lg retina variant keeps a touch more quality for wide/hi-DPI desktops.
Q_SM, Q_MAIN, Q_LG = 45, 56, 62

# name -> (source file, [sm, main, lg target widths]). Source is the highest-res
# file available (the -lg variant for the two we already downscaled once).
TARGETS = {
	"sector-agriculture": ("sector-agriculture-lg.webp", [800, 1200, 1560]),
	"sector-livestock": ("sector-livestock-lg.webp", [800, 1200, 1376]),
	"sector-coldchain": ("sector-coldchain.webp", [640, 870]),
}


def encode(src_img, width, dest, quality):
	width = min(width, src_img.width)  # never upscale
	height = round(src_img.height * width / src_img.width)
	src_img.resize((width, height), Image.LANCZOS).save(
		dest, "WEBP", quality=quality, method=METHOD
	)
	print(f"  {dest.name:<32} {width}x{height}  q{quality}  {dest.stat().st_size // 1024} KiB")


def main():
	for name, (src_file, widths) in TARGETS.items():
		src_path = PHOTOS / src_file
		with Image.open(src_path) as im:
			im = im.convert("RGB")
			print(f"{name} (source {src_file} {im.size}):")
			sm, main, *rest = widths
			encode(im, sm, PHOTOS / f"{name}-sm.webp", Q_SM)
			if rest:
				encode(im, rest[0], PHOTOS / f"{name}-lg.webp", Q_LG)
			encode(im, main, PHOTOS / f"{name}.webp", Q_MAIN)  # overwrite main last
		print()


if __name__ == "__main__":
	main()
