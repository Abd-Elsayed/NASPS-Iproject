import { Routes } from '@angular/router';
import { adminGuard, departmentAdminGuard, superAdminGuard, traineeGuard } from './guards/auth.guard';
import { AdminFormPage } from './components/admin-form/admin-form.page';
import { AuthPage } from './components/auth/auth.page';
import { DashboardPage } from './components/dashboard/dashboard.page';
import { NotificationsPage } from './components/notifications/notifications.page';
import { ProfilePage } from './components/profile/profile.page';
import { TaskFormPage } from './components/task-form/task-form.page';
import { TaskReviewPage } from './components/task-review/task-review.page';
import { TasksPage } from './components/tasks/tasks.page';
import { TraineeFormPage } from './components/trainee-form/trainee-form.page';
import { TraineesPage } from './components/trainees/trainees.page';
import { TraineeTaskDetailsPage } from './components/trainee-task-details/trainee-task-details.page';
import { TraineeTasksPage } from './components/trainee-tasks/trainee-tasks.page';
import { TraineeDashboardPage } from './components/trainee-dashboard/trainee-dashboard.page';
import { AppShell } from './components/app-shell/app-shell';
import { RoleDashboardPage } from './components/role-dashboard/role-dashboard.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: AuthPage, data: { mode: 'login' } },
  { path: 'register', redirectTo: 'admin/admins/new' },
  { path: 'verify-email', component: AuthPage, data: { mode: 'verify' } },
  { path: 'forgot-password', component: AuthPage, data: { mode: 'forgot' } },
  { path: 'admin/login', pathMatch: 'full', redirectTo: 'login' },
  { path: 'trainee/login', pathMatch: 'full', redirectTo: 'login' },
  { path: 'user/login', pathMatch: 'full', redirectTo: 'login' },
  { path: 'create-password', component: AuthPage, data: { mode: 'password' } },
  {
    path: 'admin',
    component: AppShell,
    canActivate: [adminGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: RoleDashboardPage },
      { path: 'dashboard/legacy', component: DashboardPage },
      { path: 'admins/new', component: AdminFormPage, canActivate: [superAdminGuard] },
      { path: 'trainees', component: TraineesPage },
      { path: 'trainees/new', component: TraineeFormPage, canActivate: [departmentAdminGuard] },
      { path: 'trainees/:id/edit', component: TraineeFormPage },
      { path: 'tasks', component: TasksPage },
      { path: 'tasks/new', component: TaskFormPage },
      { path: 'tasks/:id/review', component: TaskReviewPage },
      { path: 'notifications', component: NotificationsPage },
      { path: 'profile', component: ProfilePage },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  {
    path: 'trainee',
    component: AppShell,
    canActivate: [traineeGuard],
    data: { role: 'trainee' },
    children: [
      { path: 'dashboard', component: RoleDashboardPage },
      { path: 'dashboard/legacy', component: TraineeDashboardPage },
      { path: 'tasks', component: TraineeTasksPage },
      { path: 'tasks/:id', component: TraineeTaskDetailsPage },
      { path: 'notifications', component: NotificationsPage },
      { path: 'profile', component: ProfilePage },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
