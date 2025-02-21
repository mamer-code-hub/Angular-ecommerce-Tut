import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly route = inject(Router)
  codeForm!: FormGroup;
  isLoading: boolean = false;
  resMsg!:string
  createCodeForm() {
    this.codeForm = this.fb.group({
      codeNum1: ['', globalValidator.codeNum],
      codeNum2: ['', globalValidator.codeNum],
      codeNum3: ['', globalValidator.codeNum],
      codeNum4: ['', globalValidator.codeNum],
      codeNum5: ['', globalValidator.codeNum],
      codeNum6: ['', globalValidator.codeNum],
    })
  }

  verifyCode(){
    if (this.codeForm.invalid || this.isLoading) {
      this.codeForm.markAllAsTouched();
      return;
    }
    this.isLoading = true
    const code = this.codeForm.value;
    let codeToSend: string=''
    for (const [keys,num] of Object.entries(code)) {
      codeToSend += num;
    }
    this.authService.verifyResetCode(codeToSend).subscribe({
      next: (res) => {
        this.isLoading = false
        this.resMsg = res.status;

        setTimeout(()=>{
          this.route.navigate(['/resetPassword']);
        },1500)


      },
      error: ({ error }) => {
        this.isLoading = false
        this.resMsg = error.message

      }
    })

  }

  ngOnInit(): void {
    this.createCodeForm()
    // console.log(this.codeForm);

  }
}
