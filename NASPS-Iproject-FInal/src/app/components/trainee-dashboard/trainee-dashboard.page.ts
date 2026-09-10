import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskPriority, TrainingTask } from '../../models/models';
import { AuthService } from '../../core/auth.service';
import { DataService } from '../../core/data.service';
import { AiCourseSuggestions } from '../ai-course-suggestions/ai-course-suggestions';

@Component({
  selector: 'app-trainee-dashboard-page',
  imports: [DatePipe, RouterLink, AiCourseSuggestions],
  templateUrl: './trainee-dashboard.page.html',
  styleUrl: './trainee-dashboard.page.css',
})
export class TraineeDashboardPage {
  private readonly priorityOrder: Record<TaskPriority, number> = { High: 0, Medium: 1, Low: 2 };
  readonly trainee = computed(() => this.data.trainees().find(item => item.id === this.auth.currentTraineeId()));
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

  constructor(readonly data: DataService, readonly auth: AuthService) {}

  private sortForAction(tasks: TrainingTask[]): TrainingTask[] {
    const statusOrder: Record<string, number> = { 'Needs Changes': 0, 'In Progress': 1, 'Pending': 2 };
    return [...tasks].sort((a, b) =>
      (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3) ||
      this.priorityOrder[a.priority] - this.priorityOrder[b.priority] ||
      a.dueDate.localeCompare(b.dueDate)
    );
  }
}
