import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AiFeatureError, AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AiService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('requests a learning path for the selected trainee', () => {
    service.createLearningPath(7).subscribe(result => expect(result.progressPercent).toBe(40));
    const request = http.expectOne('http://localhost:5222/api/ai/learning-path/7');
    expect(request.request.method).toBe('POST');
    request.flush({ summary: 'Keep learning.', progressPercent: 40, recommendations: [] });
  });

  it('returns a clear provider error', () => {
    service.createTraineeInsights(2).subscribe({ next: () => expect.fail('Expected an error'), error: error => { expect(error).toBeInstanceOf(AiFeatureError); expect(error.message).toContain('not configured'); } });
    http.expectOne('http://localhost:5222/api/ai/trainee-insights/2').flush({ message: 'AI is not configured.' }, { status: 503, statusText: 'Service Unavailable' });
  });
});
