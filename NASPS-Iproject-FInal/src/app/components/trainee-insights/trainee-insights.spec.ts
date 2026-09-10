import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AiService } from '../../core/ai.service';
import { TraineeInsights } from './trainee-insights';

describe('TraineeInsights', () => {
  const ai = { createTraineeInsights: () => of({ summary: 'Good progress', progressAssessment: 'Steady', strengths: [], areasForImprovement: [], recommendations: ['Practice'], nextSteps: ['Complete task'], attentionIndicators: [] }) };
  beforeEach(() => TestBed.configureTestingModule({ imports: [TraineeInsights], providers: [{ provide: AiService, useValue: ai }] }));

  it('loads insights for the requested trainee', () => {
    const fixture = TestBed.createComponent(TraineeInsights);
    fixture.componentRef.setInput('traineeId', 2);
    fixture.componentInstance.analyze();
    expect(fixture.componentInstance.insights()?.summary).toBe('Good progress');
  });
});
