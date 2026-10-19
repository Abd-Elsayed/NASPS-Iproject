import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { RoleDashboardPage } from './role-dashboard.page';

describe('RoleDashboardPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [RoleDashboardPage], providers: [provideRouter([]), provideHttpClient()] }));
  it('creates the shared role dashboard', () => expect(TestBed.createComponent(RoleDashboardPage).componentInstance).toBeTruthy());
  it('calculates chart widths from live values', () => {
    const component = TestBed.createComponent(RoleDashboardPage).componentInstance;
    expect(component.barWidth(5, [{ label: 'A', count: 10 }, { label: 'B', count: 5 }])).toBe(50);
  });
});
