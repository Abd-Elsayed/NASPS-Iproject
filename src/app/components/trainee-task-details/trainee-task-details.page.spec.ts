import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TraineeTaskDetailsPage } from './trainee-task-details.page';

describe('TraineeTaskDetailsPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineeTaskDetailsPage], providers: [provideRouter([])] }));
  it('creates the trainee task details page', () => expect(TestBed.createComponent(TraineeTaskDetailsPage).componentInstance).toBeTruthy());
});
