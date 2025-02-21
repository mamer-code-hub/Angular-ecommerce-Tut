import { Validators } from "@angular/forms";

export const globalValidator = {
  nameValidate:  [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
  emailValidate:  [Validators.required, Validators.email],
  passwordValidate: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
  codeNum: [Validators.required, Validators.pattern(/^[0-9]{1}$/), Validators.maxLength(1)],
}
