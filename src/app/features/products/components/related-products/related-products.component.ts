import { Component, inject, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../../../cart/services/cart.service';
import { addToCart } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';

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
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
