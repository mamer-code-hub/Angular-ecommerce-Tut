import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AuthService } from './features/Authentication/services/auth.service';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CartService } from './features/cart/services/cart.service';
import { WishlistService } from './features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sub: any;
  constructor(private spinner: NgxSpinnerService) { }
  private readonly auth = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishService = inject(WishlistService)

  ngOnInit() {
    this.auth.verifyToken().subscribe({
      next: () => {
        this.auth.isLoggedIn.next(true)
        // this.auth.navigateToHome()
        this.getUserCart()
        this.getUserWishList()
      },
      error: () => {
        this.auth.isLoggedIn.next(false)
        // this.auth.navigateToHome()

      }
    })
  }

  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems)
      },
      error: (err) => {
        // console.log(err)
      }
    })



  }

  getUserWishList() {
    // console.log("object");
    this.sub = this.wishService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishService.wishCount.next(res.count)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
