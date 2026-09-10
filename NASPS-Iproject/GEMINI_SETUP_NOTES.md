# Gemini integration — 9 September 2026

## Added without removing the existing provider

- Native Google Gemini `generateContent` transport and structured response schemas.
- The existing OpenAI-compatible transport remains the default when no provider is selected.
- Learning paths, task drafts and trainee insights keep the same API routes and DTOs.
- Google API keys stay in local backend User Secrets, outside this folder and ZIP.
- Provider failures are reported honestly; no generated demo response is substituted.
- No accounts, passwords, database records, frontend pages or original input ZIPs were changed for this integration.

## Verified

- 26 automated offline checks passed, including the original provider branch,
  Gemini schemas, malformed replies, quota/authentication errors and cancellation.
- Three live service checks passed on `gemini-flash-lite-latest`: learning path,
  task draft and trainee insights. These used synthetic data, not user records.
- `gemini-flash-latest` returned HTTP 503 (high demand) during testing. The local
  configuration therefore uses the working `gemini-flash-lite-latest` model.
- Frontend login and backend OpenAPI responded with HTTP 200.
- An unauthenticated AI request returned HTTP 401; login protection is preserved.

## Still required for a full signed-in test

The current local database has no user accounts. SMTP is not configured, so real
email verification and account creation cannot be completed yet. Gemini credentials
are separate from Gmail/SMTP credentials. Configure the email sender, register and
verify an admin, then add and verify a trainee normally. No demo accounts or
verification bypasses were enabled.

The AI features were verified directly through the backend service, not through a
signed-in browser session. Local website: http://127.0.0.1:4203/login.

See README.md for setup and repeatable check commands. A copied ZIP needs its own
local provider/SMTP configuration; private keys are intentionally not included.
