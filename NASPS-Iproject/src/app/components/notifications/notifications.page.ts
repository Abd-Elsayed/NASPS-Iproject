import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({ selector: 'app-notifications-page', imports: [PaginationComponent], templateUrl: './notifications.page.html', styleUrl: './notifications.page.css' })
export class NotificationsPage {
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly tab = signal<'All' | 'Unread' | 'Tasks' | 'System'>('All');
  readonly page = signal(1);
  readonly pageSize = 5;
  readonly filtered = computed(() => this.data.notifications().filter(item =>
    this.tab() === 'All' || (this.tab() === 'Unread' ? !item.read : item.category === this.tab())
  ));
  readonly paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  constructor() {
    void this.data.refreshNotificationsFromServer();
  }

  markAllRead(): void {
    void this.data.markAllRead();
    this.toast.show('All notifications marked as read.', 'info');
  }

  open(id: number, read: boolean): void {
    if (!read) void this.data.markRead(id);
  }

  /** Accepts an ISO date (from the API) or a pre-formatted string (demo data). */
  timeAgo(value: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    const seconds = Math.round((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.round(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }
}
