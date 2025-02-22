import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './../../../../environments/environments.prod';
import { AuthService } from '../../Authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient,private auth:AuthService) { }


  addProduct(productId: string): Observable<any> {
    return this.http.post(env.BASE_URL + 'wishlist', {
      productId
    })
  }

  getUserWishList(): Observable<any> {
    return this.http.get(env.BASE_URL + 'wishlist')
  }
  removeWishItem(id: string): Observable<any> {
    return this.http.delete(env.BASE_URL + `wishlist/${id}`)
  }
}
