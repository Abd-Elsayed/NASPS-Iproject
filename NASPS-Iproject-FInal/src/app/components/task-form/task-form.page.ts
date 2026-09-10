import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { ToastService } from '../../core/toast.service';
import { TaskPriority } from '../../models/models';
import { AttachmentComponent } from '../attachment/attachment.component';
import { AiGeneratedTask } from '../../models/ai.models';
import { AiService } from '../../core/ai.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-task-form-page',
  imports: [ReactiveFormsModule, RouterLink, AttachmentComponent],
  templateUrl: './task-form.page.html',
  styleUrl: './task-form.page.css',
})
export class TaskFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly ai = inject(AiService);
  readonly data = inject(DataService);
  readonly trainees = computed(() => [...this.data.trainees()].sort((a, b) => a.name.localeCompare(b.name)));
  submitted = false;
  selectedAttachment: File | null = null;
  attachmentError = '';
  private readonly maxAttachmentSize = 20 * 1024 * 1024;
  private readonly assigneeValidator = (control: AbstractControl): ValidationErrors | null =>
    Array.isArray(control.value) && control.value.length > 0 ? null : { assignee: true };
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    traineeIds: [[] as number[], [this.assigneeValidator]],
    priority: ['Medium' as TaskPriority, Validators.required],
    dueDate: ['', Validators.required],
    instructions: [''],
  });
  readonly aiPrompt = this.fb.nonNullable.control('', [Validators.required, Validators.minLength(15), Validators.maxLength(1000)]);
  readonly aiLoading = signal(false);
  readonly aiError = signal('');
  readonly aiDraft = signal<AiGeneratedTask | null>(null);

  generateWithAi(): void {
    this.aiPrompt.markAsTouched();
    if (this.aiPrompt.invalid || this.aiLoading()) return;
    this.aiLoading.set(true);
    this.aiError.set('');
    this.ai.generateTask(this.aiPrompt.value.trim()).pipe(finalize(() => this.aiLoading.set(false))).subscribe({
      next: draft => {
        this.aiDraft.set(draft);
        this.form.patchValue({
          title: draft.title,
          description: draft.description,
          instructions: draft.instructions.join('\n'),
          priority: draft.priority,
        });
        this.toast.show('AI draft added to the form. Review it before creating the task.', 'success');
      },
      error: error => { this.aiError.set(error.message); this.toast.show(error.message, 'error'); },
    });
  }

  onAttachmentSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.attachmentError = '';
    if (!file) {
      this.selectedAttachment = null;
      return;
    }
    if (file.size > this.maxAttachmentSize) {
      input.value = '';
      this.selectedAttachment = null;
      this.attachmentError = 'The attachment must be 20 MB or smaller.';
      this.toast.show(this.attachmentError, 'error');
      return;
    }
    this.selectedAttachment = file;
    this.toast.show(`${file.name} is ready to attach.`, 'info');
  }

  clearAttachment(fileInput: HTMLInputElement): void {
    this.selectedAttachment = null;
    this.attachmentError = '';
    fileInput.value = '';
    this.toast.show('Attachment removed.', 'info');
  }

  formatFileSize(size: number): string {
    return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  selectAllTrainees(): void {
    this.form.controls.traineeIds.setValue(this.trainees().map(item => item.id));
    this.form.controls.traineeIds.markAsTouched();
  }

  clearTrainees(): void {
    this.form.controls.traineeIds.setValue([]);
    this.form.controls.traineeIds.markAsTouched();
  }

  async save(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted task information.', 'error');
      return;
    }

    const { traineeIds, ...task } = this.form.getRawValue();
    const assignees = [...new Set(traineeIds.map(Number).filter(id => id > 0))];
    if (!assignees.length) {
      this.toast.show('There are no trainees available for assignment.', 'error');
      return;
    }
    const attachment = this.selectedAttachment;
    let attachmentFailures = 0;
    try {
      for (const id of assignees) {
        const created = await this.data.addTask({
          ...task,
          traineeId: id,
          status: 'Pending',
          attachment: attachment?.name,
          attachmentType: attachment?.type || undefined,
          attachmentSize: attachment?.size,
        });
        if (attachment && !await this.data.uploadTaskAttachment(created.id, attachment)) attachmentFailures++;
      }
    } catch {
      this.toast.show('The task could not be created on the server. Check the API and database.', 'error');
      return;
    }
    const assignmentMessage = assignees.length === 1
      ? 'Task created and assigned successfully.'
      : `Task assigned to ${assignees.length} selected trainees.`;
    this.toast.show(attachmentFailures
      ? `${assignmentMessage} ${attachmentFailures} attachment upload(s) need the API connection. Metadata was kept.`
      : assignmentMessage,
      attachmentFailures ? 'warning' : 'success');
    this.router.navigate(['/admin/tasks']);
  }
}
