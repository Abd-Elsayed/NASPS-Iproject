import { Component, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { TraineeInsights as TraineeInsightsModel } from '../../models/ai.models';
import { AiService } from '../../core/ai.service';
import { ToastService } from '../../core/toast.service';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-trainee-insights',
  templateUrl: './trainee-insights.html',
  styleUrl: './trainee-insights.css',
})
export class TraineeInsights {
  private readonly ai = inject(AiService);
  private readonly toast = inject(ToastService);
  private readonly data = inject(DataService);
  readonly traineeId = input.required<number>();
  readonly loading = signal(false);
  readonly error = signal('');
  readonly insights = signal<TraineeInsightsModel | null>(null);

  analyze(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    const tasks = this.data.tasks().filter(task => task.traineeId === this.traineeId());
    this.ai.createTraineeInsights(this.traineeId(), tasks).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: insights => { this.insights.set(insights); this.toast.show('AI trainee insights are ready.', 'success'); },
      error: error => { this.error.set(error.message); this.toast.show(error.message, 'error'); },
    });
  }
}
