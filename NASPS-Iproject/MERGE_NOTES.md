# NASPS Latest + AI Merge Notes

## Safety

- The supplied `NASPS-Iproject-Latest (3).zip` was used as the base and was not edited.
- No source file from that ZIP is missing from this merged copy.
- Credentials and API keys are not stored in this project or its ZIP.

## Completed changes

- One real Gmail email-verification flow before a new trainee creates a private password.
- New trainees stay inactive until email verification succeeds.
- Real, backend-persisted profile images shown in the profile and top-right account area.
- Image-only profile-photo validation plus a Remove Photo action.
- Admin notes saved on a reviewed submission and shown to the assigned trainee.
- Task assignment to one, several, or all selected trainees.
- Assignment and submission files stored in SQL Server and downloadable by authorized users.
- Separate submission-link support.
- Existing Coursera/Udemy suggestions retained and live AI paths, task drafting, and progress insights added.
- Secure mutations and account flows now report backend errors instead of fake local success.
- Original sample-data initializer retained but disabled by default (`DevelopmentData:Seed=false`).

## Required private configuration

Run these inside `backend/Nasps.Api` using real private values. Do not place them in
`appsettings.json`.

```bash
dotnet user-secrets set "Email:Host" "smtp.gmail.com"
dotnet user-secrets set "Email:Port" "587"
dotnet user-secrets set "Email:UseStartTls" "true"
dotnet user-secrets set "Email:User" "YOUR_GMAIL_ADDRESS"
dotnet user-secrets set "Email:Password" "YOUR_16_CHARACTER_GMAIL_APP_PASSWORD"
dotnet user-secrets set "Email:FromAddress" "YOUR_GMAIL_ADDRESS"

dotnet user-secrets set "Ai:ApiKey" "YOUR_NEW_AI_API_KEY"
dotnet user-secrets set "Ai:Model" "YOUR_PROVIDER_MODEL_NAME"
```

The AI key pasted into chat must be revoked and replaced. Gmail uses a Google App
Password, not the AI API key.

## Start and migrate

```bash
dotnet run --project backend/Nasps.Api
npm install
npm start
```

The API applies the included EF Core migrations automatically at startup. SQLite is
the zero-setup local default. SQL Server remains selectable through
`Database:Provider` and `ConnectionStrings:Default`.

## Verification performed

- Angular application TypeScript compilation: passed.
- Angular template compilation: passed.
- Angular unit-test TypeScript compilation: passed.
- ASP.NET Core C# source compilation: passed.
- Browser smoke test of login/create-password pages: passed with no console errors.

Real Gmail delivery, live AI responses, SQL persistence, and end-to-end file transfer
still require the user's SMTP credentials, a new AI key/model, and a reachable SQL
Server instance.
