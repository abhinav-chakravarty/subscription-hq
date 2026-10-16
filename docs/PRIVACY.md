# Privacy and security

The initial MVP is local-first and does not use accounts, analytics, advertising, payment collection, account scraping, or provider sign-in automation. It must never collect UPI PINs, card CVVs, OTPs, passwords, API keys, or banking credentials.

Subscription information is personal financial metadata. It resides in this browser's IndexedDB; users can export a backup and may lose data if the browser clears or evicts site storage. Notes are rendered as text, imports are schema-validated and size-limited, and management URLs are restricted to safe HTTP/HTTPS schemes.

Local browser storage is not a security boundary: a malicious script running in the application origin could read it. Mitigations include dependency review, restrictive deployment CSP, no untrusted HTML rendering, no third-party tracking, and avoiding sensitive diagnostics. Cloud sync is out of scope until authentication, authorization, and database RLS are designed and verified.

Backups are user-controlled downloads and must be protected by the user: they can contain subscription names, provider information, and notes. The app does not cache exported backups. Notifications are limited to deterministic in-app eligibility; browser scheduling cannot promise delivery while the browser is closed.

Settings includes an explicit clear-local-data action with confirmation; it removes subscription and reminder records and reseeds default categories. Export a JSON backup first. Clearing browser site data also removes the local IndexedDB inventory. Browser notifications require explicit opt-in and are only considered when the app is running; the browser may not deliver them while closed.
