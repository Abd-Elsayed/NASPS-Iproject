import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InternshipProgramService {
  readonly programs = [
    'Frontend Web Development',
    'Backend Development',
    'Full-Stack Development',
    'Mobile Application Development',
    'UI/UX Design',
    'Data Science & AI',
    'Cyber Security',
    'DevOps & Cloud Computing',
    'Software Testing & Quality Assurance',
    'Business Analysis',
    'Project Management',
    'Digital Marketing',
    'Human Resources',
  ] as const;
}
