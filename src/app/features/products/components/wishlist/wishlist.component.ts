import { Component, inject } from '@angular/core';
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private readonly auth = inject(AuthService)
    ngOnInit() {
         redirectToLogin(this.auth)

    }

}
