import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  readonly totalItems = input(0);
  readonly pageSize = input(5);
  readonly page = input(1);
  readonly pageChange = output<number>();
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));
  readonly firstItem = computed(() => this.totalItems() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1);
  readonly lastItem = computed(() => Math.min(this.page() * this.pageSize(), this.totalItems()));

  goTo(page: number): void {
    const safePage = Math.min(Math.max(page, 1), this.totalPages());
    if (safePage !== this.page()) this.pageChange.emit(safePage);
  }
}
