import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TasksPage } from './tasks.page';

describe('TasksPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TasksPage], providers: [provideRouter([])] }));
  it('creates the task listing page', () => expect(TestBed.createComponent(TasksPage).componentInstance).toBeTruthy());
});
