import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly auth = inject(AuthService);
  readonly mode = (this.route.snapshot.data['mode'] ?? 'login') as 'login' | 'admin' | 'trainee' | 'password' | 'forgot' | 'register' | 'verify';
  readonly isPassword = computed(() => this.mode === 'password');
  readonly isForgotPassword = computed(() => this.mode === 'forgot');
  readonly isRegister = computed(() => this.mode === 'register');
  readonly isVerify = computed(() => this.mode === 'verify');
  readonly isLogin = computed(() => this.mode === 'login' || this.mode === 'admin' || this.mode === 'trainee');
  readonly departments = ['Engineering', 'Design', 'Data & AI', 'Operations', 'HR', 'Marketing', 'Finance', 'Product'];
  showPassword = false;
  showNewPassword = false;
  readonly submitted = signal(false);
  readonly serverError = signal('');
  readonly resetCodeSent = signal(false);
  readonly resetEmail = signal('');

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  readonly passwordForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
    confirm: ['', Validators.required],
  });
  readonly registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/@nasps/i)]],
    department: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]],
    confirm: ['', Validators.required],
  });
  readonly accountCodeForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  readonly forgotEmailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  readonly forgotCodeForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  constructor() {
    const emailFromLink = this.route.snapshot.queryParamMap.get('email');
    if (this.mode === 'verify' && emailFromLink) {
      this.auth.prepareEmailVerification(emailFromLink);
    }
    if (this.mode === 'forgot' && emailFromLink) {
      this.forgotEmailForm.controls.email.setValue(emailFromLink.trim().toLowerCase());
    }
  }

  async sendPasswordResetCode(): Promise<void> {
    const emailControl = this.forgotEmailForm.controls.email;
    emailControl.markAsTouched();
    this.serverError.set('');
    if (emailControl.invalid) {
      this.toast.show('Enter a valid registered admin or trainee email.', 'error');
      return;
    }
    const email = emailControl.value.trim().toLowerCase();
    const result = await this.auth.requestPasswordReset(email);
    if (!result.success) {
      this.serverError.set(result.message);
      this.toast.show(result.message, 'error');
      return;
    }
    this.resetEmail.set(email);
    this.resetCodeSent.set(true);
    this.forgotCodeForm.reset();
    this.passwordForm.reset();
    this.toast.show(result.message, 'info', 10000);
  }

  async submitForgotPassword(): Promise<void> {
    this.submitted.set(true);
    this.serverError.set('');
    if (this.forgotCodeForm.invalid || this.passwordForm.invalid || !this.passwordsMatch()) {
      this.forgotCodeForm.markAllAsTouched();
      this.passwordForm.markAllAsTouched();
      this.toast.show('Check the verification code and password rules.', 'error');
      return;
    }
    const result = await this.auth.resetForgottenPassword(
      this.resetEmail(),
      this.forgotCodeForm.controls.code.value,
      this.passwordForm.controls.password.value,
    );
    if (!result.success) {
      this.serverError.set(result.message);
      this.toast.show(result.message, 'error');
      return;
    }
    this.toast.show(result.message, 'success');
    await this.router.navigate(['/login']);
  }

  private regPwd(): string { return this.registerForm.controls.password.value; }
  regHasMinLength(): boolean { return this.regPwd().length >= 8; }
  regHasUpperLower(): boolean { return /[A-Z]/.test(this.regPwd()) && /[a-z]/.test(this.regPwd()); }
  regHasNumber(): boolean { return /\d/.test(this.regPwd()); }
  regHasSpecial(): boolean { return /[^A-Za-z0-9]/.test(this.regPwd()); }
  regPasswordsMatch(): boolean { return this.registerForm.controls.password.value === this.registerForm.controls.confirm.value; }

  async submitRegister(): Promise<void> {
    this.submitted.set(true);
    this.serverError.set('');
    if (this.registerForm.invalid || !this.regPasswordsMatch()) {
      this.registerForm.markAllAsTouched();
      this.toast.show('Check the form: a NASPS email, a department, and a strong matching password are required.', 'error');
      return;
    }
    const value = this.registerForm.getRawValue();
    const result = await this.auth.registerAdmin({
      name: value.name.trim(),
      email: value.email.trim().toLowerCase(),
      password: value.password,
      department: value.department,
    });
    if (!result.success) {
      this.serverError.set(result.message);
      this.toast.show(result.message, 'error');
      return;
    }
    this.submitted.set(false);
    this.toast.show(result.message, 'success', 12000);
    // auth.registerAdmin already routed to /verify-email
  }

  async submitAccountVerification(): Promise<void> {
    this.submitted.set(true);
    this.serverError.set('');
    const control = this.accountCodeForm.controls.code;
    control.markAsTouched();
    if (control.invalid) {
      this.toast.show('Enter the 6-digit code from your email.', 'error');
      return;
    }
    const result = await this.auth.verifyEmailCode(control.value);
    if (!result.success) {
      this.serverError.set(result.message);
      this.toast.show(result.message, 'error');
      return;
    }
    this.toast.show(
      result.requiresPasswordChange ? 'Email verified. Create your private password.' : result.message,
      'success',
    );
  }

  async resendAccountCode(): Promise<void> {
    const result = await this.auth.resendVerificationCode();
    this.toast.show(result.message, result.success ? 'info' : 'error', 12000);
  }

  passwordHasMinimumLength(): boolean { return this.passwordForm.controls.password.value.length >= 8; }
  passwordHasUppercase(): boolean { return /[A-Z]/.test(this.passwordForm.controls.password.value); }
  passwordHasLowercase(): boolean { return /[a-z]/.test(this.passwordForm.controls.password.value); }
  passwordHasNumber(): boolean { return /\d/.test(this.passwordForm.controls.password.value); }
  passwordHasSpecialCharacter(): boolean { return /[^A-Za-z0-9]/.test(this.passwordForm.controls.password.value); }
  passwordsMatch(): boolean { return this.passwordForm.controls.password.value === this.passwordForm.controls.confirm.value; }

  async submit(): Promise<void> {
    this.submitted.set(true);
    this.serverError.set('');
    if (this.isPassword()) {
      if (this.passwordForm.invalid || this.passwordForm.value.password !== this.passwordForm.value.confirm) {
        this.passwordForm.markAllAsTouched();
        this.toast.show('Check the password rules and matching confirmation.', 'error');
        return;
      }
      const result = await this.auth.changeFirstPasswordWithToken(this.passwordForm.controls.password.value);
      if (!result.success) this.serverError.set(result.message);
      this.toast.show(result.message, result.success ? 'success' : 'error');
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toast.show('Enter your email, trainee ID, or username and password.', 'error');
      return;
    }
    const value = this.loginForm.getRawValue();
    const result = await this.auth.loginWithToken(value.email, value.password);
    if (!result.success) this.serverError.set(result.message);
    this.toast.show(result.message, result.success ? 'success' : 'error');
  }
}
