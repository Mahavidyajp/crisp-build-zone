# Money OS frontend integration

This is the frontend. The Express/Firebase backend and native Capacitor host are not included. Without `VITE_MONEY_API_URL`, it runs an explicitly labelled in-memory demo. A refresh clears demo changes; no financial information is written to localStorage or sessionStorage.

## Financial model
- All monetary values are integer minor units (paise/cents).
- `GET /finance` returns `MoneyData` as defined in the typed finance models.
- `PUT /{collection}/{id}` upserts an entity. UUIDs are stable retry identifiers; the backend must make writes idempotent and authorize the authenticated owner.
- `DELETE /{collection}/{id}` deletes an entity subject to backend rules.
- `PATCH /settings` updates currency, profile, and categories.
- `POST /documents` accepts multipart `file` for secure storage.
- `POST /receipts/extract` accepts multipart `file` and returns partial transaction fields. The user reviews and confirms before saving.
- Use secure HttpOnly session cookies. Cross-origin services require exact-origin credentialed CORS; implement CSRF protection and verify Firebase identities server-side. No private key belongs in the browser.

## Backend responsibilities
Validate payloads and ownership; authenticate; implement permissions, private/shared isolation, atomic ledger/split writes, immutable audit trails, server duplicate detection, multi-currency conversion, recurring occurrence generation, verified account deletion, backups, reliable payment verification where available, signed document retrieval, OCR, push delivery, and synchronization.

## Native host responsibilities
Register `NativeCapabilities` for camera, share, secure storage, biometrics, and network lifecycle. Native share receiving and encrypted durable offline queues are not implemented by the browser demo. Never silently auto-confirm a payment or imported transaction. External app launching requires a valid payee URI; no fabricated payment destination is provided.

## Known frontend scope
The current app implements editable accounts, transaction entry/search/filters/details, verification and duplicate review, budgets, goals, recurring entries and paid tracking, shared spaces/people/splits/settlements, investment and asset/liability tracking, net-worth calculations, receipt manual fallback, document metadata, notifications, preferences and exports. Authentication and onboarding account creation, encrypted offline sync, native installers, OCR extraction, document contents, production permissions and advanced investment analytics require the separate backend/native work. Reminder and privacy-preview toggles in demo are session preferences, not claims of notification delivery or native security.
