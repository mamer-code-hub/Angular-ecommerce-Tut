import { Component, Input } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-auth-modal',
  imports: [LoginComponent, RegisterComponent, CarouselModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent {

  @Input() accountExist!:boolean;

  moveToLogin(){
    this.accountExist = true;
  }


}
