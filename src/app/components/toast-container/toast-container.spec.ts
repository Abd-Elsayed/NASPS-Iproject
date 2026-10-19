import { TestBed } from '@angular/core/testing';
import { ToastContainer } from './toast-container';

describe('ToastContainer', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ToastContainer] }));
  it('creates the toast container', () => expect(TestBed.createComponent(ToastContainer).componentInstance).toBeTruthy());
});
