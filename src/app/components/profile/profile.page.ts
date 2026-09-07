import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';
import { UniversityService } from '../../services/university.service';

@Component({ selector: 'app-profile-page', imports: [ReactiveFormsModule], templateUrl: './profile.page.html', styleUrl: './profile.page.css' })
export class ProfilePage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly toast = inject(ToastService);
  private readonly validation = inject(ValidationService);
  private readonly universityService = inject(UniversityService);
  readonly departments = ['Engineering', 'Design', 'Data & AI', 'Cyber Security', 'Operations', 'Training', 'Human Resources', 'Marketing', 'Finance', 'System Administration'];
  readonly universities = this.universityService.egyptianUniversities;
  readonly role = this.auth.role() ?? 'trainee';
  readonly source = this.role === 'admin' ? this.data.adminProfile() : this.data.traineeProfile();
  readonly form = this.fb.nonNullable.group({
    fullName: [this.source.fullName, [Validators.required, Validators.minLength(2)]],
    email: [this.source.email, [Validators.required, Validators.email]],
    phone: [this.source.phone, [Validators.required, this.validation.phone]],
    role: [{ value: this.source.role, disabled: true }],
    department: [this.source.department, Validators.required],
    university: [this.universityService.isListed(this.source.university) ? this.source.university : 'Other', Validators.required],
    otherUniversity: [this.universityService.isListed(this.source.university) ? '' : this.source.university],
    joinDate: [{ value: this.source.joinDate, disabled: true }],
  });

  save(): void {
    const selectedUniversity = this.form.controls.university.value;
    const otherUniversity = this.form.controls.otherUniversity.value.trim();
    if (selectedUniversity === 'Other' && !otherUniversity) this.form.controls.otherUniversity.setErrors({ required: true });
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted profile information.', 'error');
      return;
    }
    const { otherUniversity: _otherUniversity, ...value } = this.form.getRawValue();
    this.data.updateProfile(this.role, { ...value, university: selectedUniversity === 'Other' ? otherUniversity : selectedUniversity });
    this.toast.show('Profile updated successfully.');
  }

  resetDemo(): void {
    this.data.resetDemo();
    this.toast.show('Demo data restored.', 'warning');
  }
}
