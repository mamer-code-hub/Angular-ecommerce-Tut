import { Component, OnInit } from '@angular/core';
import { Ibrand } from '../../../brands/models/ibrand';
import { BrandsService } from '../../../brands/services/brands.service';
import { BrandCardComponent } from "../../../brands/components/brand-card/brand-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-slider',
  imports: [BrandCardComponent, CarouselModule,RouterLink],
  templateUrl: './brands-slider.component.html',
  styleUrl: './brands-slider.component.css'
})
export class BrandsSliderComponent implements OnInit {
  brands: Ibrand[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private brandsService: BrandsService) { }

  getBrands() {
    this.brandsService.getBrands(1).subscribe({
      next: ({ data }) => {
        this.brands = data.slice(0,9);
      }
    })
  }

  ngOnInit(): void {
    this.getBrands();
  }
}
