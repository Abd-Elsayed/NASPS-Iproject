import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppNotification, Profile, Trainee, TrainingTask } from '../models/models';
import { API_BASE_URL } from './api-url';

export interface TraineeAccess {
  traineeId: number;
  username: string;
  temporaryPassword: string;
}

const TRAINEES: Trainee[] = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', internshipProgram: 'Summer 2026', phone: '+20 101 234 5678', department: 'Design', university: 'Cairo University', joinDate: '2024-01-10', status: 'Active' },
  { id: 2, name: 'Sara Mohamed', email: 'sara@example.com', internshipProgram: 'Summer 2026', phone: '+20 102 345 6789', department: 'Engineering', university: 'Ain Shams University', joinDate: '2024-02-14', status: 'Active' },
  { id: 3, name: 'Mostafa Khaled', email: 'mostafa@example.com', internshipProgram: 'Winter 2026', phone: '+20 103 456 7890', department: 'Data & AI', university: 'Mansoura University', joinDate: '2024-03-02', status: 'Active' },
  { id: 4, name: 'Nourhan Ahmed', email: 'nourhan@example.com', internshipProgram: 'Winter 2026', phone: '+20 104 567 8901', department: 'Operations', university: 'Alexandria University', joinDate: '2024-03-20', status: 'Inactive' },
  { id: 5, name: 'Omar Hassan', email: 'omar@example.com', internshipProgram: 'Summer 2026', phone: '+20 105 678 9012', department: 'Engineering', university: 'Helwan University', joinDate: '2024-04-05', status: 'Active' },
];

const TASKS: TrainingTask[] = [
  { id: 1, title: 'Design Training Module', description: 'Create a polished module for the upcoming training cohort.', traineeId: 1, priority: 'High', dueDate: '2026-09-12', status: 'Pending', attachment: 'design-brief.pdf' },
  { id: 2, title: 'User Research', description: 'Conduct user research for the new training platform.', traineeId: 2, priority: 'Medium', dueDate: '2026-09-15', status: 'In Progress', attachment: 'research-guide.pdf', submission: 'research-report.pdf', submissionName: 'research-report.pdf', submissionType: 'application/pdf' },
  { id: 3, title: 'Create Wireframes', description: 'Create desktop and mobile wireframes for the trainee portal.', traineeId: 3, priority: 'Medium', dueDate: '2026-09-18', status: 'Completed', submission: 'wireframes.fig', submissionName: 'wireframes.fig', adminReview: 'Clear flow and good use of hierarchy.' },
  { id: 4, title: 'Develop Prototype', description: 'Build a clickable prototype for the selected user flow.', traineeId: 4, priority: 'High', dueDate: '2026-09-20', status: 'Completed', submission: 'prototype-link.txt', submissionName: 'prototype-link.txt', adminReview: 'Approved for user testing.' },
  { id: 5, title: 'Testing & Feedback', description: 'Run usability testing and prepare a concise feedback report.', traineeId: 5, priority: 'Low', dueDate: '2026-09-24', status: 'Pending' },
  { id: 6, title: 'Angular Routing Exercise', description: 'Create admin and trainee routes with protected child pages.', traineeId: 2, priority: 'High', dueDate: '2026-09-26', status: 'Pending' },
  { id: 7, title: 'Responsive Dashboard QA', description: 'Check the dashboard layout on desktop, tablet and mobile widths.', traineeId: 2, priority: 'Medium', dueDate: '2026-09-28', status: 'In Progress', attachment: 'qa-checklist.pdf' },
  { id: 8, title: 'Git Feature Branch Practice', description: 'Create a feature branch and document the pull request workflow.', traineeId: 2, priority: 'Low', dueDate: '2026-09-30', status: 'Completed', submission: 'git-workflow.md', submissionName: 'git-workflow.md', submissionType: 'text/markdown', adminReview: 'Good commit messages and branch naming.' },
];

