#!/usr/bin/env python3
"""
Fetch philosopher portraits from Wikimedia Commons.

Usage:
    python scripts/fetch_portraits.py [--names Plato,Aristotle,...]
    python scripts/fetch_portraits.py  # uses default test list
"""

import json
import os
import sys
import time
import argparse
import requests
from pathlib import Path

# ---- Config ----
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {
    "User-Agent": "KnowPhilosophers/1.0 (https://www.knowphilosophers.site; educational research)"
}
# Acceptable license types (case-insensitive substring match)
GOOD_LICENSES = [
    "public domain", "cc0", "cc by-sa", "cc by", "cc-by-sa", "cc-by",
    "pd-old", "pd-art", "pd-us", "pd-1923", "cc-pd",
]
# Output directory
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "philosophers"
METADATA_FILE = OUTPUT_DIR / "portraits.json"
DOWNLOAD_DIR = OUTPUT_DIR / "raw"


def search_commons(name: str, search_hint: str = "") -> list[dict]:
    """Search Wikimedia Commons for philosopher portraits. Returns list of image info dicts."""
    query = f'"{name}" portrait' if not search_hint else f'"{name}" {search_hint}'
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": "6",       # File namespace
        "gsrlimit": "15",          # top 15 results
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata|canonicaltitle",
        "iiurlwidth": "400",       # also get a 400px thumbnail URL
        "format": "json",
    }
    try:
        resp = requests.get(COMMONS_API, params=params, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"  [ERROR] API request failed for '{name}': {e}")
        return []

    pages = data.get("query", {}).get("pages", {})
    results = []
    for page_id, page in pages.items():
        ii = (page.get("imageinfo") or [{}])[0]
        url = ii.get("url", "")
        thumb_url = ii.get("thumburl", url)
        width = ii.get("width", 0)
        height = ii.get("height", 0)
        title = page.get("title", "")
        ext = ii.get("extmetadata", {})

        license_str = (ext.get("LicenseShortName", {}) or {}).get("value", "")
        if not license_str:
            license_str = (ext.get("License", {}) or {}).get("value", "")

        artist = (ext.get("Artist", {}) or {}).get("value", "")
        desc = (ext.get("ImageDescription", {}) or {}).get("value", "")

        results.append({
            "page_id": page_id,
            "title": title,
            "url": url,
            "thumb_url": thumb_url,
            "width": width,
            "height": height,
            "license": license_str,
            "artist": artist,
            "description": desc,
        })
        time.sleep(0.1)  # rate limit safety

    return results


def is_good_license(license_str: str) -> bool:
    """Check if the license is acceptable (PD, CC0, CC BY, CC BY-SA)."""
    lower = license_str.lower().strip()
    for good in GOOD_LICENSES:
        if good in lower:
            return True
    return False


def is_likely_portrait(img: dict, name_eng: str = "") -> bool:
    """Heuristic: filter out obviously non-portrait images."""
    title_lower = img["title"].lower()
    desc_lower = (img.get("description") or "").lower()

    # Skip if it contains these keywords (likely not a portrait)
    bad_keywords = ["signature", "autograph", "grave", "tomb", "map",
                     "manuscript", "handwriting", "book cover", "stamp"]
    for kw in bad_keywords:
        if kw in title_lower or kw in desc_lower:
            return False

    # Name check: the philosopher's name (or part of it) should appear in the FILE TITLE
    if name_eng:
        name_parts = name_eng.lower().split()
        # At least one significant part (3+ chars) should appear in the title
        significant = [p for p in name_parts if len(p) >= 3]
        if significant:
            matched = any(
                part in title_lower
                for part in significant
            )
            if not matched:
                return False

    # Ensure reasonable dimensions (portraits are typically vertical or square-ish)
    w, h = img["width"], img["height"]
    if w < 100 or h < 100:
        return False  # too small
    if w > h * 3:
        return False  # too wide, probably a panorama

    return True


def pick_best_image(results: list[dict], name_eng: str = "") -> dict | None:
    """Pick the best image from search results: good license, portrait-like, high res."""
    candidates = [r for r in results if is_good_license(r.get("license", "")) and is_likely_portrait(r, name_eng)]

    if not candidates:
        # Try without license filter
        candidates = [r for r in results if is_likely_portrait(r, name_eng)]

    if not candidates:
        return None

    # Score: higher resolution is better, but prefer images with explicit PD/CC0
    def score(img):
        s = img["width"] * img["height"] / 1_000_000  # resolution score
        lic = img["license"].lower()
        if "public domain" in lic or "cc0" in lic:
            s += 5  # bonus for totally free license
        return s

    candidates.sort(key=score, reverse=True)
    return candidates[0]


