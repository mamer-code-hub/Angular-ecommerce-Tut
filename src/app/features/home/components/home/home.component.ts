import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";
import { RecommededProductsComponent } from "../recommeded-products/recommeded-products.component";
import { BrandsSliderComponent } from "../brands-slider/brands-slider.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { HomeProductsComponent } from "../home-products/home-products.component";
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/models/category';
import { SpecificCategoryProductsComponent } from '../../../products/components/specific-category-products/specific-category-products.component';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-home',
  imports: [ MainSliderComponent, CategoriesSliderComponent, RecommededProductsComponent, BrandsSliderComponent, HomeProductsComponent, SpecificCategoryProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    private readonly categoriesService = inject(CategoriesService)
    catIds:string[] = [];

    getCategoriesIds() {
      this.categoriesService.getCategories().subscribe({
        next: ({ data }) => {
          data.forEach((el:Category)=>{
            this.catIds.push(el._id);
          });
        }
      })
    }

    ngOnInit(): void {
      this.getCategoriesIds();
    }



}
