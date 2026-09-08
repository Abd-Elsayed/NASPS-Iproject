import { TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [PaginationComponent] }));
  it('calculates the number of pages', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('totalItems', 12);
    fixture.componentRef.setInput('pageSize', 5);
    expect(fixture.componentInstance.totalPages()).toBe(3);
  });
});
