import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { TaskPriority, TaskStatus } from '../../models/models';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-trainee-tasks-page',
  imports: [DatePipe, FormsModule, RouterLink, PaginationComponent],
  templateUrl: './trainee-tasks.page.html',
  styleUrl: './trainee-tasks.page.css',
})
export class TraineeTasksPage {
  readonly search = signal('');
  readonly status = signal<'All' | TaskStatus>('All');
  readonly priority = signal<'All' | TaskPriority>('All');
  readonly page = signal(1);
  readonly pageSize = 5;
  readonly filtered = computed(() => this.data.tasks().filter(task =>
    task.traineeId === this.auth.currentTraineeId() &&
    task.title.toLowerCase().includes(this.search().toLowerCase()) &&
    (this.status() === 'All' || task.status === this.status()) &&
    (this.priority() === 'All' || task.priority === this.priority())
  ));
  readonly paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });
  constructor(readonly data: DataService, readonly auth: AuthService) {
    void this.data.refreshTasksFromServer(this.auth.currentTraineeId());
  }
}
