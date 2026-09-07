import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-trainee-task-details-page',
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './trainee-task-details.page.html',
  styleUrl: './trainee-task-details.page.css',
})
export class TraineeTaskDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly task = computed(() => this.data.tasks().find(item => item.id === this.id && item.traineeId === this.auth.currentTraineeId()));
  submissionLink = this.task()?.submission?.startsWith('http') ? this.task()?.submission ?? '' : '';
  selectedFile: File | null = null;
  submissionError = '';
  readonly accept = '.pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.html,.css,.js,.ts,.tsx,.jsx,.json,.xml,.csv,.py,.java,.c,.cpp,.cs,.sql';
  private readonly allowedExtensions = new Set(this.accept.split(','));
  private readonly maxSize = 10 * 1024 * 1024;

  start(): void {
    const task = this.task();
    if (!task) return;
    if (task.status === 'Completed') {
      this.toast.show('Completed tasks cannot be restarted.', 'warning');
      return;
    }
    this.data.updateTask(task.id, { status: 'In Progress' });
    this.toast.show('Task marked as In Progress.', 'info');
  }

  onFileSelected(event: Event): void {
    this.submissionError = '';
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) { this.selectedFile = null; return; }
    const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
    if (!this.allowedExtensions.has(extension)) {
      this.selectedFile = null;
      input.value = '';
      this.submissionError = 'Unsupported file. Upload a document, image, archive, text, or source-code file.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    if (file.size > this.maxSize) {
      this.selectedFile = null;
      input.value = '';
      this.submissionError = 'The selected file is larger than 10 MB.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    this.selectedFile = file;
    this.toast.show(`${file.name} is ready to submit.`, 'info');
  }

  submit(): void {
    const task = this.task();
    if (!task) {
      this.toast.show('This task is not available for your account.', 'error');
      return;
    }
    const link = this.submissionLink.trim();
    if (link && !this.isValidLink(link)) {
      this.submissionError = 'Enter a complete http:// or https:// submission link.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    if (!link && !this.selectedFile) {
      this.submissionError = 'Choose a file or enter a valid submission link.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    const file = this.selectedFile;
    this.data.updateTask(task.id, {
      submission: link || file?.name,
      submissionName: file?.name ?? (link ? 'External submission link' : undefined),
      submissionType: file?.type || (link ? 'text/uri-list' : undefined),
      submissionSize: file?.size,
      status: 'In Progress',
    });
    this.submissionError = '';
    this.toast.show('Submission saved. The admin can now review it.');
  }

  formatFileSize(size?: number): string {
    if (!size) return '';
    return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  private isValidLink(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch { return false; }
  }
}
