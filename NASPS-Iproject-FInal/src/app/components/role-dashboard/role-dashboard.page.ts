import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardBreakdown, TaskPriority, TrainingTask } from '../../models/models';
import { AuthService } from '../../core/auth.service';
import { DataService } from '../../core/data.service';
import { DashboardService } from './dashboard.service';
import { AiCourseSuggestions } from '../ai-course-suggestions/ai-course-suggestions';

@Component({
  selector: 'app-role-dashboard-page',
  imports: [DatePipe, RouterLink, AiCourseSuggestions],
  templateUrl: './role-dashboard.page.html',
  styleUrl: './role-dashboard.page.css',
})
export class RoleDashboardPage {
  readonly isAdmin = computed(() => this.auth.role() === 'admin');
  readonly isSuperAdmin = computed(() =>
    this.dashboard.summary()?.isSuperAdmin ?? this.auth.identity().isSuperAdmin);
  readonly trainee = computed(() =>
    this.auth.currentUser() ?? this.data.trainees().find(item => item.id === this.auth.currentTraineeId()));

  readonly adminStats = computed(() => {
    const summary = this.dashboard.summary();
    if (!summary) return [];
    return [
      { label: 'Department Trainees', value: summary.totalTrainees, hint: summary.scopeLabel, tone: 'blue', icon: '♙' },
      { label: 'Active Trainees', value: summary.activeTrainees, hint: `${summary.inactiveTrainees} inactive`, tone: 'green', icon: '●' },
      { label: 'Total Tasks', value: summary.totalTasks, hint: `${summary.pendingTasks} pending`, tone: 'violet', icon: '✓' },
      { label: 'Completion Rate', value: `${summary.completionRate}%`, hint: `${summary.completedTasks} completed`, tone: 'orange', icon: '↗' },
    ];
  });

  readonly superAdminStats = computed(() => {
    const summary = this.dashboard.summary();
    if (!summary) return [];
    return [
      { label: 'Total Trainees', value: summary.totalTrainees, hint: `${summary.currentYearTrainees} joined in ${summary.currentYear}`, tone: 'blue', icon: '♙' },
      { label: 'Internship Departments', value: summary.internshipDepartments.length, hint: `${summary.currentYear} active intake`, tone: 'violet', icon: '▦' },
      { label: 'Top Department', value: summary.topDepartment ?? '—', hint: 'Most trainees this year', tone: 'green', icon: '★' },
      { label: 'Universities', value: summary.universityBreakdown.length, hint: `${summary.currentYear} representation`, tone: 'orange', icon: '⌂' },
    ];
  });

  readonly taskBreakdown = computed<DashboardBreakdown[]>(() => {
    const summary = this.dashboard.summary();
    return summary ? [
      { label: 'Pending', count: summary.pendingTasks },
      { label: 'In Progress', count: summary.inProgressTasks },
      { label: 'Needs Changes', count: summary.needsChangesTasks },
      { label: 'Completed', count: summary.completedTasks },
    ] : [];
  });

  private readonly priorityOrder: Record<TaskPriority, number> = { High: 0, Medium: 1, Low: 2 };
  readonly assignedTasks = computed(() => this.data.tasks().filter(task => task.traineeId === this.auth.currentTraineeId()));
  readonly completedTasks = computed(() => this.assignedTasks().filter(task => task.status === 'Completed'));
  readonly pendingTasks = computed(() => this.assignedTasks().filter(task => task.status === 'Pending'));
  readonly inProgressTasks = computed(() => this.assignedTasks().filter(task => task.status === 'In Progress' || task.status === 'Needs Changes'));
  readonly progress = computed(() => this.assignedTasks().length
    ? Math.round((this.completedTasks().length / this.assignedTasks().length) * 100)
    : 0);
  readonly nextTask = computed(() => this.sortForAction(this.assignedTasks().filter(task => task.status !== 'Completed'))[0]);
  readonly upcomingTasks = computed(() => this.sortForAction(this.assignedTasks().filter(task => task.status !== 'Completed')).slice(0, 3));
  readonly nextTaskReason = computed(() => {
    const task = this.nextTask();
    if (!task) return 'You have completed every assigned task.';
    if (task.status === 'Needs Changes') return 'The admin requested changes, so this should be handled first.';
    if (task.status === 'In Progress') return 'Continue the work you already started before opening another task.';
    if (task.priority === 'High') return 'This is your highest-priority open task and should be your next focus.';
    return 'This is the nearest open deadline in your current task list.';
  });

  constructor(
    readonly data: DataService,
    readonly auth: AuthService,
    readonly dashboard: DashboardService,
  ) {
    void this.auth.loadCurrentUser();
    void this.data.refreshNotificationsFromServer();
    if (this.auth.role() === 'admin') {
      void this.data.refreshTraineesFromServer();
      void this.data.refreshTasksFromServer();
      void this.dashboard.refreshAdminDashboard();
    } else {
      void this.data.refreshTasksFromServer(this.auth.currentTraineeId());
    }
  }

  barWidth(count: number, items: DashboardBreakdown[]): number {
    const maximum = Math.max(1, ...items.map(item => item.count));
    return Math.max(count > 0 ? 8 : 0, Math.round(count * 100 / maximum));
  }

  percentage(count: number, total: number): number {
    return total ? Math.round(count * 100 / total) : 0;
  }

  private sortForAction(tasks: TrainingTask[]): TrainingTask[] {
    const statusOrder: Record<string, number> = { 'Needs Changes': 0, 'In Progress': 1, 'Pending': 2 };
    return [...tasks].sort((a, b) =>
      (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3) ||
      this.priorityOrder[a.priority] - this.priorityOrder[b.priority] ||
      a.dueDate.localeCompare(b.dueDate)
    );
  }
}
