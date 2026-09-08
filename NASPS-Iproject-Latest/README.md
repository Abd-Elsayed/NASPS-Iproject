# NASPS Intern Software

An Angular + ASP.NET Core application for NASPS that implements the admin and trainee
internship workflow from the project brief.

## Run locally

### 1. Backend (ASP.NET Core 9 + SQL Server)

```bash
dotnet run --project backend/Nasps.Api
```

- Database: SQL Server, `nasps_intern_app` (connection string in
  `backend/Nasps.Api/appsettings.json` → `ConnectionStrings:Default`, Windows auth to
  `localhost`).
- On startup the app applies EF Core migrations and, if the `Users` table is empty,
  seeds demo accounts.
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

## Accounts (seeded)

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
department-scoped **Admin**; to get a Super Admin you use the seeded `admin@nasps.com`
or change the DB.

### Email verification (OTP) — all users

Every account must verify its email before it can sign in (`User.EmailVerified`). The
seeded demo accounts are pre-verified.

- `POST /api/auth/register` and `POST /api/trainees` send a 6-digit code by email.
- A sign-in attempt on an unverified account returns `401` with
  `requiresEmailVerification: true` and triggers a fresh code; the Angular client then
  shows `/verify-email`.
- `POST /api/auth/verify-email { email, code }` marks the address verified.
- `POST /api/auth/resend-verification { email }` re-sends (same code while it's still
  valid, so a code you're typing is never invalidated). Codes expire after 5 minutes.
- Password reset (`forgot-password`) and the standalone `otp/*` endpoints send through
  the same service.

**Email transport** — `Services/Email/`. `SmtpEmailSender` (MailKit) is used when
`Email:Host` is configured, otherwise `DevEmailSender` logs the message and writes a
`.eml` under `backend/Nasps.Api/sent-emails/`. The API prints which one is active at
startup (`[Email] …`). In `Development` the code is also returned in the response
(`devCode` / `code`).

### Real email with Gmail (for live testing)

Credentials live in .NET user-secrets (never committed). One-time setup:

```bash
cd backend/Nasps.Api
dotnet user-secrets set "Email:Host"        "smtp.gmail.com"
dotnet user-secrets set "Email:Port"        "587"
dotnet user-secrets set "Email:UseStartTls" "true"
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

To go back to the dev sender: `dotnet user-secrets remove "Email:Host"`.

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
   │                          DbContext (UseSqlServer), migrate + seed on startup
   ├─ appsettings.json        Jwt:* and ConnectionStrings:Default
   ├─ Services/Email/         IEmailSender + SmtpEmailSender (MailKit) / DevEmailSender
   ├─ Models/
   │   ├─ User.cs             single account entity (+ EmailVerified) + enums
   │   ├─ TrainingTask.cs     task + attachment/submission/review metadata
   │   ├─ AppNotification.cs  per-trainee (TraineeId set) or global (TraineeId null)
   │   └─ Dtos.cs             request/response records incl. TraineeDto (no secrets)
   ├─ Data/NaspsDbContext.cs  DbSets Users/Tasks/Notifications; Role & Status stored
   │                          as text; unique index on Email; cascade FKs
   ├─ Services/
   │   ├─ AuthService.cs      login (+ email-verified gate), admin sign-up, password
   │   │                      change/reset, trainee registration
   │   ├─ EmailOtpService.cs  generate + store + email a 6-digit code
   │   ├─ VerificationService.cs  in-memory code store (reuses an unexpired code)
   │   ├─ PasswordPolicy.cs   shared 8+/upper/lower/digit/special check
   │   └─ TokenService.cs     signs the 8h JWT (role, roleName, department, isSuperAdmin)
   ├─ Controllers/
   │   ├─ CallerContext.cs         reads role/department/isSuperAdmin from the JWT
   │   ├─ AuthController.cs        /api/auth/login, change-first-password,
   │   │                          forgot-password/*, otp/*
   │   ├─ TraineesController.cs    CRUD /api/trainees  (department-scoped)
   │   ├─ TasksController.cs       CRUD /api/tasks (GET/POST/PUT/DELETE), scoped;
   │   │                          POST/DELETE are admin-only, PUT allows a trainee to
   │   │                          update their own task
   │   └─ NotificationsController.cs  GET /api/notifications, PUT /{id}/read
   └─ Migrations/             EF Core migration that builds the schema
```

**Request flow:** Angular → JWT bearer middleware → CORS → Controller
(`[Authorize(Roles = "admin")]` etc.) → Service → `NaspsDbContext` (EF Core) → SQL
Server → JSON.

**Database tables:** `Users`, `Tasks`, `Notifications`, `__EFMigrationsHistory`.
`Tasks.TraineeId` and `Notifications.TraineeId` are FKs to `Users.Id` (cascade delete).

**Angular ↔ API sync:** the Angular `DataService` calls the API for every trainee/task
create, update and delete whenever a token is present, and refreshes lists from the API
on each admin/trainee page. `localStorage` is only the offline demo fallback. Task
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

# 4. admin self sign-up + OTP (Development returns the code)
REG=$(curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"Huda Nabil","email":"huda@nasps.com","password":"Passw0rd!","department":"HR"}')
CODE=$(echo "$REG" | grep -o '"devCode":"[0-9]*' | cut -d'"' -f4)
curl -s -X POST http://localhost:5222/api/auth/verify-email -H "Content-Type: application/json" \
  -d "{\"email\":\"huda@nasps.com\",\"code\":\"$CODE\"}"
curl -s -X POST http://localhost:5222/api/auth/login -H "Content-Type: application/json" \
  -d '{"identifier":"huda@nasps.com","password":"Passw0rd!"}'                          # 200 + token
# non-NASPS email is rejected:
curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"X","email":"x@gmail.com","password":"Passw0rd!","department":"HR"}'      # 400
```

Generated emails land in `backend/Nasps.Api/sent-emails/*.eml` and in the API console.

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
- AI-style course learning paths from each trainee's Internship Program
- Trainee list (add / edit / status toggle / search / delete) — now shows only the
  signed-in admin's department when the backend is reachable
- Email OTP verification before the trainee sets a private password
- Egyptian university dropdown; any-type task attachment up to 20 MB
- Task list with filters, assign-one / assign-all, review decisions
- Notifications, editable profiles, reactive validation, toasts, pagination
- localStorage demo fallback so the presentation flow still works with the API offline

## Source organization (frontend)

```text
src/app/
├── components/<name>/   # TS + HTML + CSS + spec
├── services/
├── models/
└── guards/
```
