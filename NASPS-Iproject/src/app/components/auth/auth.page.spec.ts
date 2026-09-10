import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AuthPage], providers: [provideRouter([])] }));
  it('creates the authentication page', () => expect(TestBed.createComponent(AuthPage).componentInstance).toBeTruthy());
});
