import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, TraineeAccess } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { InternshipProgramService } from '../../services/internship-program.service';
import { ToastService } from '../../services/toast.service';
import { UniversityService } from '../../services/university.service';
import { ValidationService } from '../../services/validation.service';
import { TraineeStatus } from '../../models/models';

@Component({
  selector: 'app-trainee-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './trainee-form.page.html',
  styleUrl: './trainee-form.page.css',
})
export class TraineeFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly validation = inject(ValidationService);
  private readonly universityService = inject(UniversityService);
  private readonly internshipProgramService = inject(InternshipProgramService);
  readonly data = inject(DataService);
  readonly departments = ['Engineering', 'Design', 'Data & AI', 'Cyber Security', 'Operations', 'Training', 'Human Resources', 'Marketing', 'Finance'];
  readonly universities = this.universityService.egyptianUniversities;
  readonly internshipPrograms = this.internshipProgramService.programs;
  readonly id = Number(this.route.snapshot.paramMap.get('id')) || null;
  readonly existing = this.id ? this.data.trainees().find(item => item.id === this.id) : undefined;
  readonly existingUniversity = this.existing?.university ?? '';
  submitted = false;
  createdAccess: TraineeAccess | null = null;
  readonly form = this.fb.nonNullable.group({
    name: [this.existing?.name ?? '', [Validators.required, Validators.minLength(2)]],
    email: [this.existing?.email ?? '', [Validators.required, Validators.email]],
    internshipProgram: [this.existing?.internshipProgram ?? '', Validators.required],
    phone: [this.existing?.phone ?? '', [Validators.required, this.validation.phone]],
    department: [this.existing?.department ?? '', Validators.required],
    university: [this.universityService.isListed(this.existingUniversity) ? this.existingUniversity : this.existingUniversity ? 'Other' : '', Validators.required],
    otherUniversity: [this.universityService.isListed(this.existingUniversity) ? '' : this.existingUniversity],
    joinDate: [this.existing?.joinDate ?? new Date().toISOString().slice(0, 10), Validators.required],
    status: [this.existing?.status ?? 'Active' as TraineeStatus, Validators.required],
  });

  save(): void {
    this.submitted = true;
    const email = this.form.controls.email.value.trim().toLowerCase();
    const duplicate = this.data.trainees().some(item => item.id !== this.id && item.email.toLowerCase() === email);
    if (duplicate) this.form.controls.email.setErrors({ ...this.form.controls.email.errors, duplicate: true });
    const selectedUniversity = this.form.controls.university.value;
    const otherUniversity = this.form.controls.otherUniversity.value.trim();
    if (selectedUniversity === 'Other' && !otherUniversity) this.form.controls.otherUniversity.setErrors({ required: true });
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted trainee information.', 'error');
      return;
    }

    const { otherUniversity: _otherUniversity, ...rawValue } = this.form.getRawValue();
    const value = { ...rawValue, email, university: selectedUniversity === 'Other' ? otherUniversity : selectedUniversity };
    if (this.id) {
      this.data.updateTrainee(this.id, value);
      this.auth.registerTrainee(this.id, email, this.existing?.email);
      this.toast.show('Trainee profile updated successfully.');
      this.router.navigate(['/admin/trainees']);
    } else {
      const created = this.data.addTrainee({ ...value, status: 'Active' });
      this.createdAccess = this.auth.registerTrainee(created.id, email);
      this.toast.show('Trainee account created. Give the login credentials to the trainee.', 'success', 6000);
    }
  }

  async copyCredentials(): Promise<void> {
    if (!this.createdAccess) return;
    const access = this.createdAccess;
    const credentials = `Trainee ID: ${access.traineeId}\nUsername: ${access.username}\nTemporary Password: ${access.temporaryPassword}`;
    try {
      await navigator.clipboard.writeText(credentials);
      this.toast.show('Login credentials copied.');
    } catch {
      this.toast.show('Copy is unavailable. Select the credentials manually.', 'warning');
    }
  }

  finishCreation(): void {
    this.router.navigate(['/admin/trainees']);
  }
}
