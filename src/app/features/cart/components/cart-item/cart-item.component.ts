import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart.interfaces';
import { RouterLink } from '@angular/router';
import { NumberFormatPipe } from '../../../../shared/components/pipes/number-format.pipe';

@Component({
  selector: 'app-cart-item',
  imports: [RouterLink, NumberFormatPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  @Input() cartItem: Product = {} as Product;
  @Output() removeCartItem: EventEmitter<string> = new EventEmitter();
  @Output() updateCartQty: EventEmitter<{
    productId: string,
    count: number
  }> = new EventEmitter();


  onRemoveCartItem() {
    this.removeCartItem.emit(this.cartItem.product._id);
  }


  cartCountPlus() {
    this.updateCartQty.emit({
      productId: this.cartItem.product._id,
      count: this.cartItem.count + 1
    })
  }
  cartCountMinus() {
    this.updateCartQty.emit({
      productId: this.cartItem.product._id,
      count: this.cartItem.count - 1
    })
  }



}
