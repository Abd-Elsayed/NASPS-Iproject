import { TestBed } from '@angular/core/testing';
import { AiCourseSuggestions } from './ai-course-suggestions';

describe('AiCourseSuggestions', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AiCourseSuggestions] }));

  it('creates personalized course suggestions', () => {
    const fixture = TestBed.createComponent(AiCourseSuggestions);
    fixture.componentRef.setInput('internshipProgram', 'Frontend Web Development');
    fixture.detectChanges();
    expect(fixture.componentInstance.courses()[0].title).toBe('HTML & CSS Foundations');
  });
});
