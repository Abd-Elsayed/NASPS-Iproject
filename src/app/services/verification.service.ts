import { Injectable } from '@angular/core';

export type VerificationChannel = 'email' | 'sms' | 'whatsapp';

interface VerificationRequest {
  code: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class VerificationService {
  private readonly requests = new Map<string, VerificationRequest>();

  requestCode(channel: VerificationChannel, destination: string): string {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    this.requests.set(this.key(channel, destination), { code, expiresAt: Date.now() + 5 * 60 * 1000 });
    return code;
  }

  verifyCode(channel: VerificationChannel, destination: string, code: string): 'verified' | 'invalid' | 'expired' {
    const key = this.key(channel, destination);
    const request = this.requests.get(key);
    if (!request) return 'invalid';
    if (Date.now() > request.expiresAt) {
      this.requests.delete(key);
      return 'expired';
    }
    if (request.code !== code.trim()) return 'invalid';
    this.requests.delete(key);
    return 'verified';
  }

  clear(destination: string): void {
    for (const channel of ['email', 'sms', 'whatsapp'] as const) this.requests.delete(this.key(channel, destination));
  }

  private key(channel: VerificationChannel, destination: string): string {
    return `${channel}:${destination.trim().toLowerCase()}`;
  }
}
