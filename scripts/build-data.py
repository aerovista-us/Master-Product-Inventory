#!/usr/bin/env python3
"""Validate canonical product and local-source JSON; rebuild portable browser data.

Usage:
    python3 scripts/build-data.py --check
    python3 scripts/build-data.py

No network access, tokens or third-party Python packages required.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/catalog.json"
CATALOG_JS = ROOT / "data/catalog.js"
LOCAL = ROOT / "data/local-sources.json"
LOCAL_JS = ROOT / "data/local-sources.js"
CATALOG_PREFIX = "window.AEROVISTA_PORTFOLIO_DATA = "
LOCAL_PREFIX = "window.AEROVISTA_LOCAL_SOURCES = "


def validate_catalog() -> dict:
    data = json.loads(CATALOG.read_text(encoding="utf-8"))
    products, repos = data["products"], data["repositories"]
    if data["meta"]["productCount"] != len(products):
        raise ValueError("Catalog product count mismatch")
    if data["meta"]["repositoryCount"] != len(repos):
        raise ValueError("Catalog repository count mismatch")
    if len({p["id"] for p in products}) != len(products):
        raise ValueError("Duplicate product ID")
    if len({p["name"] for p in products}) != len(products):
        raise ValueError("Duplicate product name")
    if len({r["name"] for r in repos}) != len(repos):
        raise ValueError("Duplicate repository")
    if any(not p.get("family") or not p.get("collection") for p in products):
        raise ValueError("Ungrouped product")
    names = {r["name"] for r in repos}
    product_names = {p["name"] for p in products}
    for p in products:
        for n in p["repos"]:
            if n not in names:
                raise ValueError(f"Unknown repo {n} on product {p['name']}")
    for r in repos:
        for link in r.get("links", []):
            if link["name"] not in product_names:
                raise ValueError(f"Unknown product {link['name']} in {r['name']}")
        if r["url"] != "https://github.com/aerovista-us/" + r["name"]:
            raise ValueError("Unexpected GitHub URL: " + r["name"])
    return data


def validate_local() -> dict:
    d = json.loads(LOCAL.read_text(encoding="utf-8"))
    entries = d["entries"]
    editions = d["echoStories"]["editions"]
    if d["directoryCount"] != len(entries):
        raise ValueError("Local directory count mismatch")
    if len({x["name"] for x in entries}) != len(entries):
        raise ValueError("Duplicate local source directory")
    if len({x["name"] for x in editions}) != len(editions):
        raise ValueError("Duplicate EchoStories source folder")
    return d


def encode(d: dict, prefix: str) -> str:
    body = json.dumps(d, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    return prefix + body + ";\n"


def decode(s: str, prefix: str) -> dict:
    if not s.startswith(prefix) or not s.strip().endswith(";"):
        raise ValueError("Portable bundle prefix/suffix incorrect")
    return json.loads(s[len(prefix):].strip()[:-1])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    d, local = validate_catalog(), validate_local()
    if args.check:
        if decode(CATALOG_JS.read_text(encoding="utf-8"), CATALOG_PREFIX) != d:
            raise SystemExit("Browser catalog.js differs from canonical catalog.json")
        if decode(LOCAL_JS.read_text(encoding="utf-8"), LOCAL_PREFIX) != local:
            raise SystemExit("Browser local-sources.js differs from local-sources.json")
    else:
        CATALOG_JS.write_text(encode(d, CATALOG_PREFIX), encoding="utf-8")
        LOCAL_JS.write_text(encode(local, LOCAL_PREFIX), encoding="utf-8")
    print(f"PASS: {len(d['products'])} products, "
          f"{len(d['repositories'])} GitHub repos, "
          f"{len(local['entries'])} NXCore source folders, "
          f"{len(local['echoStories']['editions'])} EchoStories folders; "
          "crosswalk and browser bundles validated.")


if __name__ == "__main__":
    main()
