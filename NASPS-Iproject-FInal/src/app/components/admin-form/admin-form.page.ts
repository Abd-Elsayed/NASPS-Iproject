import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-form.page.html',
  styleUrl: './admin-form.page.css',
})
export class AdminFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);

  readonly submitted = signal(false);
  readonly saving = signal(false);
  readonly serverError = signal('');
  readonly createdEmail = signal('');
  showPassword = false;

  readonly departments = [
    'Engineering', 'Design', 'Data & AI', 'Cyber Security', 'Operations',
    'Training', 'Human Resources', 'Marketing', 'Finance', 'Product',
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/@nasps/i)]],
    department: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
    ]],
    confirm: ['', Validators.required],
  });

  passwordHasMinimumLength(): boolean { return this.form.controls.password.value.length >= 8; }
  passwordHasUpperAndLower(): boolean {
    const password = this.form.controls.password.value;
    return /[A-Z]/.test(password) && /[a-z]/.test(password);
  }
  passwordHasNumber(): boolean { return /\d/.test(this.form.controls.password.value); }
  passwordHasSpecialCharacter(): boolean { return /[^A-Za-z0-9]/.test(this.form.controls.password.value); }
  passwordsMatch(): boolean { return this.form.controls.password.value === this.form.controls.confirm.value; }

  async save(): Promise<void> {
    this.submitted.set(true);
    this.serverError.set('');
    this.createdEmail.set('');
    if (this.form.invalid || !this.passwordsMatch()) {
      this.form.markAllAsTouched();
      this.toast.show('Check the administrator information and password rules.', 'error');
      return;
    }

    this.saving.set(true);
    const value = this.form.getRawValue();
    const result = await this.auth.registerAdmin({
      name: value.name.trim(),
      email: value.email.trim().toLowerCase(),
      department: value.department,
      password: value.password,
    });
    this.saving.set(false);

    if (!result.success) {
      this.serverError.set(result.message);
      this.toast.show(result.message, 'error');
      return;
    }

    this.createdEmail.set(result.email ?? value.email.trim().toLowerCase());
    this.form.reset();
    this.submitted.set(false);
    this.toast.show(result.message, 'success', 10000);
  }
}
