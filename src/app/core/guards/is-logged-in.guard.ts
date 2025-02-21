import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/Authentication/services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (!authService.isAuthenticated()) {
    return false;
  }
  return true;

  // authService.verifyToken().subscribe({
  //   next: () => {
  //     authService.navigateToHome()
  //     return false;
  //   },
  //   error: () => {
  //     return true;
  //   }
  // })
};
