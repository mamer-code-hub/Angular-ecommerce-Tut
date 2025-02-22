import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { RelatedProductsComponent } from "../related-products/related-products.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
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
  id!: string | null;
  product: Iproduct = {} as Iproduct;
  relatedProducts: Iproduct[] = [];
  activeImgSrc!: string;
  totalPages!: number;
  currentPage: number = 1;
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



}
