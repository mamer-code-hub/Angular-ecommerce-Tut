import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../Authentication/services/auth.service';
import { env } from '../../../../environments/environments';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount=new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService) { }


  addProduct(productId: string):Observable<any> {
    return this.http.post(env.BASE_URL + 'cart', {
      productId
    })
  }

  updateProductQuantity(productId: string, count: number):Observable<any> {
    return this.http.put(env.BASE_URL + `cart/${productId}`, {
      count
    })
  }

  getUserCart():Observable<any>  {
   return this.http.get(env.BASE_URL + 'cart')
  }
  removeCartItem(id:string):Observable<any>  {
   return this.http.delete(env.BASE_URL + `cart/${id}`)
  }
  clearCart():Observable<any>  {
    return this.http.delete(env.BASE_URL + 'cart')
  }
}
