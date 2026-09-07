import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TaskReviewPage } from './task-review.page';

describe('TaskReviewPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TaskReviewPage], providers: [provideRouter([])] }));
  it('creates the task review page', () => expect(TestBed.createComponent(TaskReviewPage).componentInstance).toBeTruthy());
});
