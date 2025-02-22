import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../models/cart.interfaces';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Subscription } from 'rxjs';
import { CartEmptyComponent } from "../cart-empty/cart-empty.component";

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent, RouterLink, CartEmptyComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private readonly cartService = inject(CartService)
  private readonly auth = inject(AuthService)
  cartItems: Cart = {} as Cart
  sub!: Subscription
  ngOnInit() {
    this.sub = redirectToLogin(this.auth)
    this.getUserCart()
  }



  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res;
      },
      error: (err) => {
        // console.log(err)
      }
    })



  }

  removeItem(itemId: string) {
    this.cartService.removeCartItem(itemId).subscribe({
      next: (res) => {
        this.cartItems = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateQty(e: { productId: string; count: number; }) {
    this.cartService.updateProductQuantity(e.productId, e.count).subscribe({
      next: (res) => {
        this.cartItems = res
      }
    })
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.getUserCart()
        }
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
