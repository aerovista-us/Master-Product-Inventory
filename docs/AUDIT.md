# AeroVista Master Product Inventory — Audit Findings

**Snapshot:** October 11, 2026  
**Scope:** AeroVista-wide, not limited to Opt. Declassified  
**Canonical tracker:** [Notion — Master Product Inventory](https://app.notion.com/p/3f62a204d0c481e39d7ecec55dd67b48)  
**Source owner:** [aerovista-us on GitHub](https://github.com/aerovista-us)

## 1. Executive summary

This audit inventoried **176 accessible GitHub repositories** under the linked AeroVista owner, including `Master-Product-Inventory`. The expanded canonical Notion Projects database now contains **61 products**: **48 Active**, **9 Planning**, **3 On Hold**, and **1 Completed**. The GitHub-only checkpoint was 41; 20 additional independently named tools were located through NXCore Docker and Vercel. See [Runtime and Hosting Audit](DEPLOYMENTS.md) for the deployment snapshot.

**Do not interpret 48 Active as 48 production-ready apps.** Active means portfolio activity; deployment, paid checkout, private data access, user acceptance, device safety, print quality and operating evidence are independently gated. The source role of a repository is not a release status.

An older human-classified GitHub repo catalog contained **111 entries**, generated **2026-07-09**. We preserved those notes as historical provenance. The old `ACOS`/AeroCore and storefront canonical-source conclusions may have been superseded, so source migrations or archiving must rely on current owner evidence.

## 1a. Deployment-backed portfolio expansion

Read-only examination of NXCore found **63 Compose projects** and **109 running containers**. Connected Vercel returned **10 configured projects**; GitHub Firebase Hosting config documents **two targets** but does not prove deployed release state. Added 20 product records to Notion after confirming distinct app/UI intent. Refer to [DEPLOYMENTS.md](DEPLOYMENTS.md) and the report's Runtime & Hosting view for names, status, limits and source categories.

## 2. Repository disposition

| Current classification | Count | What it means |
|---|---:|---|
| Product source | 39 | Primary mapping to a product record |
| Product related | 11 | Additional/secondary source, consumer or legacy variant linked to a product |
| Content or campaign | 62 | Music, artwork, release pages, branded media, microsites |
| Platform or tooling | 20 | Identity, runtime, shared infrastructure, developer tools, this audit |
| Scaffold or experiment | 22 | Starter code, proofs, experiments, some empty repos |
| Backup or recovery | 8 | Named recovery, exported/backup source |
| Legacy or reference | 5 | Historical product versions or preserved reference work |
| Client project | 3 | Property/customer-specific delivery work |
| Needs review | 6 | Insufficient dependable classification evidence |
| **Total** | **176** | Not 176 products |

See the interactive Repository Audit page for all exact repository names, dispositions, review-depth labels, current product crosslinks and historical classifications.

## 3. Product families

- **Investigations & Field:** BlackIndex, Nightglass, Request Lens, ByteCoreLite, ByteCoreLite-Connect, FieldWatch.
- **Commerce & Marketplaces:** AeroVista Apparel, Art Localized, AV Portrait, Horizon Storefront, Store Console, Profit Compass and AeroVista Social Engine (starter).
- **Local & Community:** CDA Tonight, CDA Fair Day, FireWatch North Idaho, CDA Reading Adventure and Lake Day.
- **Media & Creative:** EchoVerse platform, Phase workstation, EchoStory, Northline Experience, Vault Music Catalog, Style Atlas, Lumina Image Studio, Prism, Cuts, Guitar Studio, Narrator Studio, Branding Kit Organizer, Horizon Tour Builder, Horizon Media Gallery and ByteTag.
- **Publishing & Learning:** Vespera, The Rack, Signal, ByteCast Employee Home, Summit Learning, Time Circuit, Love Is Hard Learning Module, Vespera Publishing Studio and Shift Happens.
- **Operations & Productivity:** AeroVista Operates, BytePad, Daily Brief Builder, AutoBench, LotScope/Pondy Flats, Frontier PTT, RydeSync, App Studio, AeroDeck, Memory Mapping v2, NXCal, Business Suite, Order Timer, Work Orders Mission Control, Pitch Studio and Cyber-Deck.
- **Entertainment:** Ascension Awaits.

Families describe navigation and customer intent, not separate legal entities, separate production hosts, or double-counted products.

## 4. Material findings and priority gates

### P0 — Status accuracy

- Notion Lifecycle remains useful for portfolio activity and staffing but must never imply paid-user readiness.
- Source implementation, unit tests/CI, deployed runtime, authenticated browser test, paid transaction, recovery, and field-device proof are separate statuses.
- The HTML viewer displays lifecycle and a concise evidence tier rather than making fabricated completion percentages.

### P1 — Commerce

- Store Console holds durable AeroVista catalog identity; Square variation/price/payment authority must remain intact.
- Apparel image 404/503, shoe variants, My AeroVista saved pieces, signed My Orders and positive Square checkout are separate gates.
- Horizon checkout is fail-closed until print-provider and product/variation payment verification.

### P1 — Identity and publications

- Vespera and The Rack cannot claim content protection until entitlement grants, revocation, logout and direct-static-file negative tests pass.
- A login redirect does not itself protect independently accessible published files.

### P1 — Runtime and field acceptance

- BlackIndex: repository CI and a local healthy dashboard response were previously observed; persistent deployment provenance and Ollama/browser acceptance need closure.
- Nightglass: source pipeline exists, but the local default service port was not running in the prior direct check; provider integrations and PULSE/dossier production proof remain open.
- Phase: Master Assembly source merge and homepage response are not complete feature/PWA acceptance.
- RydeSync: accepted earlier member/guest browser flows do not close current physical-device and cross-network acceptance.
- LotScope/Pondy: dimensioning, visible/hidden roof edges, print QA and professional/AHJ validation must remain distinct.

### P2 — Repository overlap resolution

| Preferred authority | Related repositories | Decision |
|---|---|---|
| `the-rack` | `therack`, `comic_rack` | v3 reader is the canonical direction; preserve content and routing dependencies |
| `aerovista-catalog-console` | `store`, `av-store` | Catalog console owns IDs; Shop/Commerce/legacy code remain distinct boundaries |
| `bytepad` | `bytepad-web`, `bytepad_studio` | Functional comparison, source lineage, then choose any migrations |
| `lot-assessment` | `PondyFlats` | Workbench solver versus customer drawing packages, not generic duplicates |
| `signal` | `bytecast` | Independent products: publishing reports versus employee learning |
| `lumina-image-studio` | `prism` | Both independently maintained, under one Lumina production-workspace program |
| Platform | `ACOS`, `AeroCore`, `aerovista-core`, `identity-gateway` | Must use current contract authority before claiming repo supersession |

**Do not archive/delete anything solely from this table.** Check deployed dependencies and read-only/provenance consumers first.

## 5. Product candidates not automatically added to Notion

The pass found source artifacts that are not yet independently evidenced as maintained or commercial products:

- `LegendballZ` — playable Bar Skills Challenge prototype with accompanying media.
- `collector_cards` — interactive 3D/holographic card experience.
- `Starchild` — *When Stars Collide* comics content and reader source.
- `field_guide` and `lostbook` — modular/static knowledge and creative field books.
- `billys_big_adventure` — a bespoke trip-planning artifact, not automatically a reusable product.
- `github-repo-catalog` — functioning repository-governance tooling, not automatically a sold software product.

These should be evaluated for distinct brand, customer, owner, billing model, versioning, live service, or strategic internal product status **before** adding records. Creative works and songs may be cataloged as IP/content, not software products.

## 6. Directly inspected evidence versus inferred roles

Audit sources combine:
1. GitHub list of accessible repos (current enumeration).
2. Selected GitHub READMEs, root file trees and known merged/source documentation.
3. Existing Notion Projects records and their most recent reviewed handoffs.
4. July 2026 repository catalog, labeled historical.

Every repo row records a **review depth**:
- `README/source checked`: source or README inspected in recent review.
- `Source structure reviewed`: directory/root inspected in this pass.
- `Historical review only`: July 2026 human classifications carried forward with date.
- `Listing only`: no current human/source confirmation.

Where source is limited, we retained `Needs review` rather than inventing role, launch dates, revenue or deployment status.

### No live acceptance performed by the report builder

This source-audit session did **not** execute production payment, Square webhook, SSO, cloud edge, mobile field device, customer purchase or regulatory/professional approval tests. A repository README saying `production` is a claim requiring separate current acceptance proof.

## 7. Data policy and privacy

The report is designed to be opened locally without network calls. The included product catalog is a curated snapshot of internal Notion metadata, so keep the repo and any hosted copy access-controlled. Do **not** automatically publish a public GitHub Pages deployment with private product notes without a disclosure/security review.

- Runtime configuration, private LAN/Tailscale addresses, tokens and secret files are not required by this static report.
- The linked Notion product record is the change authority for lifecycle, priority, owner and next action.
- The linked GitHub product code is the technical source of truth.
- The on-disk report remains a dated historical snapshot, not a watcher or auto-sync service.

## 8. Maintenance and validation

After updating `data/catalog.json`:

```sh
python3 scripts/build-data.py
python3 scripts/build-data.py --check
node --check assets/report.js
```

Open `index.html` in a modern browser and check Overview, Product Inventory, GitHub Audit, Source Crosswalk, Next Actions, Methodology, Search, filters, detail drawer, CSV export and print/PDF styles.

To reconcile again: query Notion Products, enumerate GitHub owner repositories, inspect new/changed sources, reconcile IDs and canonical repos, update release evidence, then rebuild this static report. Avoid creating a second canonical tracker or erasing unknown review work.

## 9. Requested next improvements

1. Add fields for verified deployed commit, live endpoint, authentication proof, commercial entitlement, version, maintenance owner and recovery path; do not default missing fields to pass.
2. Keep product readiness a separate, auditable state from lifecycle.
3. Add internal-only refresh tooling with governed GitHub/Notion access; no browser-embedded credentials.
4. Run a second review of the six ambiguous repositories, and verify candidate products before expansion beyond the current 41.
5. After formal approval, host an access-controlled read-only report; a private source repo does not mean GitHub Pages is configured.

---

**Audit owner:** AeroVista / Master Product Inventory  
**Prepared:** 2026-10-11  
**Reference:** `data/catalog.json` supplies all machine-readable rows and detailed product notes.
