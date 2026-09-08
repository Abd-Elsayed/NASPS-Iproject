import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AttachmentComponent } from '../attachment/attachment.component';

@Component({
  selector: 'app-task-review-page',
  imports: [DatePipe, FormsModule, RouterLink, AttachmentComponent],
  templateUrl: './task-review.page.html',
  styleUrl: './task-review.page.css',
})
export class TaskReviewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly task = computed(() => this.data.tasks().find(item => item.id === this.id));
  readonly review = signal('');
  private reviewLoaded = false;

  constructor() {
    void this.data.refreshTasksFromServer();
    void this.data.refreshTraineesFromServer();
    effect(() => {
      const task = this.task();
      if (task && !this.reviewLoaded) {
        this.review.set(task.adminReview ?? '');
        this.reviewLoaded = true;
      }
    });
  }

  traineeName(): string {
    return this.data.trainees().find(item => item.id === this.task()?.traineeId)?.name ?? 'Unassigned';
  }

  removeAssignmentAttachment(): void {
    const task = this.task();
    if (!task) return;
    void this.data.updateTask(task.id, { clearAttachment: true });
    this.toast.show('Assignment attachment removed.', 'info');
  }

  removeSubmission(): void {
    const task = this.task();
    if (!task) return;
    void this.data.updateTask(task.id, { clearSubmission: true });
    this.toast.show('Submission cleared.', 'warning');
  }

  decide(approved: boolean): void {
    const task = this.task();
    if (!task) {
      this.toast.show('Task not found.', 'error');
      return;
    }
    if (!approved && this.review().trim().length < 5) {
      this.toast.show('Add clear feedback before requesting changes.', 'error');
      return;
    }
    void this.data.updateTask(task.id, {
      status: approved ? 'Completed' : 'Needs Changes',
      adminReview: this.review().trim() || 'Approved.',
    });
    this.toast.show(approved ? 'Task approved successfully.' : 'Changes requested and feedback saved.', approved ? 'success' : 'warning');
    this.router.navigate(['/admin/tasks']);
  }
}
