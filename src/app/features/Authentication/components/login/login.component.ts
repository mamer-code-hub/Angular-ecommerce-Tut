import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../models/login-user';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { map, Subscription } from 'rxjs';
import { redirectToHome } from '../../../../shared/helpers/redirect';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InvalidInputDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  authForm!: FormGroup;
  isLoading: boolean = false;
  // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  sub!: Subscription
  resMsg!: string;

  createForm() {
    this.authForm = this.fb.group({
      email: [null, globalValidator.emailValidate],
      password: [null, globalValidator.passwordValidate],

    })
  }



  ngOnInit() {
    this.sub = redirectToHome(this.authService)
    this.createForm()


  }
  login() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const user = ((this.authForm.value) as unknown) as LoginUser
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.authService.saveToken(res.token)
        this.authService.isLoggedIn.next(true);
        this.authService.navigateToHome()
      },
      error: ({ error }) => {
        this.resMsg = error.message
        this.isLoading = false;
      }
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }


















}
