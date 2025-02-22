import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { NumberFormatPipe } from "../../../../shared/components/pipes/number-format.pipe";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NumberFormatPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Iproduct = {} as Iproduct;
  @Output() addToCart = new EventEmitter<string>();
  @Output() addToWish = new EventEmitter<string>();

  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }
  onAddToWish() {
    this.addToWish.emit(this.product._id);
  }



}
