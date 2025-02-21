import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { ForgetPasswordComponent } from './features/Authentication/components/forget-password/forget-password.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';
import { ResetPasswordComponent } from './features/Authentication/components/reset-password/reset-password.component';
import { homeRoutes } from './features/home/home.routing';
import { VerifyCodeComponent } from './features/Authentication/components/verify-code/verify-code.component';
import { CheckoutComponent } from './features/Order/components/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '', component: UserLayoutComponent
    , children: homeRoutes
  },
  { path: 'login', component: LoginComponent, title:'Login' },
  { path: 'register', component: RegisterComponent, title:'Register' },
  { path: 'forgetPassword', component: ForgetPasswordComponent, title:'Forget password' },
  { path: 'resetPassword', component: ResetPasswordComponent, title:'Reset password'  },
  { path: 'verify', component: VerifyCodeComponent, title:'Password verification'  },
  { path: 'checkout/:id', component: CheckoutComponent, title:'Check out'  },



];
