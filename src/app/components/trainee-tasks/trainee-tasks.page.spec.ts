import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TraineeTasksPage } from './trainee-tasks.page';

describe('TraineeTasksPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineeTasksPage], providers: [provideRouter([])] }));
  it('creates the trainee task listing page', () => expect(TestBed.createComponent(TraineeTasksPage).componentInstance).toBeTruthy());
});
