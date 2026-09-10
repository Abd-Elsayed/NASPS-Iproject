# NASPS Intern Software

An Angular + ASP.NET Core application for NASPS that implements the admin and trainee
internship workflow from the project brief.

## Run locally

### 1. Backend (ASP.NET Core 9 + SQLite / SQL Server)

```bash
dotnet run --project backend/Nasps.Api
```

- Database: local SQLite (`backend/Nasps.Api/nasps.db`) by default, so the backend works
  on macOS, Windows, and Linux without a separate database server. Existing SQL Server
  support remains available by setting `Database:Provider=SqlServer` and replacing
  `ConnectionStrings:Default` with the deployment connection string.
- On startup the app applies EF Core migrations. It does not create sample accounts
  unless `DevelopmentData:Seed=true` is explicitly set in local settings.
- Manual schema commands:
  `dotnet ef database update --project backend/Nasps.Api`,
  `dotnet ef migrations add <Name> --project backend/Nasps.Api`.
- API base URL: `http://localhost:5222/api` (HTTPS `https://localhost:7259`).

### 2. Frontend (Angular)

```bash
npm install
npm start
```

Open `http://localhost:4200/login`. The one Login component accepts both admin and
trainee credentials; the backend returns a signed JWT with the account role and Angular
opens the matching workspace.

To test from another device on the same Wi-Fi, bind Angular and the API to `0.0.0.0`,
add the exact LAN frontend origin to `Cors:AllowedOrigins`, and open the Mac's LAN IP
instead of `127.0.0.1`. Angular derives the API host from the browser address, so the
second device calls the Mac rather than its own localhost. Do not expose these local
development ports directly to the public internet.

## Optional development accounts

The original sample-data initializer is preserved but disabled by default. Enable it
only with `DevelopmentData:Seed=true`; a normal run uses database accounts and real
email verification.

| Login | Password | Role | Sees |
| --- | --- | --- | --- |
| `admin@nasps.com` | `Admin@123` | Super Admin | every trainee, every task |
| `eng.admin@nasps.com` | `Admin@123` | Admin (Engineering) | only Engineering trainees/tasks |
| `design.admin@nasps.com` | `Admin@123` | Admin (Design) | only Design trainees/tasks |
| `NASPS-T002` | `NASPS@T002` | Trainee (Sara Mohamed) | own tasks; first login forces a password change |

Trainees can also log in with their email or numeric ID. When an admin creates a
trainee, the API returns a generated Trainee ID, username (`NASPS-T00x`) and one-time
password; the trainee uses them once, then sets a private password.

### Admin self sign-up

`/register` (linked from the login page) lets a new admin create their own account:
name, NASPS email, department, password. The email **must contain `@nasps`** or the API
rejects it (`admin@nasps.com`, `x@nasps.io`, … all pass). The account is created as a
department-scoped **Admin**. A production Super Admin must be provisioned in the
database by the system owner.

### Email verification (OTP) — all users

Every account must verify its email before it can sign in (`User.EmailVerified`). Only
the explicitly enabled development accounts start pre-verified.

- `POST /api/auth/register` and `POST /api/trainees` send a 6-digit code by email.
- A sign-in attempt on an unverified account returns `401` with
  `requiresEmailVerification: true`; the Angular client then shows `/verify-email` and
  uses the code that was sent when the account was created. Resend is explicit.
- `POST /api/auth/verify-email { email, code }` marks the address verified.
- Successful trainee verification returns a signed session and redirects Angular
  directly to the existing Create Password page. The temporary password is never
  stored in the browser. After choosing a private password, the trainee enters the dashboard.
