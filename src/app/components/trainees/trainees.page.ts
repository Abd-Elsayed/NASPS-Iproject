import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { TraineeStatus } from '../../models/models';

@Component({
  selector: 'app-trainees-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './trainees.page.html',
  styleUrl: './trainees.page.css',
})
export class TraineesPage {
  readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly search = signal('');
  readonly status = signal<'All' | TraineeStatus>('All');
  readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.data.trainees().filter(trainee =>
      (this.status() === 'All' || trainee.status === this.status()) &&
      [trainee.name, trainee.email, this.auth.usernameFor(trainee.id), String(trainee.id), trainee.internshipProgram, trainee.department, trainee.university ?? ''].some(value => value.toLowerCase().includes(query))
    );
  });

  toggle(id: number, status: TraineeStatus): void {
    this.data.updateTrainee(id, { status: status === 'Active' ? 'Inactive' : 'Active' });
    this.toast.show('Trainee status updated.', 'info');
  }

  remove(id: number, email: string): void {
    this.data.deleteTrainee(id);
    this.auth.removeTrainee(email);
    this.toast.show('Trainee removed.', 'warning');
  }
}
