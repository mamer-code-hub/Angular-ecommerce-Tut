import { Component, inject, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../../../cart/services/cart.service';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-related-products',
  imports: [ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  @Input() relatedProds: Iproduct[] = []
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)
  private readonly auth = inject(AuthService)
  private readonly wishService = inject(WishlistService)
  sub: any;

  addProductToCart(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {
        this.sub = addToCart(id, this.toaster, this.cartService)
      },
      error: (err) => {
        this.toaster.warning('Please login to add products to cart')

      }
    })


  }
  addProductToWish(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {

        this.sub = addToWish(id, this.toaster, this.wishService)

      },
      error: (err) => {
        this.toaster.info('Please login to add products to wishlist')

      }
    })
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
