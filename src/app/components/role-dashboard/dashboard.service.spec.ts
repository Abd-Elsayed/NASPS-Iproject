import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideHttpClient()] }));

  it('starts without static dashboard data', () => {
    const service = TestBed.inject(DashboardService);
    expect(service.summary()).toBeNull();
    expect(service.loading()).toBe(false);
  });
});
