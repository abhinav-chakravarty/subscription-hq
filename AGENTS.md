# Subscription HQ development rules

- Preserve the local-first design: IndexedDB is the future system of record; never put subscription data, credentials, or secrets in localStorage.
- Store money as integer minor units and keep totals separated by currency unless an explicit, sourced conversion is implemented.
- Keep business rules, schemas, and persistence outside React view components; validate at form, import, and repository boundaries.
- Do not claim provider integration, cancellation, import, or notification delivery without verified capability.
- Prioritize keyboard-accessible controls, clear empty/error states, and responsive layouts.
- Run type checking, linting, tests, and production builds for changes where the environment supports them. Report actual results only.
