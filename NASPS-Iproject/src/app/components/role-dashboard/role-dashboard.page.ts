import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskPriority, TrainingTask } from '../../models/models';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { AiCourseSuggestions } from '../ai-course-suggestions/ai-course-suggestions';

@Component({
  selector: 'app-role-dashboard-page',
  imports: [DatePipe, RouterLink, AiCourseSuggestions],
  templateUrl: './role-dashboard.page.html',
  styleUrl: './role-dashboard.page.css',
})
export class RoleDashboardPage {
  readonly Math = Math;
  readonly isAdmin = computed(() => this.auth.role() === 'admin');
  readonly trainee = computed(() =>
    this.auth.currentUser() ?? this.data.trainees().find(item => item.id === this.auth.currentTraineeId()));

  readonly adminStats = computed(() => [
    { label: 'Trainees', value: this.data.trainees().length, hint: 'Total trainees', tone: 'blue' },
    { label: 'Tasks', value: this.data.tasks().length, hint: 'Total tasks', tone: 'violet' },
    { label: 'Pending Tasks', value: this.data.pendingTasks(), hint: 'Needs attention', tone: 'orange' },
    { label: 'Completed Tasks', value: this.data.completedTasks(), hint: 'Successfully done', tone: 'green' },
  ]);
  readonly recentAdminTasks = computed(() => this.data.tasks().slice(0, 4));

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

  constructor(readonly data: DataService, readonly auth: AuthService) {
    void this.auth.loadCurrentUser();
    void this.data.refreshNotificationsFromServer();
    if (this.auth.role() === 'admin') {
      void this.data.refreshTraineesFromServer();
      void this.data.refreshTasksFromServer();
    } else {
      void this.data.refreshTasksFromServer(this.auth.currentTraineeId());
    }
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
