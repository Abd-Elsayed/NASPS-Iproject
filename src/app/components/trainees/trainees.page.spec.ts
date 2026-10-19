import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TraineesPage } from './trainees.page';

describe('TraineesPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineesPage], providers: [provideRouter([])] }));
  it('creates the trainee listing page', () => expect(TestBed.createComponent(TraineesPage).componentInstance).toBeTruthy());
});
