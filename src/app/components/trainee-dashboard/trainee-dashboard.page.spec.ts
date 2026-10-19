import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TraineeDashboardPage } from './trainee-dashboard.page';

describe('TraineeDashboardPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineeDashboardPage], providers: [provideRouter([])] }));
  it('creates the trainee dashboard page', () => expect(TestBed.createComponent(TraineeDashboardPage).componentInstance).toBeTruthy());
});
