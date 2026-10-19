# NASPS Intern Software

## 📋 Project Description

**NASPS Intern Software** is a comprehensive internship management system designed for The Smart and Secure Issuance Complex (NASPS) organization. It provides a streamlined workflow for managing internship programs, trainee progress tracking, task assignments, and administrative oversight.

The application implements a full-stack solution with an Angular frontend and an ASP.NET Core backend, enabling both administrators and trainees to collaborate effectively on training tasks, manage notifications, handle authentication, and track progress through an intuitive dashboard.

## ✨ Key Features

- **Dual-role Authentication**: Separate admin and trainee interfaces with JWT-based authentication
- **Dashboard**: Real-time overview of internship status, tasks, and notifications
- **Task Management**: Create, assign, and track training tasks with status updates
- **Trainee Management**: View and manage trainee profiles and progress
- **Notifications System**: Real-time notifications for task updates and important events
- **AI Integration**: AI-powered checks and assistance for training evaluations
- **Email Verification**: Secure email verification system for account creation
- **Profile Management**: User profile management with photo storage capabilities
- **Responsive Design**: Mobile-friendly interface for accessibility across devices
- **LAN Deployment**: Support for local network deployment for team environments

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: Angular 22.1.0
- **Language**: TypeScript 6.0.2
- **Styling**: CSS3 with component-scoped styles
- **Package Manager**: npm
- **Build Tool**: Angular CLI 22.1.6
- **Testing**: Vitest 4.1.11, jsdom 27.4.0

### Backend
- **Framework**: ASP.NET Core 9
- **Language**: C#
- **Database**: Microsoft SQL Server (with local SQLite fallback)
- **ORM**: Entity Framework Core with migrations
- **Authentication**: JWT Bearer tokens with Identity Framework
- **API Documentation**: OpenAPI/Swagger support
- **Server**: Kestrel

### Infrastructure
- **Database**: SQL Server (`nasps_intern_app` database)
- **Email**: SMTP-based email delivery
- **API Base URL**: `http://localhost:5222/api` (HTTP) or `https://localhost:7259` (HTTPS)
- **Frontend Base URL**: `http://localhost:4200`

## 📦 Prerequisites

Before getting started, ensure you have the following installed:

