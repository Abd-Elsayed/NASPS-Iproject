import { Component, input, output } from '@angular/core';

/**
 * One consistent chip for every attachment in the app (task brief, submission, …).
 * Shows a delete button when `removable` is set and there is something to remove.
 */
@Component({
  selector: 'app-attachment',
  template: `
    <span class="attachment" [class.empty]="!name()">
      <span class="attachment-icon">▣</span>
      <span class="attachment-name">{{ name() || placeholder() }}</span>
      @if (size()) { <span class="attachment-size">{{ formatSize(size()!) }}</span> }
      @if (removable() && name()) {
        <button type="button" class="attachment-remove" (click)="remove.emit()" aria-label="Delete attachment">✕</button>
      }
    </span>
  `,
  styles: [`
    .attachment { display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 8px;
      background: var(--light-blue, #eaf2fd); color: var(--blue-dark, #1b4f8a); font-size: 11px; font-weight: 700;
      max-width: 100%; word-break: break-all; }
    .attachment.empty { background: #f1f3f5; color: var(--muted, #8a94a6); }
    .attachment-icon { flex: none; }
    .attachment-size { font-weight: 500; opacity: .8; }
    .attachment-remove { flex: none; border: none; cursor: pointer; width: 18px; height: 18px; border-radius: 50%;
      background: var(--blue-dark, #1b4f8a); color: #fff; font-size: 10px; line-height: 1; display: grid; place-items: center; }
    .attachment-remove:hover { background: #c0392b; }
  `],
})
export class AttachmentComponent {
  readonly name = input<string | null | undefined>('');
  readonly size = input<number | null | undefined>(null);
  readonly placeholder = input('No attachment');
  readonly removable = input(false);
  readonly remove = output<void>();

  formatSize(size: number): string {
    return size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
}
