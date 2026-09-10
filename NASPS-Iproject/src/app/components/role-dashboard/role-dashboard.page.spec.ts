import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleDashboardPage } from './role-dashboard.page';

describe('RoleDashboardPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [RoleDashboardPage], providers: [provideRouter([])] }));
  it('creates the shared role dashboard', () => expect(TestBed.createComponent(RoleDashboardPage).componentInstance).toBeTruthy());
});
