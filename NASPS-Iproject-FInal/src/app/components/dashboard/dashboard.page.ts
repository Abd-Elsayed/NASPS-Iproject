import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage {
  readonly Math = Math;
  readonly stats = computed(() => [
    { label: 'Trainees', value: this.data.trainees().length, hint: 'Total trainees', tone: 'blue' },
    { label: 'Tasks', value: this.data.tasks().length, hint: 'Total tasks', tone: 'violet' },
    { label: 'Pending Tasks', value: this.data.pendingTasks(), hint: 'Needs attention', tone: 'orange' },
    { label: 'Completed Tasks', value: this.data.completedTasks(), hint: 'Successfully done', tone: 'green' },
  ]);
  readonly recent = computed(() => this.data.tasks().slice(0, 4));
  constructor(readonly data: DataService) {}
}
