import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  resMsg!: string
  userEmail: string = '';
  isLoading: boolean = false;
  getCode(forgetForm: NgForm) {
    if (forgetForm.invalid || this.isLoading) {
      forgetForm.form.markAllAsTouched()
      return;
    }

    this.isLoading = true;
    const email: string = forgetForm.value.email
    this.authService?.forgetPasswordCode(email).subscribe({
      next: (res) => {
        if (res.statusMsg == "success") {
          this.isLoading = false;

          this.router.navigate(['/verify'])
        }
      },
      error: ({ error }) => {
        this.resMsg = error.message;
        this.isLoading = false;
      }
    })

  }

}
