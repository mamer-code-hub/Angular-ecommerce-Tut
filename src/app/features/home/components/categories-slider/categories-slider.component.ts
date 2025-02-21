import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/models/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { customOptions } from '../../../../shared/helpers/owl.options';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule,RouterLink],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent implements OnInit {
  categories: Category[] = [];
  customOptions: OwlOptions = customOptions
  constructor(private categoriesService: CategoriesService) { }

  getCats() {
    this.categoriesService.getCategories().subscribe({
      next: ({ data }) => {
        this.categories = data
      }
    })
  }

  ngOnInit(): void {
    this.getCats();
    // this.customOptions.margin = 0;
    // this.customOptions.center = false;
  }

}
