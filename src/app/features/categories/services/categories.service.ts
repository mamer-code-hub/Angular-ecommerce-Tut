import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(env.BASE_URL + 'categories');
  }


  getSpecificCategoryProds(catId:string,limit:number=15 , page:number=1): Observable<any> {
    return this.httpClient.get(env.BASE_URL +`products?category[in]=${catId}&limit=${limit}&page=${page}`)
  }

}
