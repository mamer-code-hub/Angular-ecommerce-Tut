import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMisMatch = (passwordControlName: string, rePasswordControlName: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordControlName);
    const rePassword = control.get(rePasswordControlName);

    if (!password || !rePassword) {
      return null;
    }

    return password.value === rePassword.value
      ? null
      : { passwordMismatch: true };
  };
}
