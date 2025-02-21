import { Component, inject } from '@angular/core';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { addToCart } from '../../../../shared/helpers/operations';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../Authentication/services/auth.service';

@Component({
  selector: 'app-brand-products',
  imports: [PaginationComponent, ProductCardComponent],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css'
})
export class BrandProductsComponent {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly productsService = inject(ProductsService)
  private readonly toaster = inject(ToastrService)
  private readonly auth = inject(AuthService)
  brandId!: string | null
  brandProds: Iproduct[] = [];
  totalPages!: number;
  currentPage: number = 1
  brandName!: string
  sub: any;
  getBrandId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.brandId = res.get('id')
        this.getBrandProds();

      }
    })
  }

  getBrandProds() {
    this.productsService.getBrandsProducts(this.brandId as string, 8, this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.brandProds = data
        this.brandName = this.brandProds[0].brand['name']
        this.totalPages = numberOfPages;
      }
    })
  }

  getPage(e: number) {
    this.currentPage = e
    this.getBrandProds()
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



  ngOnInit(): void {
    this.getBrandId();
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
