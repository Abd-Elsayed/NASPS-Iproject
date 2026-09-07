import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TaskFormPage } from './task-form.page';

describe('TaskFormPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TaskFormPage], providers: [provideRouter([])] }));
  it('creates the task form page', () => expect(TestBed.createComponent(TaskFormPage).componentInstance).toBeTruthy());
});
