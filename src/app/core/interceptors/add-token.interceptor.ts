import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/Authentication/services/auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if (req.url.includes('cart') || req.url.includes('orders')) {
    req=req.clone({
      setHeaders:{
        token:auth.getToken()!
      }
    })
  }
  return next(req);
};
