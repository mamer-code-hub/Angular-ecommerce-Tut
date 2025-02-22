import { Component, inject } from '@angular/core';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductsService } from '../../../products/services/products.service';
import { BrandCardComponent } from "../../../brands/components/brand-card/brand-card.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { AuthService } from '../../../Authentication/services/auth.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-home-products',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent {
  Products: Iproduct[] = []
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)
  private readonly auth = inject(AuthService)
  private readonly wishService = inject(WishlistService)
  sub: any;

  getProducts() {
    this.productsService.getAllProducts(1).subscribe({
      next: ({ data }) => {
        this.Products = data.slice(0, 8)
        // console.log(this.Products);
      }
    })
  }

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

  ngOnInit(): void {
    this.getProducts()
  }
}
