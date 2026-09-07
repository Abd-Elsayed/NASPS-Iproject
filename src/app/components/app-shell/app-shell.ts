import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

interface NavItem { label: string; icon: string; link: string; }

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly toast = inject(ToastService);
  readonly auth = inject(AuthService);
  readonly open = signal(false);
  readonly role = this.route.snapshot.data['role'] as 'admin' | 'trainee';
  readonly trainee = computed(() => this.data.trainees().find(item => item.id === this.auth.currentTraineeId()));
  readonly navItems = computed<NavItem[]>(() => this.role === 'admin' ? [
    { label: 'Dashboard', icon: '⌂', link: '/admin/dashboard' },
    { label: 'Trainees', icon: '♙', link: '/admin/trainees' },
    { label: 'Tasks', icon: '✓', link: '/admin/tasks' },
    { label: 'Notifications', icon: '◉', link: '/admin/notifications' },
    { label: 'Profile', icon: '○', link: '/admin/profile' },
  ] : [
    { label: 'Dashboard', icon: '⌂', link: '/trainee/dashboard' },
    { label: 'My Tasks', icon: '✓', link: '/trainee/tasks' },
    { label: 'Profile', icon: '○', link: '/trainee/profile' },
    { label: 'Notifications', icon: '◉', link: '/trainee/notifications' },
  ]);

  closeMenu(): void { this.open.set(false); }
  logout(): void {
    this.auth.logout();
    this.toast.show('You have been signed out.', 'info');
  }
}
