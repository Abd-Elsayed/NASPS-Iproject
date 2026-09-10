import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  readonly phone: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    if (!value) return null;
    const compact = value.replace(/[\s()-]/g, '');
    const egyptianMobile = /^(?:01[0125]\d{8}|\+?201[0125]\d{8}|00201[0125]\d{8})$/;
    return egyptianMobile.test(compact) ? null : { phone: true };
  };

  normalizePhone(value: string): string {
    const compact = value.replace(/[\s()-]/g, '');
    if (compact.startsWith('0020')) return `+20${compact.slice(4)}`;
    if (compact.startsWith('20')) return `+${compact}`;
    if (compact.startsWith('0')) return `+20${compact.slice(1)}`;
    return compact;
  }

  readonly httpUrl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    if (!value) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:' ? null : { url: true };
    } catch {
      return { url: true };
    }
  };
}
