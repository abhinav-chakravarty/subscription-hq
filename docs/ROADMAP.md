# Roadmap

1. **Foundation (complete):** React/Vite setup, responsive navigation, theme shell, documentation, and build verification.
2. **Data foundation (complete):** typed subscription model, Zod validation, calendar-safe billing utilities, Dexie repository, category seeding, and unit tests.
3. **Subscription management (complete):** create, read, edit, archive/restore, delete confirmation, search/status controls, and detail view.
4. **Insights (complete):** shared currency-aware spending estimates, data-driven dashboard cards, category totals, renewal lists, highest-cost plans, and analytics summaries without fabricated history.
5. **Settings and reminders (complete):** local CSV/JSON backups, validated restore preview, deterministic in-app reminder eligibility, and browser-notification limitations.
6. **Resilience (complete for local MVP):** installable PWA manifest, conservative static-shell caching, deterministic reminders, validated CSV/JSON backup, responsive management, and Netlify deployment configuration.
7. **Release hardening (in progress):** Vitest advisory remediated, strict Hooks lint rules enabled, Chromium subscription lifecycle/offline tests and pinned CI actions added. Cross-browser accessibility/install checks and production-host verification remain release tasks.

Provider integrations, Supabase sync, authentication, and push notifications are explicitly future work, subject to official API capability and security design.
