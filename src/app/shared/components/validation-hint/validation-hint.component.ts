import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-hint',
  imports: [],
  templateUrl: './validation-hint.component.html',
  styleUrl: './validation-hint.component.css'
})
export class ValidationHintComponent {
  @Input() authForm!:AbstractControl;
  @Input() control!:AbstractControl|null;
  checkPasswordStrength(con: AbstractControl) {
    return con.value?.length >= 12 &&
      !this.authForm.getError('pattern') || 0;
  }

  getPassMinLength(con: AbstractControl) {
    return con.value?.length >= 8 || 0;
  }
  getPassUpperCase(con: AbstractControl) {
    return con.value?.match(/[A-Z]/) || 0;
  }
  getPassLowerCase(con: AbstractControl) {
    return con.value?.match(/[a-z]/) || 0;
  }
  getPassNumber(con: AbstractControl) {
    return con.value?.match(/[0-9]/) || 0;
  }
}
