# NASPS Intern Software

An Angular frontend branded for NASPS that implements the admin and trainee workflow supplied in the project brief.

## Run locally

```bash
pnpm install
pnpm start
```

Open `http://localhost:4200`.

Demo login: use the prefilled credentials on the Admin or Trainee Login page.

- Admin: `admin@nasps.com` / `Admin@123`
- Demo trainee first login: `NASPS-T002` / `NASPS@T002`

When the admin creates a trainee, the system displays a generated Trainee ID, username, and one-time password. The trainee uses them once, then must create a private password.

For the complete Arabic walkthrough, screen map, curriculum notes and submission checklist, read [PROJECT_GUIDE_AR.md](./PROJECT_GUIDE_AR.md).

## Main features

- Admin and trainee login flows with a mandatory first-login password change
- Protected role-based routes
- Admin dashboard with live task counts
- Personalized trainee dashboard with workload, progress and a recommended next task
- AI-style course learning paths based on each trainee's Internship Program
- Trainee list with add, edit, status toggle, internship-program assignment, department, search and delete
- Email OTP verification before the trainee creates a private password
- Egyptian university dropdown (including New Giza University) with an Other option
- Any-type task attachment selection up to 20 MB
- Task list with filters, assign-one/assign-all creation and review decisions
- Trainee task list and attachment/link submission flow
- Notifications and editable profiles
- Reactive validation and toast messages
- Responsive layouts and localStorage demo persistence

The project intentionally uses local demo data so it can be presented without a backend. Selected file metadata is stored, but file bytes require backend/cloud storage. `DataService` can later be replaced with `HttpClient` calls.

## Source organization

```text
src/app/
├── components/
│   └── component-name/  # TS + HTML + CSS + spec
├── services/
├── models/
└── guards/
```

# NASPS_Project
