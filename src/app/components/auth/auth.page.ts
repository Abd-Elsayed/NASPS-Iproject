import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { VerificationService } from '../../services/verification.service';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly verification = inject(VerificationService);
  readonly auth = inject(AuthService);
  readonly mode = this.route.snapshot.data['mode'] as 'admin' | 'trainee' | 'password';
  readonly isPassword = computed(() => this.mode === 'password');
  showPassword = false;
  showNewPassword = false;
  submitted = false;
  serverError = '';
  readonly emailCodeSent = signal(false);
  readonly emailVerified = signal(false);

  readonly loginForm = this.fb.nonNullable.group({
    email: [this.mode === 'admin' ? this.auth.adminEmail : this.auth.demoTraineeUsername, this.mode === 'admin' ? [Validators.required, Validators.email] : [Validators.required]],
    password: [this.mode === 'admin' ? this.auth.adminPassword : this.auth.demoTraineePassword, [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  readonly passwordForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
    confirm: ['', Validators.required],
  });
  readonly emailVerificationForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  sendEmailCode(): void {
    const email = this.auth.pendingPasswordEmail();
    if (!email) {
      this.toast.show('Sign in with the temporary trainee password first.', 'error');
      return;
    }
    const code = this.verification.requestCode('email', email);
    this.emailVerificationForm.controls.code.setValue('');
    this.emailCodeSent.set(true);
    this.emailVerified.set(false);
    this.toast.show(`Demo email verification code: ${code}`, 'info', 10000);
  }

  verifyEmail(): void {
    const control = this.emailVerificationForm.controls.code;
    control.markAsTouched();
    if (control.invalid) {
      this.toast.show('Enter the 6-digit email verification code.', 'error');
      return;
    }
    const result = this.verification.verifyCode('email', this.auth.pendingPasswordEmail(), control.value);
    this.emailVerified.set(result === 'verified');
    this.toast.show(result === 'verified' ? 'Email verified. You can now create your password.' : result === 'expired' ? 'The email code expired. Request a new one.' : 'The email verification code is incorrect.', result === 'verified' ? 'success' : 'error');
  }

  submit(): void {
    this.submitted = true;
    this.serverError = '';
    if (this.isPassword()) {
      if (!this.emailVerified()) {
        this.toast.show('Verify your email before creating a new password.', 'error');
        return;
      }
      if (this.passwordForm.invalid || this.passwordForm.value.password !== this.passwordForm.value.confirm) {
        this.passwordForm.markAllAsTouched();
        this.toast.show('Check the password rules and matching confirmation.', 'error');
        return;
      }
      const result = this.auth.changeFirstPassword(this.passwordForm.controls.password.value);
      if (!result.success) this.serverError = result.message;
      this.toast.show(result.message, result.success ? 'success' : 'error');
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toast.show(this.mode === 'admin' ? 'Enter a valid email and password.' : 'Enter your trainee ID or username and password.', 'error');
      return;
    }
    const value = this.loginForm.getRawValue();
    const result = this.auth.login(this.mode === 'admin' ? 'admin' : 'trainee', value.email, value.password);
    if (!result.success) this.serverError = result.message;
    this.toast.show(result.message, result.success ? 'success' : 'error');
  }
}
