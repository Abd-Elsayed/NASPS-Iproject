import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminFormPage } from './admin-form.page';

describe('AdminFormPage', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AdminFormPage],
    providers: [provideRouter([])],
  }));

  it('creates the administrator form page', () => {
    expect(TestBed.createComponent(AdminFormPage).componentInstance).toBeTruthy();
  });
});
