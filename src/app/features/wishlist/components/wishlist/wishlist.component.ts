import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistCardComponent } from "../wishlist-card/wishlist-card.component";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { CartService } from '../../../cart/services/cart.service';
import { Wish } from '../../models/wish.model';
import { RouterLink } from '@angular/router';
import { EmptyWishComponent } from "../empty-wish/empty-wish.component";
import { Subscription } from 'rxjs';
import { redirectToLogin } from '../../../../shared/helpers/redirect';

@Component({
  selector: 'app-wishlist',
  imports: [WishlistCardComponent, EmptyWishComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  private readonly wishService = inject(WishlistService)
  private readonly toatser = inject(ToastrService)
  private readonly auth = inject(AuthService)
  private readonly cartService = inject(CartService)
  sub!: Subscription;
  wishItems: Wish = {} as Wish

  ngOnInit() {
    this.sub = redirectToLogin(this.auth)

    this.getUserWishList();
  }
  getUserWishList() {
    // console.log("object");
    this.sub = this.wishService.getUserWishList().subscribe({
      next: (res) => {
        this.wishItems = res
        this.wishService.wishCount.next(res.count)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeItem(itemId: string) {
    this.wishService.removeWishItem(itemId).subscribe({
      next: (res) => {
        this.wishService.wishCount.next(res.data.length)

        this.toatser.info("Removed From Wish List", '')
      },
      error: (err) => {
        this.toatser.error("Error In Removing From Wish List", '')

      }
    })
  }

  addProductToCart(id: string) {
    this.sub = addToCart(id, this.toatser, this.cartService)
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
