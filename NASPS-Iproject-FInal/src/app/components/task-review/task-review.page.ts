import { Component, computed, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { ToastService } from '../../core/toast.service';
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
  /** A review decision needs something to review: an assignment attachment or a trainee submission. */
  readonly canReview = computed(() => {
    const task = this.task();
    return !!task && (!!task.attachment || !!task.submission);
  });
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

  async removeAssignmentAttachment(): Promise<void> {
    const task = this.task();
    if (!task) return;
    const ok = await this.data.updateTask(task.id, { clearAttachment: true });
    this.toast.show(ok ? 'Assignment attachment removed.' : 'The attachment could not be removed from the server.', ok ? 'info' : 'error');
  }

  async removeSubmission(): Promise<void> {
    const task = this.task();
    if (!task) return;
    const ok = await this.data.updateTask(task.id, { clearSubmission: true });
    this.toast.show(ok ? 'Submission cleared.' : 'The submission could not be cleared from the server.', ok ? 'warning' : 'error');
  }

  async downloadAssignment(): Promise<void> {
    const task = this.task();
    if (!task?.attachment) return;
    if (!await this.data.downloadTaskAttachment(task.id, task.attachment))
      this.toast.show('The assignment file is not stored on the server. Re-upload it from the task form.', 'error');
  }

  async downloadSubmission(): Promise<void> {
    const task = this.task();
    const name = task?.submissionName;
    if (!task || !name) return;
    if (!await this.data.downloadTaskSubmission(task.id, name))
      this.toast.show('The trainee submission could not be downloaded from the server.', 'error');
  }

  async decide(approved: boolean): Promise<void> {
    const task = this.task();
    if (!task) {
      this.toast.show('Task not found.', 'error');
      return;
    }
    if (!approved && this.review().trim().length < 5) {
      this.toast.show('Add clear feedback before requesting changes.', 'error');
      return;
    }
    const ok = await this.data.updateTask(task.id, {
      status: approved ? 'Completed' : 'Needs Changes',
      adminReview: this.review().trim() || 'Approved.',
    });
    if (!ok) {
      this.toast.show('The review and note could not be saved on the server.', 'error');
      return;
    }
    this.toast.show(approved ? 'Task approved successfully.' : 'Changes requested and feedback saved.', approved ? 'success' : 'warning');
    this.router.navigate(['/admin/tasks']);
  }
}
