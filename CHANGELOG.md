# Changelog

## Unreleased

- Hardened subscription filtering and currency-specific amount entry/formatting for zero-, two-, and three-decimal currencies with exact large-value presentation.
- Added Chromium lifecycle and offline persistence coverage; pinned GitHub Actions by commit SHA and enabled audit checks in CI.
- Replaced placeholder Categories and Upcoming Renewals screens with local-data views and wired top-bar search into the subscription list.
- Updated Vitest and added the explicit Testing Library DOM dependency required for reproducible tests.
- Removed React Hooks lint suppressions and aligned production, privacy, and release documentation with actual behavior.
- Added production audit evidence and a staging/release checklist.
