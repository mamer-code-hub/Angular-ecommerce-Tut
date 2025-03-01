import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { RelatedProductsComponent } from "../related-products/related-products.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../Authentication/services/auth.service';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { NumberFormatPipe } from '../../../../shared/components/pipes/number-format.pipe';

@Component({
  selector: 'app-product-details',
  imports: [RelatedProductsComponent, PaginationComponent, NumberFormatPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private readonly routes = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toaster = inject(ToastrService)
  private readonly wishService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  private readonly auth = inject(AuthService)
  id!: string | null;
  product: Iproduct = {} as Iproduct;
  relatedProducts: Iproduct[] = [];
  activeImgSrc!: string;
  totalPages!: number;
  currentPage: number = 1;
  sub: any;
  getProductId() {
    this.routes.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')
        this.getDetails(this.id as string);

      }
    })
  }


  getDetails(prodId:string) {
    this.productsService.getProductDetails(prodId).subscribe({
      next: ({ data }) => {
        this.product = data
        console.log(this.product);
        this.getRelatedProducts();

      }
    })
  }

  getRelatedProducts() {
    this.productsService.getRelatedProducts(this.product.category._id,this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.relatedProducts = data
        this.totalPages = numberOfPages;


      }
    })
  }

addProductToCart() {
  this.auth.verifyToken().subscribe({

      next: (res) => {

      this.sub = addToCart(this.product._id, this.toaster, this.cartService)

      }, error: (err) => {
        this.toaster.info('Please login to add products to cart')

      }
    })
  }
  addProductToWish() {
    this.auth.verifyToken().subscribe({
      next: (res) => {

        this.sub = addToWish(this.product._id, this.toaster, this.wishService)

      },
      error: (err) => {
        this.toaster.info('Please login to add products to wishlist')

      }
    })
  }











  activeImg(e: MouseEvent) {
    const target = e.target as HTMLImageElement;
    this.activeImgSrc = target.src;

  }

  getPage(e: number) {
    this.currentPage = e
    this.getRelatedProducts()
  }

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
