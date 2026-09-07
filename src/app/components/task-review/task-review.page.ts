import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({ selector: 'app-task-review-page', imports: [DatePipe, DecimalPipe, FormsModule, RouterLink], templateUrl: './task-review.page.html', styleUrl: './task-review.page.css' })
export class TaskReviewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly task = this.data.tasks().find(item => item.id === this.id);
  review = this.task?.adminReview ?? '';
  traineeName(): string { return this.data.trainees().find(item => item.id === this.task?.traineeId)?.name ?? 'Unassigned'; }
  decide(approved: boolean): void {
    if (!this.task) {
      this.toast.show('Task not found.', 'error');
      return;
    }
    if (!approved && this.review.trim().length < 5) {
      this.toast.show('Add clear feedback before requesting changes.', 'error');
      return;
    }
    this.data.updateTask(this.task.id, { status: approved ? 'Completed' : 'Needs Changes', adminReview: this.review.trim() || 'Approved.' });
    this.toast.show(approved ? 'Task approved successfully.' : 'Changes requested and feedback saved.', approved ? 'success' : 'warning');
    this.router.navigate(['/admin/tasks']);
  }
}
