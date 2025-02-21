import { Component, inject } from '@angular/core';
import { BrandCardComponent } from "../brand-card/brand-card.component";
import { BrandsService } from '../../services/brands.service';
import { Ibrand } from '../../models/ibrand';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent, PaginationComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  private readonly brandsService = inject(BrandsService)
  brands: Ibrand[] = []
  currentPage: number = 1;
  totalPages!: number;
  getBrands() {
    this.brandsService.getBrands(this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.brands = data;
        this.totalPages = numberOfPages;

      }
    })
  }


  getPage(e: number) {
    this.currentPage = e
    this.getBrands()
  }

  ngOnInit(): void {
    this.getBrands();
  }

}
