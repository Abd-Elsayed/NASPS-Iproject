import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MeProfile, UserRole } from '../models/models';
import { DataService } from './data.service';
import { VerificationService } from './verification.service';
import { API_BASE_URL } from './api-url';

interface TraineeCredential {
  traineeId: number;
  username: string;
  email: string;
  password: string;
  mustChangePassword: boolean;
}

export interface TraineeAccess {
  traineeId: number;
  username: string;
  temporaryPassword: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  requiresPasswordChange?: boolean;
  requiresEmailVerification?: boolean;
}

export interface RegisterAdminResult {
  success: boolean;
  message: string;
  email?: string;
  devCode?: string;
}

export interface PasswordResetRequestResult extends LoginResult {
  demoCode?: string;
}

interface ApiLoginResponse extends LoginResult {
  token?: string;
  role?: string;
  traineeId?: number;
  email?: string;
  department?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly verification = inject(VerificationService);
  private readonly apiUrl = API_BASE_URL;
  readonly adminEmail = 'admin@nasps.com';
  private readonly adminPasswordKey = 'nasps-admin-password';
  get adminPassword(): string { return localStorage.getItem(this.adminPasswordKey) ?? 'Admin@123'; }
  readonly demoTraineeUsername = this.usernameFor(2);
  readonly demoTraineePassword = this.temporaryPasswordFor(2);
  private readonly roleKey = 'nasps-role';
  private readonly currentEmailKey = 'nasps-current-trainee-email';
  private readonly pendingEmailKey = 'nasps-password-change-email';
  private readonly verifyEmailKey = 'nasps-verify-email';
  readonly verifyEmailAddress = signal(localStorage.getItem(this.verifyEmailKey) ?? '');
  private pendingLoginPassword = '';
  private readonly credentialsKey = 'nasps-trainee-credentials';
  private readonly tokenKey = 'nasps-access-token';
  private readonly userKey = 'nasps-current-user';
  readonly token = signal(localStorage.getItem(this.tokenKey) ?? '');
  readonly role = signal<UserRole | null>(this.readRole());

  /** The signed-in user's own record (GET /api/auth/me), kept for the profile page and dashboards. */
  readonly currentUser = signal<MeProfile | null>(this.readStoredUser());
  readonly profilePhotoUrl = signal('');
  private profilePhotoObjectUrl = '';

  /**
   * Live identity for headers and dashboards. The API profile is preferred because
   * it reflects edits immediately; JWT claims are a safe fallback until /auth/me loads.
   */
  readonly identity = computed(() => {
    const claims = this.claimsFromToken(this.token());
    const user = this.currentUser();
    const roleName = user?.roleName ?? (claims?.['roleName'] as string | undefined);
    const department = user?.department ?? (claims?.['department'] as string | undefined) ?? '';
    const label =
      roleName === 'SuperAdmin' ? 'Super Admin' :
      roleName === 'Admin' ? (department ? `Admin · ${department}` : 'Admin') :
      roleName === 'Trainee' ? 'Trainee' :
      this.role() === 'admin' ? 'Admin' : 'Trainee';
    return {
      name: user?.name?.trim() || (claims?.['name'] as string | undefined)?.trim() || (this.role() === 'admin' ? 'Admin' : 'Trainee'),
      roleLabel: label,
      department,
      isSuperAdmin: roleName === 'SuperAdmin' || claims?.['isSuperAdmin'] === 'true',
    };
  });
  readonly currentTraineeEmail = signal(localStorage.getItem(this.currentEmailKey) ?? 'sara@example.com');
  readonly pendingPasswordEmail = signal(localStorage.getItem(this.pendingEmailKey) ?? '');
  readonly currentTraineeId = computed(() => {
    const fromToken = Number(this.claimsFromToken(this.token())?.['traineeId']);
    if (fromToken > 0) return fromToken;
    if (this.currentUser()?.role === 'trainee') return this.currentUser()!.id;
    return this.data.trainees().find(item => item.email.toLowerCase() === this.currentTraineeEmail().toLowerCase())?.id ?? 2;
  });

  constructor(private readonly router: Router, private readonly data: DataService) {
    if (this.token()) void this.loadCurrentUser();
  }

