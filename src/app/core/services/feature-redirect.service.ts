import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../features/Authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureRedirectService {
  private readonly authService = inject(AuthService)
  constructor() { }



  verifyLogin() {
    this.authService.verifyToken().subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.authService.navigateToHome()
      }
    })
  }
}
