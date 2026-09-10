import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainer {
  readonly toast = inject(ToastService);
}