  async loadCurrentUser(): Promise<void> {
    if (!this.http || !this.token()) return;
    try {
      const me = await firstValueFrom(this.http.get<MeProfile>(`${this.apiUrl}/auth/me`));
      this.currentUser.set(me);
      localStorage.setItem(this.userKey, JSON.stringify(me));
      if (me.email) {
        this.currentTraineeEmail.set(me.email.toLowerCase());
        localStorage.setItem(this.currentEmailKey, me.email.toLowerCase());
      }
      await this.loadProfilePhoto(me.hasProfilePhoto);
    } catch {
      // keep whatever is cached
    }
  }

  async loadProfilePhoto(expected = this.currentUser()?.hasProfilePhoto): Promise<void> {
    if (!this.http || !this.token() || !expected) {
      this.setProfilePhotoUrl('');
      return;
    }
    try {
      const blob = await firstValueFrom(this.http.get(`${this.apiUrl}/auth/me/photo`, { responseType: 'blob' }));
      this.setProfilePhotoUrl(URL.createObjectURL(blob));
    } catch {
      this.setProfilePhotoUrl('');
    }
  }

  async uploadProfilePhoto(file: File): Promise<boolean> {
    if (!this.http || !this.token()) return false;
    const body = new FormData();
    body.append('photo', file, file.name);
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/auth/me/photo`, body));
      this.currentUser.update(user => user ? { ...user, hasProfilePhoto: true } : user);
      await this.loadProfilePhoto(true);
      return true;
    } catch {
      return false;
    }
  }

  async removeProfilePhoto(): Promise<boolean> {
    if (!this.http || !this.token()) return false;
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/auth/me/photo`));
      this.currentUser.update(user => user ? { ...user, hasProfilePhoto: false } : user);
      this.setProfilePhotoUrl('');
      return true;
    } catch {
      return false;
    }
  }

  private setProfilePhotoUrl(url: string): void {
    if (this.profilePhotoObjectUrl) URL.revokeObjectURL(this.profilePhotoObjectUrl);
    this.profilePhotoObjectUrl = url;
    this.profilePhotoUrl.set(url);
  }

  async updateCurrentUser(patch: { name: string; phone: string; university?: string }): Promise<boolean> {
    if (!this.http || !this.token()) return false;
    try {
      const me = await firstValueFrom(this.http.put<MeProfile>(`${this.apiUrl}/auth/me`, patch));
      this.currentUser.set(me);
      localStorage.setItem(this.userKey, JSON.stringify(me));
      return true;
    } catch {
      return false;
    }
  }

  private readStoredUser(): MeProfile | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) as MeProfile : null;
    } catch {
      return null;
    }
  }

  async loginWithToken(identifierValue: string, password: string): Promise<LoginResult> {
    const identifier = identifierValue.trim();
    if (this.http) {
      try {
        const response = await firstValueFrom(this.http.post<ApiLoginResponse>(`${this.apiUrl}/auth/login`, { identifier, password }));
        if (response.requiresEmailVerification && response.email) {
          this.beginEmailVerification(response.email, password);
          return { success: false, message: response.message, requiresEmailVerification: true };
        }
        if (!response.success || !response.token) return { success: false, message: response.message || 'Sign in failed.' };
        // The backend response is the source of truth for routing. The signed token
        // remains a fallback for older API responses.
        const role = this.roleFromBackend(response.role) ?? this.roleFromToken(response.token);
        if (!role) return { success: false, message: 'The access token does not contain a valid account role.' };

        this.token.set(response.token);
        localStorage.setItem(this.tokenKey, response.token);
        if (response.email) {
          this.currentTraineeEmail.set(response.email.toLowerCase());
          localStorage.setItem(this.currentEmailKey, response.email.toLowerCase());
        }
        if (response.requiresPasswordChange) {
          const pendingEmail = response.email?.toLowerCase() ?? '';
          this.pendingPasswordEmail.set(pendingEmail);
          localStorage.setItem(this.pendingEmailKey, pendingEmail);
          this.router.navigate(['/create-password']);
          return response;
        }

        this.startSession(role, response.token);
        await this.loadCurrentUser();
        this.router.navigate([role === 'admin' ? '/admin/dashboard' : '/trainee/dashboard']);
        return response;
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status !== 0) {
          const body = error.error;
          if (body?.requiresEmailVerification && body?.email) {
            this.beginEmailVerification(body.email, password);
            return { success: false, message: body.message, requiresEmailVerification: true };
          }
          return { success: false, message: body?.message ?? 'The email, username, ID, or password is incorrect.' };
        }
        return { success: false, message: 'The NASPS API is unavailable. Start the backend and try again.' };
      }
    }
    return { success: false, message: 'The NASPS API is required for secure sign in.' };
  }

  /// --- Super-admin-created administrator account (backend only) ---

  async registerAdmin(payload: { name: string; email: string; password: string; department: string }): Promise<RegisterAdminResult> {
    if (!this.http) return { success: false, message: 'Creating an administrator needs the API running.' };
    try {
      return await firstValueFrom(this.http.post<RegisterAdminResult>(`${this.apiUrl}/auth/register`, payload));
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status !== 0) {
        return { success: false, message: error.error?.message ?? 'The administrator account could not be created.' };
      }
      return { success: false, message: 'Creating an administrator needs the API running.' };
    }
  }

  async verifyEmailCode(code: string): Promise<LoginResult> {
    const email = this.verifyEmailAddress();
    if (!this.http || !email) return { success: false, message: 'Start from the sign-up or sign-in page.' };
    try {
      const result = await firstValueFrom(
        this.http.post<ApiLoginResponse>(`${this.apiUrl}/auth/verify-email`, { email, code }),
      );
      if (result.success && result.token) {
        const role = this.roleFromBackend(result.role) ?? this.roleFromToken(result.token);
        this.token.set(result.token);
        localStorage.setItem(this.tokenKey, result.token);
        if (result.email) {
          this.currentTraineeEmail.set(result.email.toLowerCase());
          localStorage.setItem(this.currentEmailKey, result.email.toLowerCase());
        }
        this.clearEmailVerification();
        if (result.requiresPasswordChange) {
          const pendingEmail = result.email?.toLowerCase() ?? email;
          this.pendingPasswordEmail.set(pendingEmail);
          localStorage.setItem(this.pendingEmailKey, pendingEmail);
          await this.router.navigate(['/create-password']);
        } else if (role) {
          this.startSession(role, result.token);
          await this.loadCurrentUser();
          await this.router.navigate([role === 'admin' ? '/admin/dashboard' : '/trainee/dashboard']);
        }
      }
      return result;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status !== 0) {
        return { success: false, message: error.error?.message ?? 'The verification code is incorrect.' };
      }
      return { success: false, message: 'The verification service is unavailable.' };
    }
  }

  async resendVerificationCode(): Promise<RegisterAdminResult> {
    const email = this.verifyEmailAddress();
    if (!this.http || !email) return { success: false, message: 'Start from the sign-up or sign-in page.' };
    try {
      return await firstValueFrom(
        this.http.post<RegisterAdminResult>(`${this.apiUrl}/auth/resend-verification`, { email }),
      );
    } catch {
      return { success: false, message: 'Could not resend the code.' };
    }
  }

  /** Opens the email-verification flow from a link without requiring a prior sign-in on this device. */
  prepareEmailVerification(email: string): void {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    this.verifyEmailAddress.set(normalized);
    localStorage.setItem(this.verifyEmailKey, normalized);
  }

  /// Called after a successful email verification: finish the sign-in the user started.
  async completePendingLogin(): Promise<LoginResult> {
    const email = this.verifyEmailAddress();
    const password = this.pendingLoginPassword;
    this.clearEmailVerification();
    if (email && password) return this.loginWithToken(email, password);
    await this.router.navigate(['/login']);
    return { success: true, message: 'Email verified. Please sign in.' };
  }

  private beginEmailVerification(email: string, password: string): void {
    this.prepareEmailVerification(email);
    this.pendingLoginPassword = password;
    this.router.navigate(['/verify-email']);
  }

  private clearEmailVerification(): void {
    this.pendingLoginPassword = '';
    localStorage.removeItem(this.verifyEmailKey);
  }

  async changeFirstPasswordWithToken(password: string): Promise<LoginResult> {
    const email = this.pendingPasswordEmail() || localStorage.getItem(this.pendingEmailKey) || '';
    if (this.http && email && this.token()) {
      try {
        const result = await firstValueFrom(this.http.post<ApiLoginResponse>(`${this.apiUrl}/auth/change-first-password`, { email, newPassword: password }));
        if (!result.success) return result;
        localStorage.removeItem(this.pendingEmailKey);
        this.pendingPasswordEmail.set('');
        const role = this.roleFromToken(result.token ?? this.token()) ?? 'trainee';
        if (result.token) {
          this.token.set(result.token);
          localStorage.setItem(this.tokenKey, result.token);
        }
        this.startSession(role, result.token ?? this.token());
        await this.loadCurrentUser();
        this.router.navigate(['/trainee/dashboard']);
        return result;
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status !== 0) {
          return { success: false, message: error.error?.message ?? 'The password could not be changed.' };
        }
        return { success: false, message: 'The NASPS API is unavailable. Your password was not changed.' };
      }
    }
    return { success: false, message: 'The NASPS API is required to change your password.' };
  }

  async requestPasswordReset(emailValue: string): Promise<PasswordResetRequestResult> {
    const email = emailValue.trim().toLowerCase();
    if (this.http) {
      try {
        const result = await firstValueFrom(this.http.post<{ success: boolean; message: string; code?: string }>(`${this.apiUrl}/auth/forgot-password/request`, { email }));
        return { success: result.success, message: result.message, demoCode: result.code };
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status !== 0) {
          return { success: false, message: error.error?.message ?? 'No trainee account was found for this email.' };
        }
        return { success: false, message: 'The NASPS API is unavailable. No reset email was sent.' };
      }
    }
    return { success: false, message: 'The NASPS API is required to send a real reset email.' };
  }

  async resetForgottenPassword(emailValue: string, code: string, password: string): Promise<LoginResult> {
    const email = emailValue.trim().toLowerCase();
    if (this.http) {
      try {
        return await firstValueFrom(this.http.post<LoginResult>(`${this.apiUrl}/auth/forgot-password/reset`, { email, code, newPassword: password }));
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status !== 0) {
          return { success: false, message: error.error?.message ?? 'The reset code is incorrect or has expired.' };
        }
        return { success: false, message: 'The NASPS API is unavailable. Your password was not reset.' };
      }
    }
    return { success: false, message: 'The NASPS API is required to reset your password.' };
  }

  login(role: UserRole, identifierValue: string, password: string): LoginResult {
    const identifier = identifierValue.trim().toLowerCase();
    if (role === 'admin') {
      if (identifier !== this.adminEmail || password !== this.adminPassword) {
        return { success: false, message: 'The admin email or password is incorrect.' };
      }
      this.startSession('admin');
      this.router.navigate(['/admin/dashboard']);
      return { success: true, message: 'Welcome back, Admin.' };
    }

    const trainee = this.data.trainees().find(item =>
      item.email.toLowerCase() === identifier ||
      String(item.id) === identifier ||
      this.usernameFor(item.id).toLowerCase() === identifier
    );
    if (!trainee) return { success: false, message: 'No trainee account was found for this ID, username, or email.' };

    const email = trainee.email.toLowerCase();
    const accounts = this.readCredentials();
    let account = this.normalizeCredential(accounts[email], trainee.id, email);
    const generatedPassword = this.temporaryPasswordFor(trainee.id);
    if (account.mustChangePassword && password === generatedPassword) account = { ...account, password: generatedPassword };
    if (account.password !== password) return { success: false, message: 'The trainee ID, username, or password is incorrect.' };

    accounts[email] = account;
    this.saveCredentials(accounts);
    this.currentTraineeEmail.set(email);
    localStorage.setItem(this.currentEmailKey, email);
    if (account.mustChangePassword) {
      this.pendingPasswordEmail.set(email);
      localStorage.setItem(this.pendingEmailKey, email);
      this.router.navigate(['/create-password']);
      return { success: true, requiresPasswordChange: true, message: 'Create your private password to continue.' };
    }

    this.startSession('trainee');
    this.router.navigate(['/trainee/dashboard']);
    return { success: true, message: `Welcome back, ${trainee.name}.` };
  }

  changeFirstPassword(password: string): LoginResult {
    const email = this.pendingPasswordEmail() || localStorage.getItem(this.pendingEmailKey) || '';
    if (!email) return { success: false, message: 'Sign in with your temporary password first.' };
    const accounts = this.readCredentials();
    const trainee = this.data.trainees().find(item => item.email.toLowerCase() === email);
    if (!trainee) return { success: false, message: 'The trainee account is no longer available.' };
    accounts[email] = { ...this.normalizeCredential(accounts[email], trainee.id, email), password, mustChangePassword: false };
    this.saveCredentials(accounts);
    localStorage.removeItem(this.pendingEmailKey);
    this.pendingPasswordEmail.set('');
    this.currentTraineeEmail.set(email);
    localStorage.setItem(this.currentEmailKey, email);
    this.startSession('trainee');
    this.router.navigate(['/trainee/dashboard']);
    return { success: true, message: 'Your password was created successfully.' };
  }

  registerTrainee(traineeId: number, emailValue: string, previousEmail?: string): TraineeAccess {
    const email = emailValue.trim().toLowerCase();
    const accounts = this.readCredentials();
    const previous = previousEmail?.trim().toLowerCase();
    const username = this.usernameFor(traineeId);
    const temporaryPassword = this.temporaryPasswordFor(traineeId);
    if (previous && previous !== email && accounts[previous]) {
      accounts[email] = { ...accounts[previous], traineeId, username, email };
      delete accounts[previous];
    } else if (!accounts[email]) {
      accounts[email] = { traineeId, username, email, password: temporaryPassword, mustChangePassword: true };
    } else {
      accounts[email] = this.normalizeCredential(accounts[email], traineeId, email);
    }
    this.saveCredentials(accounts);
    return { traineeId, username, temporaryPassword };
  }

  usernameFor(traineeId: number): string {
    return `NASPS-T${String(traineeId).padStart(3, '0')}`;
  }

  temporaryPasswordFor(traineeId: number): string {
    return `NASPS@T${String(traineeId).padStart(3, '0')}`;
  }

  removeTrainee(emailValue: string): void {
    const accounts = this.readCredentials();
    delete accounts[emailValue.trim().toLowerCase()];
    this.saveCredentials(accounts);
  }

  updateCurrentTraineeEmail(emailValue: string): void {
    const email = emailValue.trim().toLowerCase();
    this.currentTraineeEmail.set(email);
    localStorage.setItem(this.currentEmailKey, email);
  }

  logout(): void {
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.token.set('');
    this.role.set(null);
    this.currentUser.set(null);
    this.setProfilePhotoUrl('');
    this.router.navigate(['/login']);
  }

  private startSession(role: UserRole, token?: string): void {
    localStorage.setItem(this.roleKey, role);
    this.role.set(role);
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this.token.set(token);
      this.data.beginAuthenticatedSession();
    }
  }

  private readRole(): UserRole | null {
    const storedToken = localStorage.getItem(this.tokenKey) ?? '';
    if (storedToken) return this.roleFromToken(storedToken);
    const value = localStorage.getItem(this.roleKey);
    return value === 'admin' || value === 'trainee' ? value : null;
  }

  private claimsFromToken(token: string): Record<string, unknown> | null {
    if (!token) return null;
    try {
      const rawPayload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = rawPayload.padEnd(Math.ceil(rawPayload.length / 4) * 4, '=');
      const payload = JSON.parse(atob(paddedPayload)) as Record<string, unknown> & { exp?: number };
      if (payload.exp && Date.now() >= payload.exp * 1000) return null;
      return payload;
    } catch {
      return null;
    }
  }

  private roleFromToken(token: string): UserRole | null {
    const role = this.claimsFromToken(token)?.['role'];
    return role === 'admin' || role === 'trainee' ? role : null;
  }

  private roleFromBackend(role: string | undefined): UserRole | null {
    const normalized = role?.trim().toLowerCase();
    if (normalized === 'admin' || normalized === 'superadmin' || normalized === 'super admin') return 'admin';
    if (normalized === 'trainee') return 'trainee';
    return null;
  }

  private readCredentials(): Record<string, TraineeCredential> {
    try {
      return JSON.parse(localStorage.getItem(this.credentialsKey) ?? '{}') as Record<string, TraineeCredential>;
    } catch {
      return {};
    }
  }

  private normalizeCredential(account: TraineeCredential | undefined, traineeId: number, email: string): TraineeCredential {
    return {
      traineeId,
      username: this.usernameFor(traineeId),
      email,
      password: account?.password ?? this.temporaryPasswordFor(traineeId),
      mustChangePassword: account?.mustChangePassword ?? true,
    };
  }

  private saveCredentials(accounts: Record<string, TraineeCredential>): void {
    localStorage.setItem(this.credentialsKey, JSON.stringify(accounts));
  }
}
