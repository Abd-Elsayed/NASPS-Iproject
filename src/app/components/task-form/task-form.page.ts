import { Component, computed, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { TaskPriority } from '../../models/models';

@Component({
  selector: 'app-task-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.page.html',
  styleUrl: './task-form.page.css',
})
export class TaskFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly trainees = computed(() => [...this.data.trainees()].sort((a, b) => a.name.localeCompare(b.name)));
  submitted = false;
  selectedAttachment: File | null = null;
  attachmentError = '';
  private readonly maxAttachmentSize = 20 * 1024 * 1024;
  private readonly assigneeValidator = (control: AbstractControl): ValidationErrors | null =>
    control.value === 'all' || Number(control.value) > 0 ? null : { assignee: true };
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    traineeId: [0 as number | 'all', [this.assigneeValidator]],
    priority: ['Medium' as TaskPriority, Validators.required],
    dueDate: ['', Validators.required],
    instructions: [''],
  });

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

  formatFileSize(size: number): string {
    return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  save(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted task information.', 'error');
      return;
    }

    const { traineeId, ...task } = this.form.getRawValue();
    const assignees = traineeId === 'all' ? this.trainees().map(item => item.id) : [Number(traineeId)];
    if (!assignees.length) {
      this.toast.show('There are no trainees available for assignment.', 'error');
      return;
    }
    const attachment = this.selectedAttachment;
    assignees.forEach(id => this.data.addTask({
      ...task,
      traineeId: id,
      status: 'Pending',
      attachment: attachment?.name,
      attachmentType: attachment?.type || undefined,
      attachmentSize: attachment?.size,
    }));
    this.toast.show(traineeId === 'all' ? `Task assigned to all ${assignees.length} trainees.` : 'Task created and assigned successfully.');
    this.router.navigate(['/admin/tasks']);
  }
}