def download_image(url: str, dest: Path) -> bool:
    """Download an image to a local path."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        resp.raise_for_status()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(resp.content)
        return True
    except Exception as e:
        print(f"  [ERROR] Download failed: {e}")
        return False


def fetch_philosopher(name_eng: str, search_hint: str = "") -> dict | None:
    """Fetch portrait for one philosopher. Returns metadata dict or None."""
    print(f"\n  Searching Commons for: {name_eng} ...")
    results = search_commons(name_eng, search_hint)

    if not results:
        print(f"  [WARN] No results found for '{name_eng}'")
        return None

    best = pick_best_image(results, name_eng)
    if not best:
        print(f"  [WARN] No suitable portrait found for '{name_eng}'")
        return None

    # Determine file extension from URL
    url_path = best["url"].split("/")[-1]
    ext = os.path.splitext(url_path)[1].lower()
    # Normalize extension: jpg -> jpg, jpeg -> jpg, png -> png
    if ext in (".jpeg", ".jpe"):
        ext = ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".tif", ".tiff"):
        ext = ".jpg"  # default

    dest_name = f"{name_eng.lower().replace(' ', '_')}{ext}"
    dest_path = DOWNLOAD_DIR / dest_name

    print(f"    Best: {best['title']} ({best['width']}x{best['height']}, {best['license']})")
    print(f"    Downloading to: {dest_path} ...")

    if download_image(best["url"], dest_path):
        metadata = {
            "name_eng": name_eng,
            "source_url": best["url"],
            "thumb_url": best["thumb_url"],
            "commons_title": best["title"],
            "license": best["license"],
            "artist": best["artist"],
            "width": best["width"],
            "height": best["height"],
            "raw_file": str(dest_path.relative_to(OUTPUT_DIR.parent)),
        }
        print(f"    [OK] Downloaded ({os.path.getsize(dest_path) // 1024} KB)")
        return metadata
    return None


def main():
    parser = argparse.ArgumentParser(description="Fetch philosopher portraits from Wikimedia Commons")
    parser.add_argument("--names", type=str, help="Comma-separated English names (e.g., Plato,Aristotle)")
    args = parser.parse_args()

    # Default test list (8 philosophers covering different eras/regions)
    DEFAULT_LIST = [
        ("Plato", "bust sculpture portrait"),
        ("Aristotle", "bust sculpture"),
        ("Rene Descartes", "painting"),
        ("Immanuel Kant", "portrait painting"),
        ("Friedrich Nietzsche", "portrait"),
        ("Confucius", "portrait painting"),
        ("Laozi", "traditional painting"),
        ("Zhuangzi", "traditional painting"),
    ]

    if args.names:
        names = [(n.strip(), "") for n in args.names.split(",")]
    else:
        names = DEFAULT_LIST

    print(f"Fetching portraits for {len(names)} philosophers...")
    print(f"Raw downloads: {DOWNLOAD_DIR}")
    print(f"Metadata: {METADATA_FILE}")

    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    # Load existing metadata if any
    existing = {}
    if METADATA_FILE.exists():
        try:
            existing = json.loads(METADATA_FILE.read_text())
        except Exception:
            pass

    results = []
    success = 0
    for name_eng, hint in names:
        meta = fetch_philosopher(name_eng, hint)
        if meta:
            results.append(meta)
            success += 1
        time.sleep(0.5)  # be polite to the API

    # Save metadata
    all_meta = existing.copy() if isinstance(existing, list) else []
    all_meta = [m for m in all_meta if m["name_eng"] not in {r["name_eng"] for r in results}]
    all_meta.extend(results)

    METADATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    METADATA_FILE.write_text(json.dumps(all_meta, indent=2, ensure_ascii=False))
    print(f"\n{'='*50}")
    print(f"Done. {success}/{len(names)} portraits fetched successfully.")
    print(f"Metadata saved to: {METADATA_FILE}")


if __name__ == "__main__":
    main()
