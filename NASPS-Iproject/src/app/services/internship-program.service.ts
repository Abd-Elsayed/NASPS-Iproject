import { Injectable } from '@angular/core';

/**
 * Internship intake cohorts a trainee can be assigned to. Kept as a simple list so the
 * Add Trainee form shows "Summer 2026", "Winter 2026", … instead of program names.
 */
@Injectable({ providedIn: 'root' })
export class InternshipProgramService {
  readonly programs = [
    'Winter 2025',
    'Summer 2025',
    'Winter 2026',
    'Summer 2026',
    'Winter 2027',
    'Summer 2027',
  ] as const;
}
