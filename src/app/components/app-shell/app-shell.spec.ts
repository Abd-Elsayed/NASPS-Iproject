import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppShell } from './app-shell';

describe('AppShell', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AppShell], providers: [provideRouter([])] }));
  it('creates the application shell', () => expect(TestBed.createComponent(AppShell).componentInstance).toBeTruthy());
});
