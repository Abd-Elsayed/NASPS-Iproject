import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.role() === 'admin' || inject(Router).createUrlTree(['/login']);
};

export const traineeGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.role() === 'trainee' || inject(Router).createUrlTree(['/login']);
};
