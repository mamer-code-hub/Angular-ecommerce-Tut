import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { addToCart } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';

@Component({
  selector: 'category-products',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)

  catId!: string | null
  catProds: Iproduct[] = [];
  totalPages!: number;
  currentPage: number = 1
  catName!: string
  auth = inject(AuthService);
  sub: any;
  getCatId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.catId = res.get('id')
        this.getCatProds();

      }
    })
  }

  getCatProds() {
    this.productsService.getSpecificCategoryProds(this.catId as string, 8, this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.catProds = data
        this.catName = this.catProds[0].category['name']
        this.totalPages = numberOfPages;
      }
    })
  }

  getPage(e: number) {
    this.currentPage = e
    this.getCatProds()
  }

  ngOnInit(): void {
    this.getCatId();
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
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
