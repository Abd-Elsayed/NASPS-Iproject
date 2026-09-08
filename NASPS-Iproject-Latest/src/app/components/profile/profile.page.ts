import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { ValidationService } from '../../services/validation.service';
import { UniversityService } from '../../services/university.service';

@Component({ selector: 'app-profile-page', imports: [ReactiveFormsModule], templateUrl: './profile.page.html', styleUrl: './profile.page.css' })
export class ProfilePage {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly toast = inject(ToastService);
  private readonly validation = inject(ValidationService);
  private readonly universityService = inject(UniversityService);
  readonly universities = this.universityService.egyptianUniversities;
  readonly me = this.auth.currentUser;
  readonly role = this.auth.role() ?? 'trainee';
  readonly isTrainee = this.role === 'trainee';

  private readonly storedProfile = this.isTrainee ? this.data.traineeProfile() : this.data.adminProfile();
  readonly photoPreview = signal(this.storedProfile.photoUrl ?? '');
  readonly photoFileName = signal('');
  readonly maxPhotoSize = 2 * 1024 * 1024;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [{ value: '', disabled: true }],
    phone: ['', [Validators.required, this.validation.phone]],
    roleLabel: [{ value: '', disabled: true }],
    department: [{ value: '', disabled: true }],
    university: [{ value: '', disabled: !this.isTrainee }, this.isTrainee ? [Validators.required] : []],
    joinDate: [{ value: '', disabled: true }],
  });

  constructor() {
    void this.auth.loadCurrentUser();
    // Fill the form whenever the signed-in user's record loads or changes.
    effect(() => {
      const m = this.me();
      if (!m) return;
      const listedUniversity = this.universityService.isListed(m.university) ? m.university : (m.university ? 'Other' : '');
      this.form.patchValue({
        name: m.name,
        email: m.email,
        phone: m.phone,
        roleLabel: this.auth.identity().roleLabel,
        department: m.department,
        university: listedUniversity,
        joinDate: (m.joinDate ?? '').startsWith('0001') ? '' : (m.joinDate ?? '').slice(0, 10),
      }, { emitEvent: false });
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted profile information.', 'error');
      return;
    }
    const value = this.form.getRawValue();
    const ok = await this.auth.updateCurrentUser({
      name: value.name,
      phone: value.phone,
      university: this.isTrainee ? value.university : undefined,
    });
    if (!ok) {
      this.toast.show('Could not save your profile. Check the API connection.', 'error');
      return;
    }
    if (this.isTrainee) void this.data.refreshTraineesFromServer();
    this.toast.show('Profile updated successfully.');
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      input.value = '';
      this.toast.show('Profile photo must be a JPG, PNG, WEBP, or GIF image. PDF files are not accepted.', 'error');
      return;
    }
    if (file.size > this.maxPhotoSize) {
      input.value = '';
      this.toast.show('Profile photo must be 2 MB or smaller.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const photoUrl = String(reader.result ?? '');
      this.photoPreview.set(photoUrl);
      this.photoFileName.set(file.name);
      const currentProfile = this.isTrainee ? this.data.traineeProfile() : this.data.adminProfile();
      this.data.updateProfile(this.role, { ...currentProfile, photoUrl });
      this.toast.show('Profile photo updated successfully.');
    };
    reader.onerror = () => this.toast.show('The selected image could not be read. Try another image.', 'error');
    reader.readAsDataURL(file);
  }

  resetDemo(): void {
    this.data.resetDemo();
    this.toast.show('Demo data restored.', 'warning');
  }
}