const NOTIFICATIONS: AppNotification[] = [
  { id: 1, category: 'Tasks', message: 'New task “Design Training Module” has been created.', time: '2 min ago', read: false },
  { id: 2, category: 'Tasks', message: 'Sara Mohamed submitted a task for review.', time: '15 min ago', read: false },
  { id: 3, category: 'Tasks', message: 'Task “User Research” is due soon.', time: '1 hour ago', read: true },
  { id: 4, category: 'System', message: 'System maintenance is scheduled for Sunday.', time: '1 day ago', read: true },
  { id: 5, category: 'System', message: 'New trainee Omar Hassan has joined.', time: '2 days ago', read: true },
];

const ADMIN_PROFILE: Profile = { fullName: 'Admin User', email: 'admin@nasps.com', phone: '+20 123 456 7890', role: 'Super Admin', department: 'System Administration', university: 'Cairo University', joinDate: '2024-01-10' };
const TRAINEE_PROFILE: Profile = { fullName: 'Sara Mohamed', email: 'sara@example.com', phone: '+20 102 345 6789', role: 'Trainee', department: 'Engineering', university: 'Ain Shams University', joinDate: '2024-02-14' };

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly apiUrl = API_BASE_URL;
  readonly trainees = signal<Trainee[]>(this.loadTrainees());
  readonly tasks = signal<TrainingTask[]>(this.read('nasps-tasks', TASKS));
  readonly notifications = signal<AppNotification[]>(this.read('nasps-notifications', NOTIFICATIONS));
  readonly adminProfile = signal<Profile>(this.read('nasps-admin-profile', ADMIN_PROFILE));
  readonly traineeProfile = signal<Profile>(this.read('nasps-trainee-profile', TRAINEE_PROFILE));
  readonly pendingTasks = computed(() => this.tasks().filter(task => task.status === 'Pending').length);
  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'Completed').length);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', event => {
        if (event.key === 'nasps-trainees') this.trainees.set(this.loadTrainees());
        if (event.key === 'nasps-tasks') this.tasks.set(this.read('nasps-tasks', TASKS));
        if (event.key === 'nasps-trainee-profile') this.traineeProfile.set(this.read('nasps-trainee-profile', TRAINEE_PROFILE));
        if (event.key === 'nasps-admin-profile') this.adminProfile.set(this.read('nasps-admin-profile', ADMIN_PROFILE));
      });
    }
  }

  private get authorized(): boolean {
    return !!this.http && typeof localStorage !== 'undefined' && !!localStorage.getItem('nasps-access-token');
  }

  /**
   * Prevent account A's cached alerts from flashing for account B while the
   * authenticated API data is loading. Demo constants remain available to the
   * explicit resetDemo action; real sessions always start with a clean inbox.
   */
  beginAuthenticatedSession(): void {
    this.notifications.set([]);
    localStorage.removeItem('nasps-notifications');
  }

  // --- Trainees ---------------------------------------------------------------

  /** Creates the trainee on the authenticated API; no fake local account is created on failure. */
  async createTrainee(trainee: Omit<Trainee, 'id'>): Promise<TraineeAccess | null> {
    if (this.authorized) {
      try {
        const access = await firstValueFrom(this.http!.post<TraineeAccess>(`${this.apiUrl}/trainees`, {
          name: trainee.name,
          email: trainee.email,
          internshipProgram: trainee.internshipProgram,
          phone: trainee.phone,
          department: trainee.department,
          university: trainee.university,
        }));
        await this.refreshTraineesFromServer();
        return access;
      } catch { return null; }
    }
    return null;
  }

  private addTraineeLocal(trainee: Omit<Trainee, 'id'>): Trainee {
    const created = { ...trainee, id: this.nextId(this.trainees()) };
    this.trainees.update(items => [...items, created]);
    this.persist('nasps-trainees', this.trainees());
    return created;
  }

  async updateTrainee(id: number, patch: Partial<Trainee>): Promise<boolean> {
    const current = this.trainees().find(item => item.id === id);
    if (!current || !this.authorized) return false;
    const updated = { ...current, ...patch };
    try {
      await firstValueFrom(this.http!.put<void>(`${this.apiUrl}/trainees/${id}`, {
        name: updated.name, email: updated.email, internshipProgram: updated.internshipProgram,
        phone: updated.phone, department: updated.department, university: updated.university, status: updated.status,
      }));
      await this.refreshTraineesFromServer();
      return true;
    } catch { return false; }
  }

  async refreshTraineesFromServer(): Promise<boolean> {
    if (!this.http) return false;
    try {
      const trainees = await firstValueFrom(this.http.get<Trainee[]>(`${this.apiUrl}/trainees`));
      this.trainees.set(trainees);
      this.persist('nasps-trainees', trainees);
      return true;
    } catch {
      return false;
    }
  }

  async deleteTrainee(id: number): Promise<boolean> {
    if (this.authorized) {
      try {
        await firstValueFrom(this.http!.delete<void>(`${this.apiUrl}/trainees/${id}`));
        this.trainees.update(items => items.filter(item => item.id !== id));
        this.persist('nasps-trainees', this.trainees());
        return true;
      } catch { return false; }
    }
    return false;
  }

  // --- Tasks -----------------------------------------------------------------

  async refreshTasksFromServer(traineeId?: number): Promise<boolean> {
    if (!this.authorized) return false;
    try {
      const url = traineeId ? `${this.apiUrl}/tasks?traineeId=${traineeId}` : `${this.apiUrl}/tasks`;
      const tasks = await firstValueFrom(this.http!.get<TrainingTask[]>(url));
      this.tasks.set(tasks);
      this.persist('nasps-tasks', tasks);
      return true;
    } catch {
      return false;
    }
  }

  async addTask(task: Omit<TrainingTask, 'id'>): Promise<TrainingTask> {
    if (this.authorized) {
      try {
        const created = await firstValueFrom(this.http!.post<TrainingTask>(`${this.apiUrl}/tasks`, {
          title: task.title,
          description: task.description,
          traineeId: task.traineeId,
          priority: task.priority,
          dueDate: task.dueDate,
          instructions: task.instructions,
          attachment: task.attachment,
          attachmentType: task.attachmentType,
          attachmentSize: task.attachmentSize,
        }));
        this.tasks.update(items => [created, ...items]);
        this.persist('nasps-tasks', this.tasks());
        return created;
      } catch { throw new Error('The task could not be created on the server.'); }
    }
    throw new Error('The authenticated API is required to create a task.');
  }

  async uploadTaskAttachment(taskId: number, file: File): Promise<boolean> {
    return this.uploadTaskFile(taskId, 'attachment', file);
  }

  async uploadTaskSubmission(taskId: number, file: File): Promise<boolean> {
    return this.uploadTaskFile(taskId, 'submission', file);
  }

  async downloadTaskAttachment(taskId: number, fileName: string): Promise<boolean> {
    return this.downloadTaskFile(taskId, 'attachment', fileName);
  }

  async downloadTaskSubmission(taskId: number, fileName: string): Promise<boolean> {
    return this.downloadTaskFile(taskId, 'submission', fileName);
  }

  async updateTask(id: number, patch: Partial<TrainingTask> & { clearAttachment?: boolean; clearSubmission?: boolean }): Promise<boolean> {
    if (this.authorized) {
      try {
        const updated = await firstValueFrom(this.http!.put<TrainingTask>(`${this.apiUrl}/tasks/${id}`, patch));
        this.tasks.update(items => items.map(item => item.id === id ? updated : item));
        this.persist('nasps-tasks', this.tasks());
        return true;
      } catch { return false; }
    }
    return false;
  }

  async deleteTask(id: number): Promise<boolean> {
    if (this.authorized) {
      try {
        await firstValueFrom(this.http!.delete<void>(`${this.apiUrl}/tasks/${id}`));
        this.tasks.update(items => items.filter(item => item.id !== id));
        this.persist('nasps-tasks', this.tasks());
        return true;
      } catch { return false; }
    }
    return false;
  }

  // --- Notifications / profile ---------------------------------------------

  readonly unreadNotifications = computed(() => this.notifications().filter(item => !item.read).length);

  async refreshNotificationsFromServer(): Promise<boolean> {
    if (!this.authorized) return false;
    try {
      const items = await firstValueFrom(this.http!.get<AppNotification[]>(`${this.apiUrl}/notifications`));
      this.notifications.set(items);
      this.persist('nasps-notifications', items);
      return true;
    } catch {
      return false;
    }
  }

  async markAllRead(): Promise<void> {
    this.notifications.update(items => items.map(item => ({ ...item, read: true })));
    this.persist('nasps-notifications', this.notifications());
    if (this.authorized) {
      try { await firstValueFrom(this.http!.put<void>(`${this.apiUrl}/notifications/read-all`, {})); } catch { /* local already updated */ }
    }
  }

  async markRead(id: number): Promise<void> {
    this.notifications.update(items => items.map(item => item.id === id ? { ...item, read: true } : item));
    this.persist('nasps-notifications', this.notifications());
    if (this.authorized) {
      try { await firstValueFrom(this.http!.put<void>(`${this.apiUrl}/notifications/${id}/read`, {})); } catch { /* local already updated */ }
    }
  }

  updateProfile(role: 'admin' | 'trainee', profile: Profile): void {
    if (role === 'admin') {
      this.adminProfile.set(profile);
      this.persist('nasps-admin-profile', profile);
    } else {
      this.traineeProfile.set(profile);
      this.persist('nasps-trainee-profile', profile);
    }
  }

  resetDemo(): void {
    for (const key of ['nasps-trainees', 'nasps-tasks', 'nasps-notifications', 'nasps-admin-profile', 'nasps-trainee-profile']) {
      localStorage.removeItem(key);
    }
    this.trainees.set(TRAINEES);
    this.tasks.set(TASKS);
    this.notifications.set(NOTIFICATIONS);
    this.adminProfile.set(ADMIN_PROFILE);
    this.traineeProfile.set(TRAINEE_PROFILE);
  }

  private nextId(items: { id: number }[]): number {
    return Math.max(0, ...items.map(item => item.id)) + 1;
  }

  private async uploadTaskFile(taskId: number, kind: 'attachment' | 'submission', file: File): Promise<boolean> {
    if (!this.authorized) return false;
    const body = new FormData();
    body.append('file', file, file.name);
    try {
      const updated = await firstValueFrom(this.http!.post<TrainingTask>(`${this.apiUrl}/tasks/${taskId}/${kind}`, body));
      this.tasks.update(items => items.map(item => item.id === taskId ? updated : item));
      this.persist('nasps-tasks', this.tasks());
      return true;
    } catch {
      return false;
    }
  }

  private async downloadTaskFile(taskId: number, kind: 'attachment' | 'submission', fileName: string): Promise<boolean> {
    if (!this.authorized || typeof document === 'undefined') return false;
    try {
      const blob = await firstValueFrom(this.http!.get(`${this.apiUrl}/tasks/${taskId}/${kind}`, { responseType: 'blob' }));
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName || `${kind}-${taskId}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      return true;
    } catch {
      return false;
    }
  }

  private loadTrainees(): Trainee[] {
    return this.read<Partial<Trainee>[]>('nasps-trainees', TRAINEES).map((item, index) => ({
      id: item.id ?? index + 1,
      name: item.name ?? '',
      email: item.email ?? '',
      internshipProgram: item.internshipProgram ?? TRAINEES.find(trainee => trainee.id === item.id)?.internshipProgram ?? '',
      phone: item.phone ?? '',
      department: item.department ?? '',
      university: item.university ?? '',
      joinDate: item.joinDate ?? '',
      status: item.status ?? 'Active',
    }));
  }

  private read<T>(key: string, fallback: T): T {
    if (typeof localStorage === 'undefined') return fallback;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : fallback;
    } catch {
      localStorage.removeItem(key);
      return fallback;
    }
  }

  private persist(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
