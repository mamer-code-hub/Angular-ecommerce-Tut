import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService)
  isAuthenticated!: boolean;

  isAuth() {  
    this.authService.isLoggedIn.subscribe({
      next: (value) => {
        this.isAuthenticated = value
      }
    });
  }
  ngOnInit() {
    this.isAuth()
  }




  logout() {
    this.authService.logout()
    this.authService.isLoggedIn.next(false)
  }





}
