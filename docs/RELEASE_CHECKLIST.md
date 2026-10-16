# Release checklist

- [x] Verify a clean `npm ci` using a fresh isolated directory; the in-place Windows attempt hit a locked native binary (see audit evidence).
- [x] Run full `npm audit --json`; zero advisories reported on 2026-10-14.
- [x] Chromium E2E covers create, edit, archive, restore, delete, reload persistence, PWA manifest, and offline navigation.
- [ ] Run CI under Node 22 LTS; local system runtime was Node 23.10 (unsupported by current Vitest/Vite engine ranges).
- [ ] Manually create/edit/archive/restore/delete and test JSON restore in a separate browser profile.
- [ ] Export JSON, restore it into a separate browser profile, and verify records/categories.
- [ ] Confirm CSV escaping in Excel/Sheets with formula-prefixed and Unicode data.
- [ ] Install the PWA over HTTPS in supported desktop/mobile browsers and verify an update cycle.
- [ ] Confirm IndexedDB data survives refresh and a service-worker update.
- [ ] Keyboard-test forms, navigation, dialogs, and mobile layout; manually inspect contrast and screen-reader announcements.
- [ ] Deploy a staging build and verify the configured CSP/security headers on actual responses.
- [ ] Review `docs/PRODUCTION_AUDIT.md`; do not release until all remaining findings are resolved or formally accepted.

## Rollback and recovery

Deploy the previous immutable static-host build to roll back application code. Browser IndexedDB is not changed by a rollback. Users should export a JSON backup before clearing browser data; restoration is user-controlled in Settings.

## Versioning and support

Use SemVer tags and Keep-a-Changelog style entries in `CHANGELOG.md`. Support the current and previous major versions of Chrome, Edge, Firefox, and Safari; PWA install and notification behavior remain browser-dependent.
