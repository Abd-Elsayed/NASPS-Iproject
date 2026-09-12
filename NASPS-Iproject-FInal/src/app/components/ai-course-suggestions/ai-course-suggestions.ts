import { Component, computed, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PersonalizedLearningPath } from '../../models/ai.models';
import { AiService } from '../../services/ai.service';
import { ToastService } from '../../services/toast.service';
import { DataService } from '../../services/data.service';

interface CourseSuggestion {
  title: string;
  level: 'Start here' | 'Next step' | 'Build project';
  duration: string;
  reason: string;
}

const LEARNING_PATHS: Record<string, CourseSuggestion[]> = {
  'Frontend Web Development': [
    { title: 'HTML & CSS Foundations', level: 'Start here', duration: '6 hours', reason: 'Build responsive and accessible page layouts.' },
    { title: 'Modern JavaScript Essentials', level: 'Next step', duration: '10 hours', reason: 'Learn the language used by every frontend framework.' },
    { title: 'Angular Fundamentals', level: 'Build project', duration: '12 hours', reason: 'Create components, forms, services and routed applications.' },
  ],
  'Backend Development': [
    { title: 'Programming & Git Foundations', level: 'Start here', duration: '7 hours', reason: 'Prepare the coding and version-control fundamentals.' },
    { title: 'REST API Development', level: 'Next step', duration: '10 hours', reason: 'Design endpoints, validation and error responses.' },
    { title: 'Database-Driven API Project', level: 'Build project', duration: '14 hours', reason: 'Connect authentication, APIs and persistent data.' },
  ],
  'Full-Stack Development': [
    { title: 'Web Development Foundations', level: 'Start here', duration: '8 hours', reason: 'Understand how browser, server and database work together.' },
    { title: 'Angular & REST APIs', level: 'Next step', duration: '12 hours', reason: 'Build a typed frontend connected to a backend.' },
    { title: 'Full-Stack Capstone', level: 'Build project', duration: '18 hours', reason: 'Deliver one complete authenticated application.' },
  ],
  'Mobile Application Development': [
    { title: 'Mobile UI & UX Basics', level: 'Start here', duration: '5 hours', reason: 'Learn mobile navigation, layouts and platform patterns.' },
    { title: 'Mobile App Development Fundamentals', level: 'Next step', duration: '12 hours', reason: 'Build screens, state and network requests.' },
    { title: 'Publishable Mobile App', level: 'Build project', duration: '16 hours', reason: 'Turn the skills into a tested portfolio application.' },
  ],
  'UI/UX Design': [
    { title: 'UX Research Fundamentals', level: 'Start here', duration: '5 hours', reason: 'Learn interviews, personas and problem definition.' },
    { title: 'Wireframing & Prototyping', level: 'Next step', duration: '8 hours', reason: 'Translate findings into testable user flows.' },
    { title: 'Product Design Case Study', level: 'Build project', duration: '12 hours', reason: 'Create a complete portfolio-ready design story.' },
  ],
  'Data Science & AI': [
    { title: 'Python for Data Analysis', level: 'Start here', duration: '10 hours', reason: 'Build the programming base for data work.' },
    { title: 'Statistics & Machine Learning', level: 'Next step', duration: '14 hours', reason: 'Understand models, evaluation and reliable conclusions.' },
    { title: 'End-to-End AI Project', level: 'Build project', duration: '18 hours', reason: 'Clean data, train a model and present its results.' },
  ],
  'Cyber Security': [
    { title: 'Networking & Security Basics', level: 'Start here', duration: '8 hours', reason: 'Understand protocols, threats and core defenses.' },
    { title: 'Web Application Security', level: 'Next step', duration: '10 hours', reason: 'Practice identifying and preventing common vulnerabilities.' },
    { title: 'Security Assessment Lab', level: 'Build project', duration: '14 hours', reason: 'Document risks and fixes in a safe practice environment.' },
  ],
  'DevOps & Cloud Computing': [
    { title: 'Linux, Git & Networking', level: 'Start here', duration: '8 hours', reason: 'Build the foundation used by cloud and automation tools.' },
    { title: 'Docker & CI/CD', level: 'Next step', duration: '10 hours', reason: 'Automate repeatable builds, tests and deployments.' },
    { title: 'Cloud Deployment Project', level: 'Build project', duration: '14 hours', reason: 'Deploy and monitor a complete application.' },
  ],
  'Software Testing & Quality Assurance': [
    { title: 'Software Testing Foundations', level: 'Start here', duration: '6 hours', reason: 'Learn test levels, cases and defect reporting.' },
    { title: 'API & UI Test Automation', level: 'Next step', duration: '10 hours', reason: 'Automate repeatable checks for faster feedback.' },
    { title: 'Complete QA Test Plan', level: 'Build project', duration: '12 hours', reason: 'Produce a practical test suite and quality report.' },
  ],
  'Business Analysis': [
    { title: 'Business Analysis Foundations', level: 'Start here', duration: '6 hours', reason: 'Learn stakeholders, scope and requirement discovery.' },
    { title: 'Requirements & Process Modeling', level: 'Next step', duration: '8 hours', reason: 'Turn needs into clear workflows and specifications.' },
    { title: 'Business Case Study', level: 'Build project', duration: '10 hours', reason: 'Document one solution from problem to acceptance criteria.' },
  ],
  'Project Management': [
    { title: 'Project Management Essentials', level: 'Start here', duration: '6 hours', reason: 'Understand scope, schedule, risk and stakeholders.' },
    { title: 'Agile & Scrum Practice', level: 'Next step', duration: '7 hours', reason: 'Plan iterations and collaborate with a delivery team.' },
    { title: 'Project Delivery Simulation', level: 'Build project', duration: '10 hours', reason: 'Create a complete plan and manage realistic changes.' },
  ],
  'Digital Marketing': [
    { title: 'Digital Marketing Foundations', level: 'Start here', duration: '6 hours', reason: 'Understand audiences, channels and campaign goals.' },
    { title: 'Content, SEO & Analytics', level: 'Next step', duration: '9 hours', reason: 'Create discoverable content and measure performance.' },
    { title: 'Campaign Strategy Project', level: 'Build project', duration: '10 hours', reason: 'Plan, budget and evaluate a complete campaign.' },
  ],
  'Human Resources': [
    { title: 'HR Fundamentals', level: 'Start here', duration: '6 hours', reason: 'Understand recruitment, onboarding and employee support.' },
    { title: 'People Analytics & Performance', level: 'Next step', duration: '8 hours', reason: 'Use evidence to improve employee decisions.' },
    { title: 'Employee Journey Project', level: 'Build project', duration: '10 hours', reason: 'Design a measurable onboarding and development plan.' },
  ],
};

