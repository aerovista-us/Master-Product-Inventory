#!/usr/bin/env python3
"""Validate and rebuild the portable browser data bundle.

Usage:
    python3 scripts/build-data.py --check
    python3 scripts/build-data.py

No network calls, third-party packages, credentials or GitHub token needed.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data/catalog.json"
BROWSER_PATH = ROOT / "data/catalog.js"
PREFIX = "window.AEROVISTA_PORTFOLIO_DATA = "


def load() -> dict:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    products = data.get("products", [])
    repos = data.get("repositories", [])
    if data.get("meta", {}).get("productCount") != len(products):
        raise ValueError("Declared product count does not equal product records")
    if data.get("meta", {}).get("repositoryCount") != len(repos):
        raise ValueError("Declared repo count does not equal repo records")
    if len({p["id"] for p in products}) != len(products):
        raise ValueError("Duplicate product IDs")
    if len({r["name"] for r in repos}) != len(repos):
        raise ValueError("Duplicate repository names")
    names = {r["name"] for r in repos}
    product_names = {p["name"] for p in products}
    for p in products:
        for name in p["repos"]:
            if name not in names:
                raise ValueError(f"Product {p['name']} links unknown repository {name}")
    for r in repos:
        for link in r.get("links", []):
            if link["name"] not in product_names:
                raise ValueError(f"Repository {r['name']} links unknown product {link['name']}")
        expected = "https://github.com/aerovista-us/" + r["name"]
        if r["url"] != expected:
            raise ValueError(f"Unexpected repository URL {r['url']}")
    return data


def decode_bundle(text: str) -> dict:
    if not text.startswith(PREFIX) or not text.rstrip().endswith(";"):
        raise ValueError("Portable bundle prefix or terminator missing")
    json_text = text[len(PREFIX) :].strip()[:-1]
    return json.loads(json_text)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Validate without writing")
    args = parser.parse_args()
    data = load()
    if args.check:
        current = decode_bundle(BROWSER_PATH.read_text(encoding="utf-8"))
        if current != data:
            raise SystemExit("Portable data/catalog.js does not match canonical JSON")
    else:
        serialized = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        serialized = serialized.replace("<", "\\u003c")
        BROWSER_PATH.write_text(PREFIX + serialized + ";\n", encoding="utf-8")
    print(f"PASS: {len(data['products'])} products, "
          f"{len(data['repositories'])} unique repositories; "
          "crosswalk and portable data validated.")


if __name__ == "__main__":
    main()
