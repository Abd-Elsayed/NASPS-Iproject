import { TestBed } from '@angular/core/testing';
import { AiCourseSuggestions } from './ai-course-suggestions';

describe('AiCourseSuggestions', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AiCourseSuggestions] }));

  it('creates personalized course suggestions', () => {
    const fixture = TestBed.createComponent(AiCourseSuggestions);
    fixture.componentRef.setInput('internshipProgram', 'Frontend Web Development');
    fixture.detectChanges();
    expect(fixture.componentInstance.courses()[0].title).toBe('HTML & CSS Foundations');
    expect(fixture.componentInstance.courseraUrl('Angular Fundamentals')).toContain('coursera.org/search?query=Angular%20Fundamentals%20Frontend%20Web%20Development');
    expect(fixture.componentInstance.udemyUrl('Angular Fundamentals')).toContain('udemy.com/courses/search/?q=Angular%20Fundamentals%20Frontend%20Web%20Development');
  });

  it('builds provider search links for AI-generated recommendations', () => {
    const fixture = TestBed.createComponent(AiCourseSuggestions);
    fixture.componentRef.setInput('internshipProgram', 'Frontend Web Development');
    fixture.componentInstance.learningPath.set({
      summary: 'Task-based recommendations.',
      progressPercent: 100,
      recommendations: [{
        order: 1,
        title: 'Advanced CSS Grid Layouts',
        description: 'Practice modern layouts.',
        reason: 'Builds on Flexbox skills.',
        skills: ['CSS Grid'],
        difficulty: 'Intermediate',
        estimatedHours: 15,
      }],
    });
    fixture.detectChanges();

    const links = Array.from(fixture.nativeElement.querySelectorAll('.ai-course-actions a')) as HTMLAnchorElement[];
    expect(links.map(link => link.href)).toEqual([
      'https://www.coursera.org/search?query=Advanced%20CSS%20Grid%20Layouts%20Frontend%20Web%20Development',
      'https://www.udemy.com/courses/search/?q=Advanced%20CSS%20Grid%20Layouts%20Frontend%20Web%20Development',
    ]);
    expect(fixture.nativeElement.textContent).toContain('This is based on internship tasks, not completed courses.');
  });
});
