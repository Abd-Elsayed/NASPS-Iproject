import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({ selector: 'app-notifications-page', templateUrl: './notifications.page.html', styleUrl: './notifications.page.css' })
export class NotificationsPage {
  private readonly toast = inject(ToastService);
  readonly data = inject(DataService);
  readonly tab = signal<'All' | 'Unread' | 'Tasks' | 'System'>('All');
  readonly filtered = computed(() => this.data.notifications().filter(item =>
    this.tab() === 'All' || (this.tab() === 'Unread' ? !item.read : item.category === this.tab())
  ));
  markAllRead(): void {
    this.data.markAllRead();
    this.toast.show('All notifications marked as read.', 'info');
  }
}
