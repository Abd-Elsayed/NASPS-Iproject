import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const adminGuard = () => {
    const auth = inject(AuthService);
    return auth.role() === 'admin' || inject(Router).createUrlTree(['/login']);
};
export const traineeGuard = () => {
    const auth = inject(AuthService);
    return auth.role() === 'trainee' || inject(Router).createUrlTree(['/login']);
};
export const superAdminGuard = () => {
    const auth = inject(AuthService);
    return auth.role() === 'admin' && auth.identity().isSuperAdmin
        || inject(Router).createUrlTree(['/admin/dashboard']);
};
export const departmentAdminGuard = () => {
    const auth = inject(AuthService);
    return auth.role() === 'admin' && !auth.identity().isSuperAdmin
        || inject(Router).createUrlTree(['/admin/dashboard']);
};
