import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InvalidInputDirective],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder)
  private readonly auth = inject(AuthService)
  private readonly orderService = inject(OrderService)
  private readonly router = inject(ActivatedRoute)
  checkoutForm!: FormGroup;
  isLoading: boolean = false;
  cartId: string = ''
  // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();


  resMsg!: string;

  createForm() {
    this.checkoutForm = this.fb.group({
      city: [null, Validators.required],
      phone: [null, Validators.required],
      details: [null, Validators.required],

    })
  }

  getCartId() {
    this.router.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id')!

      }
    })
  }
  ngOnInit() {

    // this.orderService.verifyLogin()
    redirectToLogin(this.auth)

    this.createForm()
    this.getCartId()
  }
  checkout() {
    // console.log(this.checkoutForm.value);
    if (this.checkoutForm.invalid || this.isLoading) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.orderService.createCheckout(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        window.open(res.session.url, '_blank')

      },
      error: ({ error }) => {
        this.resMsg = error.message
        this.isLoading = false;
      }
    })

  }
}
