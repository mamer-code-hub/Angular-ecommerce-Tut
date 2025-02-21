import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { LoginUser } from '../../models/login-user';
import { AuthService } from '../../services/auth.service';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { ValidationHintComponent } from "../../../../shared/components/validation-hint/validation-hint.component";
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,RouterLink, InvalidInputDirective, ValidationHintComponent, ValidationMessagesComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  authForm!: FormGroup;
  isLoading: boolean = false;
  tooltip:boolean = false;
  resMsg!: string;

  createForm() {
    this.authForm = this.fb.group({
      email: [null, globalValidator.emailValidate],
      password: [null, globalValidator.passwordValidate],

    })
  }


  ngOnInit() {



    this.createForm()










  }
  changePassword() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const user = ((this.authForm.value) as unknown) as LoginUser
    this.authService.resetPassword(user.email,user.password).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.authService.saveToken(res.token)
        setTimeout(() => {
          this.authService.navigateToHome()
        }, 1500)
      },
      error: ({ error }) => {
        this.resMsg = error.message
        this.isLoading = false;
      }
    })

  }

}
