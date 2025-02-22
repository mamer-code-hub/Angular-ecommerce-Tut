import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { wishProds } from '../../models/wish.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-card',
  imports: [CurrencyPipe, RouterLink,SlicePipe],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.css'
})
export class WishlistCardComponent {

  constructor() { }
  @Input() wishItem: wishProds = {} as wishProds;
  @Output() removeWishItem: EventEmitter<string> = new EventEmitter();

  @Output() addToCart = new EventEmitter<string>();

  onAddToCart() {
    this.addToCart.emit(this.wishItem._id);
  }

  onRemoveWishItem() {
    this.removeWishItem.emit(this.wishItem._id);
  }


}
