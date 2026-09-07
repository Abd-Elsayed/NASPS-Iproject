import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { TaskPriority, TaskStatus } from '../../models/models';

@Component({ selector: 'app-tasks-page', imports: [DatePipe, FormsModule, RouterLink], templateUrl: './tasks.page.html', styleUrl: './tasks.page.css' })
export class TasksPage {
  readonly search = signal('');
  readonly status = signal<'All' | TaskStatus>('All');
  readonly priority = signal<'All' | TaskPriority>('All');
  readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    return this.data.tasks().filter(task =>
      task.title.toLowerCase().includes(query) &&
      (this.status() === 'All' || task.status === this.status()) &&
      (this.priority() === 'All' || task.priority === this.priority())
    );
  });
  constructor(readonly data: DataService) {}
  traineeName(id: number): string { return this.data.trainees().find(item => item.id === id)?.name ?? 'Unassigned'; }
}
