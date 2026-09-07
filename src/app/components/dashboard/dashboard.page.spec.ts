import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [DashboardPage], providers: [provideRouter([])] }));
  it('creates the dashboard page', () => expect(TestBed.createComponent(DashboardPage).componentInstance).toBeTruthy());
});
