import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { ValidationHintComponent } from "../../../../shared/components/validation-hint/validation-hint.component";
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { passwordMisMatch } from '../../../../shared/helpers/password-match';
import { RegisterUser } from '../../models/register-user';
import { AuthService } from '../../services/auth.service';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { redirectToHome } from '../../../../shared/helpers/redirect';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,
    RouterLink,
    ValidationMessagesComponent,
    ValidationHintComponent,
    InvalidInputDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  resMsg!: string;
  tooltip: boolean = false;
  authForm!: FormGroup;

  createForm() {
    this.authForm = this.fb.group({
      name: [null, globalValidator.nameValidate],
      email: [null, globalValidator.emailValidate],
      password: [null, globalValidator.passwordValidate],
      rePassword: [null, globalValidator.passwordValidate]
    }, {
      validators: passwordMisMatch('password', 'rePassword')
    });
  }

  register() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      this.authForm.get('rePassword')?.setValue("");
      return;
    }

    this.isLoading = true;
    const user = this.authForm.value as RegisterUser;
    this.authService.register(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: ({ error }) => {
        this.resMsg = error.message;
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    redirectToHome(this.authService);
    this.createForm();
  }
}