import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../models/models';
import { DataService } from './data.service';

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
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly adminEmail = 'admin@nasps.com';
  readonly adminPassword = 'Admin@123';
  readonly demoTraineeUsername = this.usernameFor(2);
  readonly demoTraineePassword = this.temporaryPasswordFor(2);
  private readonly roleKey = 'nasps-role';
  private readonly currentEmailKey = 'nasps-current-trainee-email';
  private readonly pendingEmailKey = 'nasps-password-change-email';
  private readonly credentialsKey = 'nasps-trainee-credentials';
  readonly role = signal<UserRole | null>(this.readRole());
  readonly currentTraineeEmail = signal(localStorage.getItem(this.currentEmailKey) ?? 'sara@example.com');
  readonly pendingPasswordEmail = signal(localStorage.getItem(this.pendingEmailKey) ?? '');
  readonly currentTraineeId = computed(() => this.data.trainees().find(item => item.email.toLowerCase() === this.currentTraineeEmail().toLowerCase())?.id ?? 2);

  constructor(private readonly router: Router, private readonly data: DataService) {}

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

  logout(): void {
    const oldRole = this.role();
    localStorage.removeItem(this.roleKey);
    this.role.set(null);
    this.router.navigate([oldRole === 'trainee' ? '/trainee/login' : '/admin/login']);
  }

  private startSession(role: UserRole): void {
    localStorage.setItem(this.roleKey, role);
    this.role.set(role);
  }

  private readRole(): UserRole | null {
    const value = localStorage.getItem(this.roleKey);
    return value === 'admin' || value === 'trainee' ? value : null;
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
