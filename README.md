# AeroVista Master Product Inventory

AeroVista-wide product intelligence and GitHub repository audit.

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
- `assets/report.js`: Filters, navigation, comparisons, exports.
- `data/catalog.js`: Portable inline-loadable snapshot (works with `file://`).
- `data/catalog.json`: Machine-readable snapshot and audit inputs.
- `docs/AUDIT.md`: Scope, methodology, evidence limits and next gates.
- `scripts/build-data.py`: Validates JSON and refreshes the portable JavaScript dataset.

> Important: an accessible GitHub repository or merged PR does not establish that an app is deployed, secure, customer-accepted, purchasable or commercially ready. Classifications in the repository inventory are evidence-based and may be provisional.

Snapshot: 2026-10-11.
