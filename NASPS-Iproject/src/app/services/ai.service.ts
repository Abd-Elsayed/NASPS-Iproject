import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AiGeneratedTask, PersonalizedLearningPath, TraineeInsights } from '../models/ai.models';
import { TrainingTask } from '../models/models';
import { API_BASE_URL } from './api-url';

export class AiFeatureError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly apiUrl = `${API_BASE_URL}/ai`;

  createLearningPath(traineeId: number, tasks: TrainingTask[] = []): Observable<PersonalizedLearningPath> {
    if (!this.http) return this.noHttpClient();
    return this.http.post<PersonalizedLearningPath>(`${this.apiUrl}/learning-path/${traineeId}`, { tasks: this.taskContext(tasks) }).pipe(this.handleErrors());
  }

  generateTask(prompt: string): Observable<AiGeneratedTask> {
    if (!this.http) return this.noHttpClient();
    return this.http.post<AiGeneratedTask>(`${this.apiUrl}/generate-task`, { prompt }).pipe(this.handleErrors());
  }

  createTraineeInsights(traineeId: number, tasks: TrainingTask[] = []): Observable<TraineeInsights> {
    if (!this.http) return this.noHttpClient();
    return this.http.post<TraineeInsights>(`${this.apiUrl}/trainee-insights/${traineeId}`, { tasks: this.taskContext(tasks) }).pipe(this.handleErrors());
  }

  private taskContext(tasks: TrainingTask[]) {
    return tasks.slice(0, 25).map(task => ({
      title: task.title, description: task.description, priority: task.priority,
      status: task.status, dueDate: task.dueDate, adminReview: task.adminReview || null,
    }));
  }

  private noHttpClient<T>(): Observable<T> {
    return throwError(() => new AiFeatureError('The AI HTTP client is unavailable. Nothing was saved.', 0));
  }

  private handleErrors<T>() {
    return catchError<T, Observable<never>>((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0)
          return throwError(() => new AiFeatureError('The AI service cannot reach the backend. Start the ASP.NET API, then try again.', 0));
        return throwError(() => new AiFeatureError(error.error?.message || 'The AI request could not be completed. Please try again.', error.status));
      }
      return throwError(() => new AiFeatureError('An unexpected AI error occurred. Nothing was saved.', 0));
    });
  }
}
