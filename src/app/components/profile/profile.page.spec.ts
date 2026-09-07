import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ProfilePage], providers: [provideRouter([])] }));
  it('creates the profile page', () => expect(TestBed.createComponent(ProfilePage).componentInstance).toBeTruthy());
});
