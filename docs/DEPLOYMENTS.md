# Runtime and Hosting Inventory — 2026-10-11

This supplements [the company-wide product audit](AUDIT.md). It is a read-only snapshot of deployable surfaces **not a release acceptance certificate**.

## Executive findings

| Source | Observed | Confidence and boundary |
|---|---:|---|
| NXCore Docker Compose | 63 Compose projects | Direct authorized `docker compose ls --all` on `nxcore`; includes partial and exited groups |
| NXCore running containers | 109 | Direct authorized `docker ps`; 61 declared `healthy`, 48 had **no** Docker healthcheck result |
| Vercel | 10 configured projects | Connected API project enumeration and individual latest-deployment metadata; app functionality not tested |
| Firebase Hosting | 2 configured Hosting targets | Source-controlled `.firebaserc` / `firebase.json`; release IDs and live Firebase Hosting states **not** verified |
| Notion canonical products | 61 | 20 additional product records reconciled to the existing Type = Product view |
| GitHub owner repositories | 176 | Repository listing is not a complete runtime or code acceptance check |

### Product records added in this audit

**Local:** Lake Day (Vercel READY metadata, custom-domain browser not accepted).

**Operations:** AeroDeck, AeroVista App Studio, Memory Mapping v2, NXCal, AeroVista Business Suite, NXCore Order Timer Board, AVCC Work Orders Mission Control.

**Creative:** Cuts, Guitar Studio, AeroVista Pitch Studio, EchoVerse Narrator Studio, Lumina Branding Kit Organizer, Horizon Drone Tour Builder, Horizon Media Gallery, EchoVerse ByteTag.

**Lifestyle and social:** Shift Happens, AeroVista Social Engine, Cyber-Deck.

**Publishing:** Vespera Publishing Studio.

Each Notion product record contains the observed Compose/hosting source, specific next acceptance gate, and caveat. **Internal services are not automatically market-ready software.**

## NXCore runtime analysis

Host: authorized `nxcore` Desktop Commander session.

- Direct Docker Engine **28.5.1** and Docker Compose **v2.40.3** were reachable.
- `docker compose ls --all --format json` returned 63 project groups. Some stacks are mixed running/exited; the dashboard preserves these labels rather than silently treating every project as healthy.
- `docker ps` returned 109 **currently running containers**.
- Docker health distribution among these containers: **61 healthy**, **48 without declared health status**. The latter group has not failed a healthcheck — one simply was not declared by Docker.
- Source-only project registries, built images, dormant Compose files, other machines and cloud services are **outside** the count.

Services observed include (not an exhaustive list): `blackindex`, `bytecast`, `aerovista_catalog_console`, `identity-gateway`, `aerovista-command-center`, `profit-compass-api`, `rydesync`, `styleatlas`, `echoverse_music_catalogvnx`, `prism`, `lumina-image-studio`, `artlocalized-api`, `aerovista-workspaces`, `mag-auth`, `rack-auth`, `workorders`, `app-studio`, `memorymappingv2`, `aerodeck`, `nxcal-vnext` and `vespera-publishing-studio`.

**Content-access note:** a running `mag-auth` or `rack-auth` container is not proof that static image/page files are protected from direct requests.

**System-safety note:** Developer tools (e.g. App Studio, AeroDeck and agent services) need explicit authorization and action scope review before broad access.

## Vercel: configured projects and observed latest deployment state

| Vercel project | Related product | Latest observed state | Important boundary |
|---|---|---|---|
| `cdatonight` | CDA Tonight | CANCELED | A canceled latest production build does **not** establish the custom domain is offline |
| `lotscope` | LotScope | ERROR | Latest build was an errored nonproduction/development branch; earlier main deployment may be READY |
| `aerovista_apparel` | Apparel | READY | Real Square checkout and customer browser still need acceptance |
| `signal` | Signal | READY | Content freshness, gated publishing and app access need separate QA |
| `av-portrait` | AV Portrait | READY (preview) | No proof of live image-generation entitlement/payment |
| `handoff-centralized` | Internal handoff | READY | Shared infrastructure, not a duplicate standalone commercial product |
| `echostory` | EchoStory | READY | Wizard source is not payment fulfillment acceptance |
| `lakeday` | Lake Day | READY | `live=false` from project readback; actual domain acceptance not verified |
| `cdafair` | CDA Fair Day | READY | The 2026 season content may be stale despite a READY deployment |
| `trustscope` | TrustScope | READY | Reputation provider, false-positive and privacy QA remain |

The connected Vercel project enumeration is authorized, but explicitly scoped team requests produced HTTP **403**. Unscoped project and individual project reads succeeded. Do not claim complete team-account enumeration, a production deployment's serving URL, or a passed browser acceptance just from `READY`.

## Firebase: source-controlled Hosting targets

| GitHub source repository | Firebase project | Hosting target | Configured site |
|---|---|---|---|
| `aerovista-site` | `aerovista-us` | `platform` | `aerovista-platform` |
| `aerovista-us-acos-site` | `aerovista-us` target mapping | `public` | `aerovista-us` |

Firebase deployment evidence was read from the repos' `.firebaserc` and `firebase.json`. The first configuration contains public-site Art Localized paths and Hosting redirects. These mappings must **not** be interpreted as all current Firebase Hosting releases or account-owned projects.

The NXCore `firebase` and `gcloud` CLIs were absent. This audit did not obtain an authorized Firebase releases/API listing. A full Firebase audit needs supported read-only Firebase/Google Cloud permissions plus release/site/domain enumeration, followed by browser and origin checks.

## Product versus infrastructure

We explicitly did **not** create automatic new Type = Product entries for `aerocaller`, `ghost-log-main`, `py-board`, `charatureprofiles`, `agent-os`, `aerocoreosweb` and `aerocoreospro`. The services exist, but distinct product identity, consumers, ownership and overlap with existing products must be established first.

Similarly, two NXCal Compose groups (`calendar-system` and `nxcal-vnext`) are **one evolving product family**, not automatically two products.

Existing crossovers receiving stronger runtime evidence include BlackIndex, Store Console, ByteCast, Lumina Image Studio, Prism, Style Atlas, EchoVerse platform, RydeSync and Profit Compass. A process being up is not proof all user journeys work.

## Acceptance punch list

1. **Release authority:** For each application, record the actual deployed commit/container digest, owner, namespace, environment, runtime URL, intended audience and sign-in/role boundary.
2. **Browser proof:** Verify happy and negative paths using authorized sessions; include real-data state and expired/revoked sessions.
3. **Commerce and publishing:** Square variation-ID/price authority; actual checkout/webhook/fulfillment; gated publication files and static bypass negative tests.
4. **Storage/recovery:** Datastore authority, backups, restore exercises, DB/volume ownership, secret rotation and deploy rollback.
5. **Firebase visibility:** Connect authorized Hosting read access and inspect site/release/domain metadata. Do not guess from deployment files.
6. **Vercel verification:** Resolve team scope 403 if needed, then check live production alias, latest successful target, custom-domain response, preview restrictions and protected routes.
7. **Portfolio cleanup:** Keep GitHub 176-repo taxonomy separate from the 61 Notion products and 63 Compose projects; do not conflate or merge based on identical words in names.

## Machine-readable report

The canonical snapshot is [`../data/catalog.json`](../data/catalog.json), under `deployments` and `products`. The [offline HTML report](../index.html) includes Runtime & Hosting and crosslinked product records.

The report stores no Docker environment values, auth cookies, provider keys, exposed host secrets or private system IPs.

**Verified at:** 2026-10-11 local Pacific time. Source status may change after this point.
