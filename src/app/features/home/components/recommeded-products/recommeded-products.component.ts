import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { RouterLink } from '@angular/router';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-recommeded-products',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './recommeded-products.component.html',
  styleUrl: './recommeded-products.component.css'
})
export class RecommededProductsComponent implements OnInit {
  recomendedProducts: Iproduct[] = []
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)
  private readonly auth = inject(AuthService)
  private readonly wishService = inject(WishlistService)
  sub: any;

  getRecom() {
    this.productsService.getRecommendedProducts().subscribe({
      next: ({ data }) => {
        this.recomendedProducts = data
      }
    })
  }

  addProductToCart(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {
        this.sub = addToCart(id, this.toaster, this.cartService)
      },
      error: (err) => {
        this.toaster.info('Please login to add products to cart')

      }
    })

  }

    addProductToWish(id: string) {
      this.auth.verifyToken().subscribe({
        next: (res) => {

           this.sub =  addToWish(id, this.toaster, this.wishService)
          
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
    this.getRecom()
  }


}
