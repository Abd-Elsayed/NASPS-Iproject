import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotificationsPage } from './notifications.page';

describe('NotificationsPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [NotificationsPage], providers: [provideRouter([])] }));
  it('creates the notifications page', () => expect(TestBed.createComponent(NotificationsPage).componentInstance).toBeTruthy());
});
