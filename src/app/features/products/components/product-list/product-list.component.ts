import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/iproduct';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { AuthService } from '../../../Authentication/services/auth.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly wishService = inject(WishlistService)
  private readonly auth = inject(AuthService)
  private readonly toaster = inject(ToastrService)
  sub: any
  products: Iproduct[] = []
  currentPage: number = 1;
  totalPages!: number;
  getProducts() {
    this.productsService.getAllProducts(this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.products = data
        this.totalPages = numberOfPages;
      }
    })
  }
  addProductToCart(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {
        this.sub = addToCart(id, this.toaster, this.cartService)

      }, error: (err) => {
        this.toaster.info('Please login to add products to cart')

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

  ngOnInit(): void {
    this.getProducts()

  }







  getPage(e: number) {
    this.currentPage = e
    this.getProducts()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
