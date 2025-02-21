import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/Authentication/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.verifyToken().pipe(
    map(
      (isValid: boolean) => {
      if (isValid) {
        return true; // Allow navigation
      } else {
        router.navigate(['/login']); // Redirect to login
        return false;
      }
    })
  );


};
