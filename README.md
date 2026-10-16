# Subscription HQ

A private, local-first web dashboard for tracking recurring subscriptions. The app provides a versioned IndexedDB store, CRUD screens, currency-separated spending estimates, validated backups, in-app renewal indicators, and a cached PWA shell.

## Run locally

```bash
npm ci
npm run dev
```

Use Node.js 22 LTS (CI uses Node 22). No environment variables are required.

Use `npm run build` to type-check and create a production bundle.
Use `npm run lint` and `npm test` for static and unit checks.

See [Getting Started](docs/GETTING_STARTED.md) for the user setup flow, code map, and contributor/agent guidance.

## Backups and offline use

Settings provides UTF-8 CSV export and versioned JSON backups. CSV cells are quoted, spreadsheet-sensitive values are prefixed with an apostrophe, and exports include a UTF-8 BOM. JSON restore validates format/version before preview and requires confirmation; exact-ID and likely duplicates have explicit skip/import/replace policies, and writes are transactional. Export backups before clearing local data.

The PWA caches only the built application shell and local assets after a successful online visit. IndexedDB remains available offline. A first visit must be online; exports and backups are never cached. Production installation and service workers require HTTPS (localhost is accepted for development).

## Deployment

The selected static host is Netlify. `netlify.toml` configures the SPA fallback and response headers; deploy only the `dist` output after `npm run build`. No environment variables or secrets are required. See [the release checklist](docs/RELEASE_CHECKLIST.md) and [production audit](docs/PRODUCTION_AUDIT.md) before staging.

## Scope and privacy

The MVP stores subscription records in browser IndexedDB, with no registration, account scraping, banking credentials, or payment actions. Theme and explicit notification opt-in preferences are in localStorage. Settings has a confirmed local-data clear action. Notifications are reconciled only while the app is active; delivery while closed is not guaranteed.

See [architecture](docs/ARCHITECTURE.md), [roadmap](docs/ROADMAP.md), and [privacy](docs/PRIVACY.md).
