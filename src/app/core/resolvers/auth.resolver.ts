import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../../features/Authentication/services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';


export const authResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((isValid: boolean) => {
      if (!isValid) {
        router.navigate(['/login']); // Redirect to login if invalid
      }
      return isValid;
    }),
    catchError(() => {
      router.navigate(['/login']); // Handle errors by redirecting
      return of(false);
    })
  );
};
