import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getRecommendedProducts(): Observable<any> {
    return this.httpClient.get(env.BASE_URL + `products?limit=8&sort=-ratingsAverage`)
  }

  getAllProducts(page: number): Observable<any> {
    return this.httpClient.get(env.BASE_URL + `products?page=${page}&limit=8`)
  }

  getProductDetails(id: string): Observable<any> {
    return this.httpClient.get(env.BASE_URL + `products/${id}`)
  }


  getRelatedProducts(catId: string, page: number): Observable<any> {
    return this.httpClient.get(env.BASE_URL + `products?category[in]=${catId}&page=${page}&limit=8`)
  }

  getSpecificCategoryProds(catId: string, limit: number = 15, page: number = 1): Observable<any> {
    return this.httpClient.get(env.BASE_URL + `products?category[in]=${catId}&limit=${limit}&page=${page}`)
  }

  getBrandsProducts(brandId: string, limit: number = 15, page: number): Observable<any>{
    return this.httpClient.get(env.BASE_URL + `products?brand=${brandId}&limit=${limit}&page=${page}`)

  }
}
