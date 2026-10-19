import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { TaskPriority, TaskStatus } from '../../models/models';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({ selector: 'app-tasks-page', imports: [DatePipe, FormsModule, RouterLink, PaginationComponent], templateUrl: './tasks.page.html', styleUrl: './tasks.page.css' })
export class TasksPage {
  private readonly toast = inject(ToastService);
  readonly search = signal('');
  readonly status = signal<'All' | TaskStatus>('All');
  readonly priority = signal<'All' | TaskPriority>('All');
  readonly page = signal(1);
  readonly pageSize = 5;
  readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.data.tasks().filter(task =>
      task.title.toLowerCase().includes(query) &&
      (this.status() === 'All' || task.status === this.status()) &&
      (this.priority() === 'All' || task.priority === this.priority())
    );
  });
  readonly paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });
  constructor(readonly data: DataService) {
    void this.data.refreshTasksFromServer();
    void this.data.refreshTraineesFromServer();
  }
  traineeName(id: number): string { return this.data.trainees().find(item => item.id === id)?.name ?? 'Unassigned'; }

  async remove(id: number, title: string): Promise<void> {
    if (!await this.data.deleteTask(id)) {
      this.toast.show('The task could not be deleted from the server.', 'error');
      return;
    }
    if ((this.page() - 1) * this.pageSize >= this.filtered().length && this.page() > 1) this.page.update(page => page - 1);
    this.toast.show(`Task “${title}” deleted.`, 'warning');
  }
}