- `POST /api/auth/resend-verification { email }` re-sends (same code while it's still
  valid, so a code you're typing is never invalidated). Codes expire after 5 minutes.
- Password reset (`forgot-password`) and the standalone `otp/*` endpoints send through
  the same service.

**Email transport** — `Services/Email/`. `SmtpEmailSender` (MailKit) sends real mail
when `Email:Host` is configured. Without SMTP, verification endpoints return `503`
instead of reporting fake success. Codes are never returned to the website. The old
`.eml` development sender remains available only by explicitly setting
`Email:UseDevelopmentSender=true` for isolated developer testing.

### Real email with Gmail (for live testing)

Credentials live in .NET user-secrets (never committed). One-time setup:

```bash
cd backend/Nasps.Api
dotnet user-secrets set "Email:Host"        "smtp.gmail.com"
dotnet user-secrets set "Email:Port"        "587"
dotnet user-secrets set "Email:UseStartTls" "true"
dotnet user-secrets set "Email:UseSslOnConnect" "false"
dotnet user-secrets set "Email:User"        "youraccount@gmail.com"
dotnet user-secrets set "Email:Password"    "<16-char Google App Password>"
dotnet user-secrets set "Email:FromAddress" "youraccount@gmail.com"
dotnet user-secrets set "Email:FromName"    "NASPS Intern Software"
```

The App Password comes from a Google account with 2-Step Verification on
(*Google Account → Security → App passwords*). Gmail requires `FromAddress` to be that
same account. Restart the API; the log should read
`[Email] SMTP sender active: smtp.gmail.com:587 …`. Register an admin or add a trainee
with a real address and the 6-digit code arrives in that inbox.

Never commit the Gmail App Password to `appsettings.json`, Git, or a ZIP file.

For an SMTP server that uses implicit SSL on port 465, set
`Email:UseSslOnConnect=true` and `Email:UseStartTls=false`. The optional
`Email:TimeoutMilliseconds` setting defaults to 30000. SMTP credentials always stay
in local User Secrets or deployment secrets; they are never included in source or a ZIP.
Set `Email:WebsiteUrl` to the website URL. Verification/password-reset emails embed the
NASPS horizontal logo as an inline image and link directly to the matching Verify Email
or Forgot Password page with the registered email prefilled.

### Live AI configuration

The saved Coursera/Udemy resources work without a provider. Live learning paths,
task drafts, and admin insights require provider credentials stored outside source:

```bash
cd backend/Nasps.Api
dotnet user-secrets set "Ai:ApiKey" "<new-provider-key>"
dotnet user-secrets set "Ai:Model"  "<chat-model-name>"
# Only change this for an OpenAI-compatible provider:
dotnet user-secrets set "Ai:BaseUrl" "https://api.openai.com/v1/"
```

If these values are missing, `/api/ai/*` returns `503` and no record is changed.
Never paste or commit an API key.

#### Google Gemini (native API)

Gemini support is added alongside the existing OpenAI-compatible provider. The
Angular pages, login rules, stored courses and AI response types are unchanged.
See [Google's generateContent reference](https://ai.google.dev/api/generate-content).

From `backend/Nasps.Api`, configure these **local User Secrets**, not source files:

```bash
dotnet user-secrets set "Ai:Provider" "Gemini"
dotnet user-secrets set "Ai:BaseUrl" "https://generativelanguage.googleapis.com/v1beta/"
dotnet user-secrets set "Ai:Model" "gemini-flash-lite-latest"
dotnet user-secrets set "Ai:ApiKey" "<your-private-Gemini-key>"
dotnet user-secrets set "Ai:TimeoutSeconds" "60"
```

Restart the API in `Development` after changing User Secrets. For deployments,
configure the equivalent `Ai__Provider`, `Ai__BaseUrl`, `Ai__Model`, `Ai__ApiKey`
and `Ai__TimeoutSeconds` environment variables. No key is shipped in the ZIP.
User Secrets are a local development configuration store, not encrypted storage.

The backend calls Google's `generateContent` endpoint with structured JSON output,
then validates the result before returning it. Authentication/role checks still
apply. A provider outage, quota limit, invalid key or malformed response displays a
real error; there is no fake AI fallback and no automatic task creation/assignment.
To use an OpenAI-compatible provider again, set `Ai:Provider=OpenAI` and restore its
base URL, model and key.

Gemini credentials do **not** send verification emails. Real email still needs the
separate SMTP configuration described above. Existing trainee accounts and their
passwords are not changed by this AI setup.

Backend AI checks (no network or accounts needed):

```bash
dotnet run --project backend/Nasps.AiChecks
```

Optional live check using the configured provider and **synthetic** internship data
(three provider requests, which may consume quota; does not touch the database):

```bash
dotnet run --project backend/Nasps.AiChecks -- --live
```

### GET/PUT /api/auth/me

Every page reads the signed-in user from `GET /api/auth/me`; the profile page and the
top-bar name/role come from it. `PUT /api/auth/me` updates the caller's own name, phone
and (trainee) university.

### Notifications

`AppNotification` has a `RecipientId` (null = broadcast). The API creates them
automatically:

| Event | Who is notified |
| --- | --- |
| Admin assigns a task | the trainee |
| Trainee submits a task | the trainee's department admins + every super admin |
| Admin approves / requests changes | the trainee |
| A trainee is added | that department's admins + every super admin |

`GET /api/notifications` returns the caller's + broadcast rows; `PUT /{id}/read` and
`PUT /read-all` mark them read. The Angular sidebar shows an unread badge.

Every personal notification is also sent to the recipient's registered email:
task assignment emails go to the trainee; submission emails go to the trainee's
department admins and super admins; review emails (including the admin note) go to
the trainee; and new-trainee emails go to the matching admins. The in-app notification
is saved first. If SMTP is temporarily unavailable, the task/profile operation still
succeeds and the backend logs the delivery failure; the website notification remains
available. Configure the Gmail/SMTP settings above for real delivery.

## Accounts & roles

All people live in one `Users` table, distinguished by a `Role` column
(`Trainee` | `Admin` | `SuperAdmin`) and a `Department` string.

- **Super Admin** — unrestricted; `GET /api/trainees` and `GET /api/tasks` return
  everything.
- **Admin** — department-scoped. The JWT carries a `department` claim; the API filters
  every trainee/task query to `Trainee.Department == admin.Department` (exact match),
  and blocks creating or moving a trainee outside that department.
- **Trainee** — sees only their own tasks.

## Backend structure

```
backend/
├─ Nasps.sln
└─ Nasps.Api/
   ├─ Program.cs              DI, JWT auth (MapInboundClaims = false), CORS,
   │                          configurable DbContext, migrations, optional sample seed
   ├─ appsettings.json        Jwt, database provider, SMTP flags, and AI placeholders
   ├─ Services/Email/         IEmailSender + SmtpEmailSender (MailKit) / DevEmailSender
   ├─ Models/
   │   ├─ User.cs             single account entity (+ EmailVerified) + enums
   │   ├─ TrainingTask.cs     task + stored attachment/submission bytes + review
   │   ├─ AppNotification.cs  per-trainee (TraineeId set) or global (TraineeId null)
   │   └─ Dtos.cs             request/response records incl. TraineeDto (no secrets)
   ├─ Data/NaspsDbContext.cs  DbSets Users/Tasks/Notifications; Role & Status stored
   │                          as text; unique index on Email; cascade FKs
   ├─ Services/
   │   ├─ AuthService.cs      login (+ email-verified gate), admin sign-up, password
   │   │                      change/reset, trainee registration
   │   ├─ EmailOtpService.cs  generate + send one real 6-digit email code
   │   ├─ ConfiguredAiService.cs  configurable AI provider integration
   │   ├─ VerificationService.cs  in-memory code store (reuses an unexpired code)
   │   ├─ PasswordPolicy.cs   shared 8+/upper/lower/digit/special check
   │   └─ TokenService.cs     signs the 8h JWT (role, roleName, department, isSuperAdmin)
   ├─ Controllers/
   │   ├─ CallerContext.cs         reads user/role/department/isSuperAdmin from JWT
   │   ├─ AuthController.cs        /api/auth/login, change-first-password,
   │   │                          forgot-password/*, otp/*
   │   ├─ TraineesController.cs    CRUD /api/trainees  (department-scoped)
   │   ├─ TasksController.cs       CRUD + upload/download endpoints, role-scoped;
   │   │                          POST/DELETE are admin-only, PUT allows a trainee to
   │   │                          update their own task
   │   └─ NotificationsController.cs  GET /api/notifications, PUT /{id}/read
   └─ Migrations/             EF Core migration that builds the schema
```

**Request flow:** Angular → JWT bearer middleware → CORS → Controller
(`[Authorize(Roles = "admin")]` etc.) → Service → `NaspsDbContext` (EF Core) → SQLite
or SQL Server → JSON.

**Database tables:** `Users`, `Tasks`, `Notifications`, `__EFMigrationsHistory`.
`Tasks.TraineeId` and `Notifications.RecipientId` are FKs to `Users.Id` (cascade delete).
Profile images and task/submission file bytes are persisted in the configured database.

**Angular ↔ API sync:** the Angular `DataService` calls the API for every trainee/task
create, update and delete whenever a token is present, and refreshes lists from the API
on each admin/trainee page. Secure mutations require the API and do not report local
fake success when it is unavailable. Task
status values (`In Progress`, `Needs Changes`) round-trip via
`JsonStringEnumMemberName` on the backend enum.

## Testing the backend

```bash
# 1. login → token
curl -s -X POST http://localhost:5222/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"eng.admin@nasps.com","password":"Admin@123"}'

# 2. use the token (department admin sees only their department)
TOKEN=<paste>
curl -s http://localhost:5222/api/trainees -H "Authorization: Bearer $TOKEN"

# 3. negative checks
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5222/api/trainees          # 401 (no token)
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:5222/api/auth/login \
  -H "Content-Type: application/json" -d '{"identifier":"x","password":"y"}'          # 401

# 4. admin self sign-up + the real code received in Gmail
curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"Huda Nabil","email":"huda@nasps.com","password":"Passw0rd!","department":"HR"}'
CODE=<paste-the-6-digit-code-from-email>
curl -s -X POST http://localhost:5222/api/auth/verify-email -H "Content-Type: application/json" \
  -d "{\"email\":\"huda@nasps.com\",\"code\":\"$CODE\"}"
curl -s -X POST http://localhost:5222/api/auth/login -H "Content-Type: application/json" \
  -d '{"identifier":"huda@nasps.com","password":"Passw0rd!"}'                          # 200 + token
# non-NASPS email is rejected:
curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"X","email":"x@gmail.com","password":"Passw0rd!","department":"HR"}'      # 400
```

Codes are not returned by the API. With Gmail SMTP configured they arrive in the
recipient inbox. Missing SMTP returns a clear `503` rather than fake success.

In Development the OpenAPI document is served at
`http://localhost:5222/openapi/v1.json` (import into Postman / Swagger UI). Inspect the
database directly with
`sqlcmd -S localhost -E -C -d nasps_intern_app -Q "SELECT Id,Name,Role,Department FROM Users"`.

There is no automated test project yet; add one with
`dotnet new xunit -o backend/Nasps.Api.Tests` + `Microsoft.AspNetCore.Mvc.Testing`
and drive it through `WebApplicationFactory<Program>`.

## Frontend notes

The Angular app is **zoneless** (no `zone.js`). Any component state set after an
`await`, in a `subscribe`, or in a `setTimeout` **must be a signal** or the view will
not update.

## Frontend features

- One token-driven Login component and one role-aware Dashboard component
- Protected role-based routes; mandatory first-login password change
- Admin dashboard with live task counts; personalized trainee dashboard
- Saved Coursera/Udemy starter resources plus live AI-generated learning paths
- AI task drafting for admins and AI trainee-progress insights
- Trainee list (add / edit / status toggle / search / delete) — now shows only the
  signed-in admin's department when the backend is reachable
- One Gmail OTP verification before the trainee sets a private password
- New trainees stay Inactive until their email is verified
- Egyptian university dropdown; real stored task/submission attachments up to 20 MB
- Task list with filters; assign to one, several, or all selected trainees
- Admin feedback is persisted, shown in task details, and included in notifications
- Image-only profile upload, shared top-bar avatar, and Remove Photo action
- Notifications, editable profiles, reactive validation, toasts, pagination
- clear errors when SQL Server, SMTP, or the API is unavailable

## Source organization (frontend)

```text
src/app/
├── components/<name>/   # TS + HTML + CSS + spec
├── services/
├── models/
└── guards/
```
