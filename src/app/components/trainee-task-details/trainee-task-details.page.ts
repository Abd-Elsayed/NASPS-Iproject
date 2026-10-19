import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AttachmentComponent } from '../attachment/attachment.component';

@Component({
  selector: 'app-trainee-task-details-page',
  imports: [DatePipe, FormsModule, RouterLink, AttachmentComponent],
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

  async start(): Promise<void> {
    const task = this.task();
    if (!task) return;
    if (task.status === 'Completed') {
      this.toast.show('Completed tasks cannot be restarted.', 'warning');
      return;
    }
    const ok = await this.data.updateTask(task.id, { status: 'In Progress' });
    this.toast.show(ok ? 'Task marked as In Progress.' : 'The task could not be updated on the server.', ok ? 'info' : 'error');
  }

  async removeSubmission(): Promise<void> {
    const task = this.task();
    if (!task) return;
    if (!await this.data.updateTask(task.id, { clearSubmission: true })) {
      this.toast.show('The submission could not be removed from the server.', 'error');
      return;
    }
    this.submissionLink = '';
    this.selectedFile = null;
    this.toast.show('Submission removed.', 'info');
  }

  async downloadAssignment(): Promise<void> {
    const task = this.task();
    if (!task?.attachment) return;
    if (!await this.data.downloadTaskAttachment(task.id, task.attachment))
      this.toast.show('The assignment file is not available on the server. Ask the admin to upload it again.', 'error');
  }

  async downloadSubmission(): Promise<void> {
    const task = this.task();
    const name = task?.submissionName;
    if (!task || !name) return;
    if (!await this.data.downloadTaskSubmission(task.id, name))
      this.toast.show('Your submitted file could not be downloaded from the server.', 'error');
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

  async submit(): Promise<void> {
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
    if (file && !await this.data.uploadTaskSubmission(task.id, file)) {
      this.submissionError = 'The file could not be uploaded. Check that the API and database are running, then try again.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    const saved = await this.data.updateTask(task.id, {
      submission: link || undefined,
      status: 'In Progress',
    });
    if (!saved) {
      this.submissionError = 'The submission details could not be saved on the server.';
      this.toast.show(this.submissionError, 'error');
      return;
    }
    await this.data.refreshTasksFromServer(this.auth.currentTraineeId());
    void this.data.refreshNotificationsFromServer();
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
