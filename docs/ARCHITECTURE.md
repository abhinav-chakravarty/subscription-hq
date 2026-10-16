# Architecture

Subscription HQ is a Vite + React + TypeScript single-page application. React Router owns client-side navigation; Tailwind CSS supplies utility primitives while the first phase uses a small component-scoped CSS design system. Lucide provides accessible SVG icons.

The current layers are: typed domain models and Zod schemas, currency-safe calculation utilities, a Dexie-backed IndexedDB repository, a transactional backup service, deterministic reminder services, and route-level UI. UI pages use repository/domain functions rather than doing IndexedDB or spending work in presentation code. TanStack Query is not installed; the current local dataset and event flow do not justify another server-state dependency.

The shared spending module is the single source for dashboard and analytics estimates. It keeps totals grouped by ISO currency, uses integer minor units with explicit per-subscription rounding, and includes only active, unarchived subscriptions. Trials are displayed separately; paused, cancelled, expired, and archived entries do not contribute recurring estimates.

The MVP is intentionally local-only. A future Supabase phase requires server-enforced ownership, PostgreSQL migrations, Row Level Security, conflict resolution, secure backup design, and account deletion before any sync is enabled.

The production static-host configuration is `netlify.toml`. It supplies SPA routing, HTTPS host policy, and security headers only when deployed to Netlify; local Vite development does not emulate those response headers. The PWA precaches built local shell assets only, with no runtime network cache rules. An update is user-triggered from the in-app update indicator.

IndexedDB schema is versioned in `src/data/database.ts`; schema upgrades must preserve user rows and be covered by migration tests. Backup writes use a Dexie transaction and never silently replace duplicate IDs. Reminder notifications are reconciled only while the application is running and permission plus explicit opt-in exist; delivery while closed is unsupported.

## Dependency decisions

- **React / React Router**: accessible client UI and route handling.
- **Tailwind CSS**: responsive design primitives, with Vite integration.
- **Lucide React**: lightweight, consistent icons.
- **Dexie / Zod**: versioned IndexedDB persistence, transactional operations, and validation at import/persistence boundaries.
- **Vitest / Testing Library / Playwright**: deterministic domain/component checks and Chromium browser workflows.
- **vite-plugin-pwa**: generated manifest, service worker, and conservative static asset precache.
- **Vite**: development and static production build.

React Hook Form, TanStack Query, and Recharts remain deferred because current forms, local state, and text-first summaries meet the implemented scope without those libraries.
