# AeroVista Master Product Inventory

AeroVista-wide product intelligence, GitHub repository audit, NXCore Compose inspection and Vercel/Firebase hosting evidence.

**Snapshot (2026-10-11): 61 canonical products · 176 GitHub repositories · 63 NXCore Compose projects · 109 running containers · 10 Vercel projects · 2 Firebase Hosting source-configured targets.**

This repository contains a **self-contained HTML report** generated from the latest accessible AeroVista GitHub repository listing, the Notion canonical Projects product records, and curated GitHub evidence. The dashboard is intended for internal portfolio decisions, not proof that any unverified product is customer-ready.

## Report

- Open `index.html` locally in a browser (no server, API keys, or build required).
- Or serve the repository as static content through approved internal hosting.
- Product and repository exports are available from the report interface.

## Source of truth

- **Notion**: AeroVista Command Center → Projects (filter Type = Product) is the portfolio tracking authority.
- **GitHub**: Canonical product repositories own code and implementation history.
- **Runtime**: Production deployment, login, payments, physical devices, customer acceptance and release security require separate proof.
- **This repository**: A dated snapshot and review tool, not a replacement authority.

## Files

- `index.html`: Interactive standalone audit/report.
- `assets/report.css`: Presentation and print styles.
- `assets/report.js`: Product filters, repository audit, Runtime & Hosting tables, detail drawers, exports.
- `data/catalog.js`: Portable inline-loadable snapshot (works with `file://`).
- `data/catalog.json`: Machine-readable snapshot and audit inputs.
- `docs/AUDIT.md`: GitHub source audit, source relationships and product acceptance gates.
- `docs/DEPLOYMENTS.md`: NXCore Compose, Vercel and Firebase evidence, 20 product additions, hosting limits and next gates.
- `scripts/build-data.py`: Validates JSON and refreshes the portable JavaScript dataset.

> Important: an accessible GitHub repository, healthy NXCore container or Vercel READY deployment does not establish end-user workflow acceptance, live protected content, successful payment, recoverability, or commercial readiness. Firebase source-configured Hosting targets are not verified release inventory. Classifications in the repository inventory are evidence-based and may be provisional.

Snapshot: 2026-10-11.