- **.NET Runtime & SDK**: .NET 9 or later
  - [Download .NET](https://dotnet.microsoft.com/download)
- **Node.js & npm**: Node.js 18+ with npm
  - [Download Node.js](https://nodejs.org/)
- **SQL Server**: SQL Server 2019 or later
  - [Download SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads) (free)
- **PowerShell 5.1+** (for Windows development)
- **Visual Studio Code** or preferred code editor

## 🚀 Getting Started

### Step 1: Clone & Navigate

```bash
cd e:\NASPSintern\NASPS-Iproject\NASPS-Iproject-FInal
```

### Step 2: Backend Setup (ASP.NET Core 9 + SQL Server)

**Open PowerShell as Administrator** and run:

```powershell
cd e:\NASPSintern\NASPS-Iproject\NASPS-Iproject-FInal
dotnet run --project .\backend\Nasps.Api\Nasps.Api.csproj
```

**Configuration Details:**
- **Database**: SQL Server - `nasps_intern_app` database on `localhost`
- **Connection String**: Override via `ConnectionStrings__Default` environment variable
- **Configuration File**: `backend/Nasps.Api/appsettings.json`
- **Migrations**: Applied automatically on startup via Entity Framework Core
- **Sample Data**: Disabled by default (enable with `DevelopmentData:Seed=true` in settings)
- **API Endpoints**: 
  - HTTP: `http://localhost:5222/api`
  - HTTPS: `https://localhost:7259/api`
  - OpenAPI: `http://localhost:5222/openapi/v1.json`

**Database Management Commands:**

```powershell
# Update database schema to latest migration
dotnet ef database update --project .\backend\Nasps.Api\Nasps.Api.csproj

# Create a new migration
dotnet ef migrations add <MigrationName> --project .\backend\Nasps.Api\Nasps.Api.csproj

# View pending migrations
dotnet ef migrations list --project .\backend\Nasps.Api\Nasps.Api.csproj
```

### Step 3: Frontend Setup (Angular)

**Open a second PowerShell terminal** and run:

```powershell
cd e:\NASPSintern\NASPS-Iproject\NASPS-Iproject-FInal

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at: **`http://localhost:4200/login`**

**Frontend Details:**
- The unified Login component accepts both admin and trainee credentials
- Backend returns a JWT token with role information
- Angular automatically routes to the appropriate workspace based on user role

## 🖥️ LAN Network Deployment

To serve the application to other devices on the same Wi-Fi network:

### Backend Configuration

```powershell
cd e:\NASPSintern\NASPS-Iproject\NASPS-Iproject-FInal

$env:ASPNETCORE_URLS="http://0.0.0.0:5222"
$env:Database__Provider="SqlServer"
$env:ConnectionStrings__Default="Server=YOUR_MACHINE_NAME;Database=nasps_intern_app;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True"
$env:Cors__AllowedOrigins__0="http://YOUR_LAN_IP:4200"

dotnet run --project .\backend\Nasps.Api\Nasps.Api.csproj
```

Replace `YOUR_MACHINE_NAME` and `YOUR_LAN_IP` with your actual values (e.g., `10.4.8.169`).

### Frontend Configuration

```powershell
cd e:\NASPSintern\NASPS-Iproject\NASPS-Iproject-FInal

npm install
npx ng serve --host 0.0.0.0 --port 4200
```

### Firewall Rules (Windows)

Run **PowerShell as Administrator** once to allow network access:

```powershell
New-NetFirewallRule -DisplayName "NASPS Frontend 4200" -Direction Inbound -Protocol TCP -LocalPort 4200 -Action Allow -Profile Private

New-NetFirewallRule -DisplayName "NASPS API 5222" -Direction Inbound -Protocol TCP -LocalPort 5222 -Action Allow -Profile Private
```

### Access from Other Devices

Open your browser on any device connected to the same Wi-Fi and navigate to:

```
http://YOUR_LAN_IP:4200
```

**Note**: Never use `127.0.0.1` or `localhost` from another device — it will point to that device, not the server. The frontend automatically derives the API address from the browser URL.

## 🔐 Development Accounts

Sample development accounts are **disabled by default**. Enable them by setting `DevelopmentData:Seed=true` in your configuration.

| Login | Password | Role | Permissions |
| --- | --- | --- | --- |
| `admin@nasps.com` | `Admin@123` | Super Admin | View all trainees and tasks |

**Note**: In production, use the email verification system for account creation. Sample accounts are for development only.

## 📁 Project Structure

```
NASPS-Iproject-FInal/
├── backend/                          # ASP.NET Core backend
│   ├── Nasps.Api/                    # Main API application
│   │   ├── Controllers/              # API endpoints (AI, Auth, Dashboard, Tasks, Trainees, Notifications)
│   │   ├── Data/                     # Entity Framework DbContext
│   │   ├── Migrations/               # Database schema migrations
│   │   ├── Models/                   # Domain models and DTOs
│   │   ├── Services/                 # Business logic (Email, AI providers)
│   │   ├── Program.cs                # Application entry point and configuration
│   │   └── appsettings.json          # Configuration file
│   ├── Nasps.AiChecks/               # AI evaluation service
│   ├── Nasps.EmailCheck/             # Email verification service
│   ├── Nasps.NotificationChecks/     # Notification processing service
│   └── Nasps.sln                     # Visual Studio solution file
│
├── src/                              # Angular application source
│   ├── app/
│   │   ├── components/               # Reusable UI components
│   │   ├── core/                     # Core services and guards
│   │   ├── guards/                   # Route guards (authentication, authorization)
│   │   ├── models/                   # TypeScript interfaces and types
│   │   ├── app.routes.ts             # Application routing configuration
│   │   ├── app.ts                    # Root component
│   │   └── app.config.ts             # Application configuration
│   ├── main.ts                       # Angular bootstrap entry point
│   ├── styles.css                    # Global styles
│   └── index.html                    # HTML entry point
│
├── public/                           # Static assets
│   └── assets/                       # Images, fonts, etc.
├── angular.json                      # Angular build configuration
├── package.json                      # Node.js dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.app.json                 # TypeScript app-specific config
├── tsconfig.spec.json                # TypeScript testing config
├── NETWORK_SETUP.md                  # LAN network setup guide
└── README.md                         # This file
```

## 🔄 Available npm Scripts

```bash
npm start          # Start the Angular development server (ng serve)
npm run build      # Build the project for production
npm run watch      # Build in watch mode with development configuration
npm test           # Run unit tests with Vitest
npm run ng         # Run Angular CLI commands
```

## 📊 Database Schema

The application uses Entity Framework Core for data access. Key models include:

- **User**: Admin and trainee accounts with roles and email verification
- **TrainingTask**: Assignments for trainees with status tracking
- **AppNotification**: Notifications for users with recipient information
- **StoredFile**: File storage for documents and uploads
- **ProfilePhoto**: User profile image management

Migrations are applied automatically on application startup. View the Migrations folder for schema history.

## 🔗 API Documentation

The API provides OpenAPI/Swagger documentation:

```
http://localhost:5222/openapi/v1.json
```

Main API endpoints include:
- `/api/auth/*` - Authentication and authorization
- `/api/dashboard/*` - Dashboard data
- `/api/tasks/*` - Task management
- `/api/trainees/*` - Trainee information
- `/api/notifications/*` - Notification system
- `/api/ai/*` - AI integration endpoints

## 🛠️ Development

### Working with Migrations

When you modify the Entity Framework models:

```powershell
# Create a new migration
dotnet ef migrations add DescriptiveNameOfChange --project .\backend\Nasps.Api\Nasps.Api.csproj --context NaspsDbContext

# Apply migrations to the database
dotnet ef database update --project .\backend\Nasps.Api\Nasps.Api.csproj
```

### Email Configuration

The backend includes SMTP email support. Configure in `appsettings.Development.json`:

```json
{
  "Email": {
    "SmtpServer": "your-smtp-server",
    "SmtpPort": 587,
    "UseSsl": true,
    "FromAddress": "noreply@nasps.com",
    "Username": "your-username",
    "Password": "your-password"
  }
}
```

### Local Email Testing

Sent emails are stored in `backend/Nasps.Api/sent-emails/` for development and testing.

## 🐛 Troubleshooting

| Issue | Solution |
| --- | --- |
| **Backend fails to start** | Ensure SQL Server is running and accessible. Check `ConnectionStrings__Default` in appsettings.json |
| **CORS errors in browser** | Add the frontend origin to `Cors:AllowedOrigins` in backend configuration |
| **LAN access fails** | Verify firewall rules are created and backend is bound to `0.0.0.0` not `localhost` |
| **npm dependencies fail** | Delete `node_modules` folder and `package-lock.json`, then run `npm install` again |
| **Database migration errors** | Ensure the `nasps_intern_app` database exists or your user has creation permissions |
| **Port already in use** | Use `netstat -ano \| findstr :PORT` to find and stop the process using the port |
| **Frontend can't reach API** | Check CORS settings and verify API URL in browser developer tools Network tab |

## 📝 Environment Variables

### Backend (appsettings.json or environment variables)

```
Jwt:Key                          # JWT signing key
ConnectionStrings__Default       # Database connection string
Database__Provider               # "SqlServer" or "Sqlite"
Cors__AllowedOrigins__0          # Frontend origin
DevelopmentData:Seed             # Enable sample data (true/false)
ASPNETCORE_URLS                  # Server URL binding
ASPNETCORE_ENVIRONMENT           # Development/Production
```

### Frontend (.angular-cli.json or environment.ts)

The frontend derives the API URL from the current browser address, so no explicit API URL configuration is needed in most cases.

## 📄 License

Proprietary - NASPS Organization

## 👥 Support

For issues, questions, or contributions, please contact the development team or refer to the NETWORK_SETUP.md file for advanced deployment scenarios.
| `eng.admin@nasps.com` | `Admin@123` | Admin (Engineering) | only Engineering trainees/tasks |
| `design.admin@nasps.com` | `Admin@123` | Admin (Design) | only Design trainees/tasks |
| `NASPS-T002` | `NASPS@T002` | Trainee (Sara Mohamed) | own tasks; first login forces a password change |

Trainees can also log in with their email or numeric ID. When an admin creates a trainee, the API returns a generated Trainee ID, username (`NASPS-T00x`) and one-time password; the trainee uses them once, then sets a private password.


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

**SMTP Configuration** — SMTP credentials are stored in .NET user-secrets (never committed to source control) or deployment environment variables. For an SMTP server that uses implicit SSL on port 465, set `Email:UseSslOnConnect=true` and `Email:UseStartTls=false`. The optional `Email:TimeoutMilliseconds` setting defaults to 30000. Set `Email:WebsiteUrl` to the website URL. Verification and password-reset emails embed the NASPS logo as an inline image and link directly to the matching Verify Email or Forgot Password page with the registered email prefilled.

### Live AI configuration

The saved Coursera/Udemy resources work without a provider. Live learning paths,task drafts, and admin insights require provider credentials stored outside source:

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
available. Configure SMTP settings for real email delivery.

## Accounts & roles

All people live in one `Users` table, distinguished by a `Role` column
(`Trainee` | `Admin` | `SuperAdmin`) and a `Department` string.

- **Super Admin** — unrestricted; `GET /api/trainees` and `GET /api/tasks` return everything.
- **Admin** — department-scoped. The JWT carries a `department` claim; the API filters every trainee/task query to `Trainee.Department == admin.Department` (exact match), and blocks creating or moving a trainee outside that department.
- **Trainee** — sees only their own tasks.

## Backend structure

```
backend/
├─ Nasps.sln
└─ Nasps.Api/
   ├─ Program.cs              DI, JWT auth (MapInboundClaims = false), CORS,
   │                          configurable DbContext, migrations, optional sample seed
   ├─ appsettings.json        Jwt, SQL Server connection string, SMTP flags, AI placeholders
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
   │   ├─ TasksController.cs       CRUD + upload/download endpoints, role-scoped; POST/DELETE are admin-only, PUT allows a trainee to update their own task
   │   │                           
   │   └─ NotificationsController.cs  GET /api/notifications, PUT /{id}/read
   └─ Migrations/             EF Core migration that builds the schema
```

**Request flow:** Angular → JWT bearer middleware → CORS → Controller
(`[Authorize(Roles = "admin")]` etc.) → Service → `NaspsDbContext` (EF Core) → SQL Server → JSON.

**Database tables:** `Users`, `Tasks`, `Notifications`, `__EFMigrationsHistory`.
`Tasks.TraineeId` and `Notifications.RecipientId` are FKs to `Users.Id` (cascade delete).
Profile images and task/submission file bytes are persisted in the configured database.

**Angular ↔ API sync:** the Angular `DataService` calls the API for every trainee/task
create, update and delete whenever a token is present, and refreshes lists from the API on each admin/trainee page. Secure mutations require the API and do not report local fake success when it is unavailable. Task status values (`In Progress`, `Needs Changes`) round-trip via `JsonStringEnumMemberName` on the backend enum.

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

# 4. admin self sign-up + the real verification code received in email
curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"Huda Nabil","email":"huda@nasps.com","password":"Passw0rd!","department":"HR"}'
CODE=<paste-the-6-digit-code-from-email>
curl -s -X POST http://localhost:5222/api/auth/verify-email -H "Content-Type: application/json" \
  -d "{\"email\":\"huda@nasps.com\",\"code\":\"$CODE\"}"
curl -s -X POST http://localhost:5222/api/auth/login -H "Content-Type: application/json" \
  -d '{"identifier":"huda@nasps.com","password":"Passw0rd!"}'                          # 200 + token
# non-NASPS email is rejected:
curl -s -X POST http://localhost:5222/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"X","email":"x@example.com","password":"Passw0rd!","department":"HR"}'      # 400
```

Codes are not returned by the API. With SMTP configured they arrive in the recipient inbox. Missing SMTP returns a clear `503` rather than fake success.

In Development the OpenAPI document is served at
`http://localhost:5222/openapi/v1.json` (import into Postman / Swagger UI). Inspect the database directly with
`sqlcmd -S localhost -E -C -d nasps_intern_app -Q "SELECT Id,Name,Role,Department FROM Users"`.

There is no automated test project yet; add one with
`dotnet new xunit -o backend/Nasps.Api.Tests` + `Microsoft.AspNetCore.Mvc.Testing`
and drive it through `WebApplicationFactory<Program>`.

## Frontend notes

The Angular app is **zoneless** (no `zone.js`). Any component state set after an
`await`, in a `subscribe`, or in a `setTimeout` **must be a signal** or the view will not update.

## Frontend features

- One token-driven Login component and one role-aware Dashboard component
- Protected role-based routes; mandatory first-login password change
- Admin dashboard with live task counts; personalized trainee dashboard
- Saved Coursera/Udemy starter resources plus live AI-generated learning paths
- AI task drafting for admins and AI trainee-progress insights
- Trainee list (add / edit / status toggle / search / delete) — now shows only the signed-in admin's department when the backend is reachable
- One-time email OTP verification before the trainee sets a private password
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