const GENERAL_PATH: CourseSuggestion[] = [
  { title: 'Professional Communication', level: 'Start here', duration: '4 hours', reason: 'Strengthen the communication needed in every internship.' },
  { title: 'Digital Productivity & Git', level: 'Next step', duration: '6 hours', reason: 'Organize work and collaborate with your team.' },
  { title: 'Internship Portfolio Project', level: 'Build project', duration: '10 hours', reason: 'Turn your learning into evidence of your skills.' },
];

@Component({
  selector: 'app-ai-course-suggestions',
  templateUrl: './ai-course-suggestions.html',
  styleUrl: './ai-course-suggestions.css',
})
export class AiCourseSuggestions {
  private readonly ai = inject(AiService);
  private readonly toast = inject(ToastService);
  private readonly data = inject(DataService);
  readonly internshipProgram = input('');
  readonly traineeId = input<number | null>(null);
  readonly courses = computed(() => LEARNING_PATHS[this.internshipProgram()] ?? GENERAL_PATH);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly learningPath = signal<PersonalizedLearningPath | null>(null);

  generatePersonalizedPath(): void {
    const traineeId = this.traineeId();
    if (!traineeId || this.loading()) {
      if (!traineeId) this.error.set('A trainee account is required to generate a learning path.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const tasks = this.data.tasks().filter(task => task.traineeId === traineeId);
    this.ai.createLearningPath(traineeId, tasks).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: path => {
        this.learningPath.set(path);
        this.toast.show('Your personalized learning path is ready.', 'success');
      },
      error: error => {
        this.error.set(error.message);
        this.toast.show(error.message, 'error');
      },
    });
  }

  courseraUrl(courseTitle: string): string {
    return `https://www.coursera.org/search?query=${this.courseQuery(courseTitle)}`;
  }

  udemyUrl(courseTitle: string): string {
    return `https://www.udemy.com/courses/search/?q=${this.courseQuery(courseTitle)}`;
  }

  private courseQuery(courseTitle: string): string {
    return encodeURIComponent(`${courseTitle} ${this.internshipProgram()}`.trim());
  }
}
