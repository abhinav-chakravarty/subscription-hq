# Architecture decisions

## 2026-10-10 — Local-first before cloud sync

Core tracking must work offline and without registration. IndexedDB (via Dexie in Phase 2) will be the durable record store; localStorage is limited to small non-sensitive UI preferences.

## 2026-10-10 — Currency totals remain separate

The app will not silently convert or combine currencies. Estimates use integer minor units and group totals by ISO currency code until a transparent conversion feature exists.

## 2026-10-10 — No simulated integrations

Manual entry and official management links are the baseline. The product will not claim to cancel, import, or manage external subscriptions without an official, authorized integration.
