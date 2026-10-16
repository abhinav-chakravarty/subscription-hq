# Getting Started

This guide is for people using Subscription HQ and for developers or coding agents working on the project.

## For users

Subscription HQ is a local-first dashboard for tracking recurring subscriptions. Subscription records are stored in this browser's IndexedDB database. There is no account or cloud sync in the current MVP, so records in one browser profile are not available in another.

### Run the app

1. Install a current Node.js release that supports the project toolchain, then install dependencies from the project directory:

   ```bash
   npm install
   npm run dev
   ```

2. Open the local URL printed by Vite (usually `http://localhost:5173`).
3. Use **Subscriptions** to add plans and set their billing cadence, price, currency, status, and renewal date. Use the dashboard and analytics pages to review active recurring estimates.
4. Open **Settings** to export a CSV or save a versioned JSON backup. Keep a backup before clearing browser data or changing browser profiles.

The app shell can work offline after a successful online visit in a production PWA deployment. A first visit requires a connection. Browser notifications are subject to permission and browser support; they are not a push-notification service. See [Privacy](PRIVACY.md) for storage details and [Architecture](ARCHITECTURE.md) for current scope.

## For developers and coding agents

### Set up and run

From the repository root:

```bash
npm install
npm run dev
```

Useful project commands:

```bash
npm run build    # Type-check and create the production bundle
npm run lint     # Lint src/
npm test         # Run unit tests
npm run preview  # Serve the built bundle locally
```

### Where to start reading

- [`../README.md`](../README.md): product overview, local run, backup/offline behavior, deployment.
- [`../AGENTS.md`](../AGENTS.md): repository rules for coding agents and contributors.
- [`ARCHITECTURE.md`](ARCHITECTURE.md): application shape and data boundaries.
- [`DECISIONS.md`](DECISIONS.md): recorded implementation decisions.
- [`ROADMAP.md`](ROADMAP.md): completed and planned scope.
- [`PRIVACY.md`](PRIVACY.md): local data and privacy behavior.
- [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md): release checks.

### Code map

- `src/domain/`: subscription types, validation, dates, spending calculations, backup and reminder rules.
- `src/data/`: IndexedDB database, repository, and backup/reminder services.
- `src/features/`: dashboard, subscription management, analytics, and settings screens.
- `src/App.tsx`, `src/main.tsx`: app composition and entry point.
- `public/`, `vite.config.ts`, `netlify.toml`: static assets, PWA/build configuration, and Netlify hosting rules.

### Working rules

- Keep domain rules, validation, calculations, and persistence out of React view components.
- Keep subscription data in IndexedDB; do not put records, credentials, or secrets in `localStorage`. The theme preference is the only current `localStorage` exception.
- Represent money as integer minor units. Keep totals grouped by currency unless an explicit, sourced conversion is implemented.
- Validate data at form, import, and repository boundaries. Preserve backup versioning and duplicate-ID handling.
- Keep claims aligned with implemented capability: there is no account sync, provider integration, automatic cancellation, or push notification delivery in the current MVP.
- Preserve keyboard accessibility, responsive layouts, and clear empty and error states.
- Follow the release and privacy docs when changing deployment or data handling.

For code changes, run the relevant checks supported by the environment and report the commands and actual results. Documentation-only edits do not need code checks.
