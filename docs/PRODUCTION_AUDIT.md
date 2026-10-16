# Production audit — 2026-10-14

Scope: source/configuration review, local quality checks, and a Chromium subscription lifecycle test. This is not a penetration test, external certification, or production-host verification.

| Severity | Finding | Affected area | Remediation / current status |
|---|---|---|---|
| Critical | None identified in the reviewed local-only implementation. | Security/privacy | No auth, payment credential fields, analytics SDK, remote API requests, or arbitrary HTML injection found in source review. |
| High (resolved) | Dependency advisory in the earlier Vitest version (tinypool RCE / Vitest path traversal). | `package.json`, lockfile | Updated to Vitest 4.1.11; full audit currently reports zero advisories. CI reruns the audit. |
| Medium | Browser notifications cannot reliably fire at a scheduled time while the browser is closed. | Reminder service | No closed-browser delivery claim. In-app reminders are the reliable baseline; permission-gated Notifications are reconciled only when the app runs. |
| Medium | Full cross-browser installation, offline update, a11y, and deployed header behavior need manual verification. | PWA, UI, Netlify | Chromium lifecycle E2E added and passed. Static hosting headers are configured but are not active until deployed. No automated accessibility scanner is configured. |
| Medium (resolved) | Categories/renewals routes were placeholders and top-bar search did not submit. | `App.tsx`, management routes | Replaced placeholders with IndexedDB-backed views, category-to-filter navigation, upcoming renewal filtering, and working search; browser workflow covers the routes. |
| Low | App uses `0.0.0` while release/versioning policy is SemVer. | `package.json` | Establish `1.0.0` only at an explicitly approved release; no release published by this audit. |
| Low | Workspace starts with all files untracked. | Git/release process | No commit made. Review and create an intentional baseline commit before staging. |

## Security and privacy review

Subscription data is stored in IndexedDB and used locally. The reviewed app makes no application API calls and contains no third-party analytics or remote logging. CSV exports prefix spreadsheet-sensitive cells with an apostrophe and quote every cell; JSON backup import validates schema/version and imports transactionally with explicit conflict policies. User-entered notes render as text. External subscription-management links use HTTP(S) validation and `noopener noreferrer`.

Netlify configuration supplies the SPA fallback and CSP/security headers, but those headers are only effective when this configuration is deployed. CSP permits inline styles for the current UI and has no inline-script allowance. Browser storage is not encrypted and can be cleared/evicted; backups remain the user's responsibility.

## Verification evidence

- `npm run lint` — passed (ESLint, React Hooks recommended rules enabled).
- `npm test -- --reporter=verbose` — passed, 7 files / 19 tests.
- `npm run build` — passed; TypeScript and Vite production bundle + service worker generated.
- `npm run test:e2e -- --workers=1 --reporter=list` — passed, 2 Chromium tests including create/edit/archive/restore/delete, reload persistence, top-bar search, categories, upcoming renewals, manifest, and offline route/data access.
- `npm audit --json` — passed, 0 vulnerabilities (14 production, 619 development, 82 optional dependency nodes; 632 total).
- `npm ci` in the project folder — failed with Windows `EPERM` unlink on `node_modules/@rolldown/binding-win32-x64-msvc/rolldown-binding.win32-x64-msvc.node`; the installer partially removed generated dependencies. `npm install --ignore-scripts --legacy-peer-deps` restored them. A clean `npm ci --prefix D:\subscription-hq-ci-check` then passed (556 packages added, 0 vulnerabilities), proving the manifest/lockfile install together. The system Node is v23.10.0, outside package engine ranges; that install emitted `EBADENGINE`. CI targets supported Node 22.
- No formatter or automated accessibility scanner is configured. CI workflow syntax was inspected but not executed by GitHub Actions.

Service worker registration is single-source (`useRegisterSW` from the app root); no remote runtime caching is configured. This audit does not establish production-host headers, installability on every browser, guaranteed notifications, or an independent security review.
