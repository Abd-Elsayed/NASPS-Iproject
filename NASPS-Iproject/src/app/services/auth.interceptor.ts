import { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from './api-url';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('nasps-access-token');
  const isApiRequest = request.url.startsWith(API_BASE_URL);
  const authorizedRequest = token && isApiRequest
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;
  return next(authorizedRequest);
};
