import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TraineeFormPage } from './trainee-form.page';

describe('TraineeFormPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineeFormPage], providers: [provideRouter([])] }));
  it('creates the trainee form page', () => expect(TestBed.createComponent(TraineeFormPage).componentInstance).toBeTruthy());
});
