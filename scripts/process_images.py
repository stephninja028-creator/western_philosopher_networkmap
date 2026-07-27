#!/usr/bin/env python3
"""
Process downloaded philosopher portraits: crop, resize, convert to WebP.

Usage:
    python scripts/process_images.py
    python scripts/process_images.py --names Plato,Aristotle
"""

import json
import os
import sys
import argparse
from pathlib import Path

from PIL import Image

# ---- Config ----
PROJECT_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = PROJECT_DIR / "public" / "images" / "philosophers" / "raw"
OUTPUT_DIR = PROJECT_DIR / "public" / "images" / "philosophers"
METADATA_FILE = OUTPUT_DIR / "portraits.json"

THUMB_SIZE = 300   # small thumbnail
LARGE_SIZE = 600    # detail view

QUALITY = 82        # WebP quality (0-100, higher=better+bigger)


def center_crop_square(img: Image.Image) -> Image.Image:
    """Center-crop an image to a square (min side)."""
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return img.crop((left, top, left + side, top + side))


def process_one(raw_path: str, name_eng: str) -> dict:
    """Process one portrait: resize to thumb + large WebP. Returns output paths."""
    # Normalize raw_path: some entries have full path, some are relative to OUTPUT_DIR
    raw_full = PROJECT_DIR / "public" / "images" / raw_path
    if not raw_full.exists():
        # Try relative to OUTPUT_DIR (public/images/philosophers/)
        raw_full = OUTPUT_DIR / raw_path
    if not raw_full.exists():
        print(f"  [ERROR] Raw file not found: {raw_full}")
        return {}

    slug = name_eng.lower().replace(" ", "_").replace(".", "").replace(",", "")
    try:
        img = Image.open(raw_full).convert("RGB")
    except Exception as e:
        print(f"  [ERROR] Cannot open image {raw_full}: {e}")
        return {}

    # Center crop to square
    img_sq = center_crop_square(img)

    # Generate thumbnail (300px)
    thumb = img_sq.copy()
    thumb.thumbnail((THUMB_SIZE, THUMB_SIZE), Image.LANCZOS)
    thumb_path = OUTPUT_DIR / f"{slug}_thumb.webp"
    thumb.save(thumb_path, "WEBP", quality=QUALITY)
    thumb_size = os.path.getsize(thumb_path)

    # Generate large (600px)
    large = img_sq.copy()
    large.thumbnail((LARGE_SIZE, LARGE_SIZE), Image.LANCZOS)
    large_path = OUTPUT_DIR / f"{slug}_large.webp"
    large.save(large_path, "WEBP", quality=QUALITY)
    large_size = os.path.getsize(large_path)

    print(f"    thumb: {thumb_path.name} ({thumb_size // 1024} KB)")
    print(f"    large: {large_path.name} ({large_size // 1024} KB)")

    return {
        "thumb": str(thumb_path.relative_to(PROJECT_DIR)),
        "thumb_size_kb": thumb_size // 1024,
        "large": str(large_path.relative_to(PROJECT_DIR)),
        "large_size_kb": large_size // 1024,
    }


def main():
    parser = argparse.ArgumentParser(description="Process philosopher portraits to WebP")
    parser.add_argument("--names", type=str, help="Comma-separated English names to process")
    args = parser.parse_args()

    if not METADATA_FILE.exists():
        print(f"[ERROR] Metadata file not found: {METADATA_FILE}")
        print("Run fetch_portraits.py first.")
        sys.exit(1)

    all_meta = json.loads(METADATA_FILE.read_text())

    if args.names:
        filter_names = set(n.strip() for n in args.names.split(","))
        to_process = [m for m in all_meta if m["name_eng"] in filter_names]
    else:
        # Process entries that have raw_file but no thumb yet
        to_process = [m for m in all_meta if "raw_file" in m and "thumb" not in m]

    if not to_process:
        print("No images to process (all already have thumbs, or no raw files).")
        return

    print(f"Processing {len(to_process)} philosopher portraits...")

    for meta in to_process:
        name = meta["name_eng"]
        raw = meta.get("raw_file", "")
        print(f"\n  Processing: {name}")
        result = process_one(raw, name)
        meta.update(result)

    METADATA_FILE.write_text(json.dumps(all_meta, indent=2, ensure_ascii=False))
    print(f"\nDone. Updated metadata: {METADATA_FILE}")


if __name__ == "__main__":
    main()
