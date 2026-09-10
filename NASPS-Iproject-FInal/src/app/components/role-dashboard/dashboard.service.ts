import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminDashboardSummary } from '../../models/models';
import { API_BASE_URL } from '../../core/api-url';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  readonly summary = signal<AdminDashboardSummary | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');

  async refreshAdminDashboard(): Promise<boolean> {
    this.loading.set(true);
    this.error.set('');
    try {
      this.summary.set(await firstValueFrom(
        this.http.get<AdminDashboardSummary>(`${API_BASE_URL}/dashboard/admin`),
      ));
      return true;
    } catch {
      this.error.set('Live dashboard statistics could not be loaded. Check the API connection and try again.');
      return false;
    } finally {
      this.loading.set(false);
    }
  }
}
