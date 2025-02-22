import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { NumberFormatPipe } from "../../../../shared/components/pipes/number-format.pipe";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NumberFormatPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

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
  
  // Declare intervalId to keep track of the interval
  intervalId: any;

  ngOnInit() {
    this.generateRandomNews();
    this.startNewsInterval();
  }

  ngOnDestroy() {
    // Clean up interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
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
    this.addToCart.emit(this.product._id);
  }
  onAddToWish() {
    this.addToWish.emit(this.product._id);
  }

}
