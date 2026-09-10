import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_BASE_URL } from './api-url';
import * as i0 from "@angular/core";
export class AiFeatureError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export class AiService {
    http = inject(HttpClient, { optional: true });
    apiUrl = `${API_BASE_URL}/ai`;
    createLearningPath(traineeId, tasks = []) {
        if (!this.http)
            return this.noHttpClient();
        return this.http.post(`${this.apiUrl}/learning-path/${traineeId}`, { tasks: this.taskContext(tasks) }).pipe(this.handleErrors());
    }
    generateTask(prompt) {
        if (!this.http)
            return this.noHttpClient();
        return this.http.post(`${this.apiUrl}/generate-task`, { prompt }).pipe(this.handleErrors());
    }
    createTraineeInsights(traineeId, tasks = []) {
        if (!this.http)
            return this.noHttpClient();
        return this.http.post(`${this.apiUrl}/trainee-insights/${traineeId}`, { tasks: this.taskContext(tasks) }).pipe(this.handleErrors());
    }
    taskContext(tasks) {
        return tasks.slice(0, 25).map(task => ({
            title: task.title, description: task.description, priority: task.priority,
            status: task.status, dueDate: task.dueDate, adminReview: task.adminReview || null,
        }));
    }
    noHttpClient() {
        return throwError(() => new AiFeatureError('The AI HTTP client is unavailable. Nothing was saved.', 0));
    }
    handleErrors() {
        return catchError((error) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 0)
                    return throwError(() => new AiFeatureError('The AI service cannot reach the backend. Start the ASP.NET API, then try again.', 0));
                return throwError(() => new AiFeatureError(error.error?.message || 'The AI request could not be completed. Please try again.', error.status));
            }
            return throwError(() => new AiFeatureError('An unexpected AI error occurred. Nothing was saved.', 0));
        });
    }
    static ɵfac = function AiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AiService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AiService, factory: AiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
