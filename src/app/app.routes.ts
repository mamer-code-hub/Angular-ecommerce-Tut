import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';
import { homeRoutes } from './features/home/home.routing';
import { CheckoutComponent } from './features/Order/components/checkout/checkout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', component: UserLayoutComponent,
    children: homeRoutes
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'forgetPassword',
    loadComponent: () => import('./features/Authentication/components/forget-password/forget-password.component')
      .then(m => m.ForgetPasswordComponent),
    title: 'Forget Password'
  },
  {
    path: 'resetPassword',
    loadComponent: () => import('./features/Authentication/components/reset-password/reset-password.component')
      .then(m => m.ResetPasswordComponent),
    title: 'Reset Password'
  },
  {
    path: 'verify',
    loadComponent: () => import('./features/Authentication/components/verify-code/verify-code.component')
      .then(m => m.VerifyCodeComponent),
    title: 'Verify Code'
  },
  { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' },
  {
    path: '**',
    component: NotFoundComponent
  }
];
