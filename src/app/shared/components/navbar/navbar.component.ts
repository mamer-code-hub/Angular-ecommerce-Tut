import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private wishService = inject(WishlistService)
  private translationService = inject(TranslationService)
  isAuthenticated!: boolean;
  cartItemsCount!: number;
  wishItemsCount!: number;

  isAuth() {
    this.authService.isLoggedIn.subscribe({
      next: (value) => {
        this.isAuthenticated = value
        // this.getUserCart()

      }
    });
  }

  ngOnInit() {
    this.isAuth()
    this.cartService.cartCount.subscribe({
      next: (value) => {
        this.cartItemsCount = value
      }
    })
    this.wishService.wishCount.subscribe({
      next: (value) => {
        this.wishItemsCount = value
      }
    })

    // this.getUserCart()



  }




  logout() {
    this.authService.logout()
    this.authService.isLoggedIn.next(false)
  }





}
