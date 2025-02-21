import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AuthService } from './features/Authentication/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private spinner: NgxSpinnerService) { }
  private readonly auth = inject(AuthService)

  ngOnInit() {
    this.auth.verifyToken().subscribe({
      next: () => {
        this.auth.isLoggedIn.next(true)
      },
      error: () => {
        this.auth.isLoggedIn.next(false)
      }
    })
  }
}
