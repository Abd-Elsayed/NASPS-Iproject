import { computed, Injectable, signal } from '@angular/core';
import { AppNotification, Profile, Trainee, TrainingTask } from '../models/models';

const TRAINEES: Trainee[] = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', internshipProgram: 'UI/UX Design', phone: '+20 101 234 5678', department: 'Design', university: 'Cairo University', joinDate: '2024-01-10', status: 'Active' },
  { id: 2, name: 'Sara Mohamed', email: 'sara@example.com', internshipProgram: 'Frontend Web Development', phone: '+20 102 345 6789', department: 'Engineering', university: 'Ain Shams University', joinDate: '2024-02-14', status: 'Active' },
  { id: 3, name: 'Mostafa Khaled', email: 'mostafa@example.com', internshipProgram: 'Data Science & AI', phone: '+20 103 456 7890', department: 'Data & AI', university: 'Mansoura University', joinDate: '2024-03-02', status: 'Active' },
  { id: 4, name: 'Nourhan Ahmed', email: 'nourhan@example.com', internshipProgram: 'Project Management', phone: '+20 104 567 8901', department: 'Operations', university: 'Alexandria University', joinDate: '2024-03-20', status: 'Inactive' },
  { id: 5, name: 'Omar Hassan', email: 'omar@example.com', internshipProgram: 'Mobile Application Development', phone: '+20 105 678 9012', department: 'Engineering', university: 'Helwan University', joinDate: '2024-04-05', status: 'Active' },
];

const TASKS: TrainingTask[] = [
  { id: 1, title: 'Design Training Module', description: 'Create a polished module for the upcoming training cohort.', traineeId: 1, priority: 'High', dueDate: '2026-09-12', status: 'Pending', attachment: 'design-brief.pdf', instructions: 'Use the brand grid and include a mobile version.' },
  { id: 2, title: 'User Research', description: 'Conduct user research for the new training platform.', traineeId: 2, priority: 'Medium', dueDate: '2026-09-15', status: 'In Progress', attachment: 'research-guide.pdf', instructions: 'Interview at least five trainees and summarize findings.', submission: 'research-report.pdf', submissionName: 'research-report.pdf', submissionType: 'application/pdf' },
  { id: 3, title: 'Create Wireframes', description: 'Create desktop and mobile wireframes for the trainee portal.', traineeId: 3, priority: 'Medium', dueDate: '2026-09-18', status: 'Completed', submission: 'wireframes.fig', submissionName: 'wireframes.fig', adminReview: 'Clear flow and good use of hierarchy.' },
  { id: 4, title: 'Develop Prototype', description: 'Build a clickable prototype for the selected user flow.', traineeId: 4, priority: 'High', dueDate: '2026-09-20', status: 'Completed', submission: 'prototype-link.txt', submissionName: 'prototype-link.txt', adminReview: 'Approved for user testing.' },
  { id: 5, title: 'Testing & Feedback', description: 'Run usability testing and prepare a concise feedback report.', traineeId: 5, priority: 'Low', dueDate: '2026-09-24', status: 'Pending', instructions: 'Capture issues, severity and recommendation.' },
  { id: 6, title: 'Angular Routing Exercise', description: 'Create admin and trainee routes with protected child pages.', traineeId: 2, priority: 'High', dueDate: '2026-09-26', status: 'Pending', instructions: 'Use standalone components and functional route guards.' },
  { id: 7, title: 'Responsive Dashboard QA', description: 'Check the dashboard layout on desktop, tablet and mobile widths.', traineeId: 2, priority: 'Medium', dueDate: '2026-09-28', status: 'In Progress', attachment: 'qa-checklist.pdf', instructions: 'Record each issue and the CSS rule used to fix it.' },
  { id: 8, title: 'Git Feature Branch Practice', description: 'Create a feature branch and document the pull request workflow.', traineeId: 2, priority: 'Low', dueDate: '2026-09-30', status: 'Completed', submission: 'git-workflow.md', submissionName: 'git-workflow.md', submissionType: 'text/markdown', adminReview: 'Good commit messages and branch naming.' },
];

const NOTIFICATIONS: AppNotification[] = [
  { id: 1, category: 'Tasks', message: 'New task “Design Training Module” has been created.', time: '2 min ago', read: false },
  { id: 2, category: 'Tasks', message: 'Sara Mohamed submitted a task for review.', time: '15 min ago', read: false },
  { id: 3, category: 'Tasks', message: 'Task “User Research” is due soon.', time: '1 hour ago', read: true },
  { id: 4, category: 'System', message: 'System maintenance is scheduled for Sunday.', time: '1 day ago', read: true },
  { id: 5, category: 'System', message: 'New trainee Omar Hassan has joined.', time: '2 days ago', read: true },
];

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly trainees = signal<Trainee[]>(this.loadTrainees());
  readonly tasks = signal<TrainingTask[]>(this.read('nasps-tasks', TASKS));
  readonly notifications = signal<AppNotification[]>(this.read('nasps-notifications', NOTIFICATIONS));
  readonly adminProfile = signal<Profile>({ fullName: 'Admin User', email: 'admin@nasps.com', phone: '+20 123 456 7890', role: 'Super Admin', department: 'System Administration', university: 'Cairo University', joinDate: '2024-01-10' });
  readonly traineeProfile = signal<Profile>({ fullName: 'Sara Mohamed', email: 'sara@example.com', phone: '+20 102 345 6789', role: 'Trainee', department: 'Engineering', university: 'Ain Shams University', joinDate: '2024-02-14' });
  readonly pendingTasks = computed(() => this.tasks().filter(task => task.status === 'Pending').length);
  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'Completed').length);

  addTrainee(trainee: Omit<Trainee, 'id'>): Trainee {
    const created = { ...trainee, id: this.nextId(this.trainees()) };
    this.trainees.update(items => [...items, created]);
    this.persist('nasps-trainees', this.trainees());
    return created;
  }

  updateTrainee(id: number, patch: Partial<Trainee>): void {
    this.trainees.update(items => items.map(item => item.id === id ? { ...item, ...patch } : item));
    this.persist('nasps-trainees', this.trainees());
  }

  deleteTrainee(id: number): void {
    this.trainees.update(items => items.filter(item => item.id !== id));
    this.persist('nasps-trainees', this.trainees());
  }

  addTask(task: Omit<TrainingTask, 'id'>): void {
    this.tasks.update(items => [{ ...task, id: this.nextId(items) }, ...items]);
    this.persist('nasps-tasks', this.tasks());
  }

  updateTask(id: number, patch: Partial<TrainingTask>): void {
    this.tasks.update(items => items.map(item => item.id === id ? { ...item, ...patch } : item));
    this.persist('nasps-tasks', this.tasks());
  }

  markAllRead(): void {
    this.notifications.update(items => items.map(item => ({ ...item, read: true })));
    this.persist('nasps-notifications', this.notifications());
  }

  updateProfile(role: 'admin' | 'trainee', profile: Profile): void {
    role === 'admin' ? this.adminProfile.set(profile) : this.traineeProfile.set(profile);
  }

  resetDemo(): void {
    localStorage.removeItem('nasps-trainees');
    localStorage.removeItem('nasps-tasks');
    localStorage.removeItem('nasps-notifications');
    this.trainees.set(TRAINEES);
    this.tasks.set(TASKS);
    this.notifications.set(NOTIFICATIONS);
  }

  private nextId(items: { id: number }[]): number {
    return Math.max(0, ...items.map(item => item.id)) + 1;
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
