import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { NumberFormatPipe } from "../../../../shared/components/pipes/number-format.pipe";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NumberFormatPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  [x: string]: any;

  @Input() product: Iproduct = {} as Iproduct;
  @Output() addToCart = new EventEmitter<string>();
  @Output() addToWish = new EventEmitter<string>();

  newsItems = [
    { text: "New Sale Starting Soon!", icon: "fa-solid fa-gift" },
    { text: "Limited Stock, Hurry Up!", icon: "fa-solid fa-exclamation-circle" },
    { text: "Special Discount Today Only!", icon: "fa-solid fa-percent" },
    { text: "Exclusive Offer for You!", icon: "fa-solid fa-star" },
    { text: "Don't Miss Our Latest Products!", icon: "fa-solid fa-box" }
  ];

  randomNewsItems: Array<{ text: string, icon: string }> = [];
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    // Validate product input
    if (!this.product || !this.product._id) {
      return;
    }

    // Run interval logic only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.generateRandomNews();
      this.startNewsInterval();
    }
  }

  ngOnDestroy() {
    // Clean up interval to prevent memory leak, only if running on the browser
    if (this.intervalId && isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
      console.log('Interval cleared');
    }
  }

  startNewsInterval() {
      this.intervalId = setInterval(() => {
        this.generateRandomNews();
      }, 5000); // Change news every 5 seconds
  }

  generateRandomNews() {
      this.randomNewsItems = [];
      const randomIndexes = Array.from({ length: 3 }, () => Math.floor(Math.random() * this.newsItems.length));

      randomIndexes.forEach(index => {
        this.randomNewsItems.push(this.newsItems[index]);
      });
  }

  onAddToCart() {
    if (this.product && this.product._id) {
      this.addToCart.emit(this.product._id);
    }
  }

  onAddToWish() {
    if (this.product && this.product._id) {
      this.addToWish.emit(this.product._id);
    }
  }
}
