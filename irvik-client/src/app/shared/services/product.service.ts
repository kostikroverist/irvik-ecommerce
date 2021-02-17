import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵresolveBody } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // * start urls for fake REST API
  // private url = 'http://localhost:3000/products';
  // * end urls for fake REST API

  // * start urls for spring REST API
  // private url = 'http://localhost:5000/api/test/products';
  // private getProductsUrl = 'http://localhost:5000/api/products';
  // private searchUrl = 'http://localhost:5000/api/searchByfullText';
  private url = 'http://irvik-env.eba-y4umewgk.us-east-2.elasticbeanstalk.com/api/test/products';
  private getProductsUrl = 'http://irvik-env.eba-y4umewgk.us-east-2.elasticbeanstalk.com/api/products';
  private searchUrl = 'http://irvik-env.eba-y4umewgk.us-east-2.elasticbeanstalk.com/api/searchByfullText';
  // * end urls for spring REST API

  constructor(private http: HttpClient) { }

  // * start methods for fake REST API
  // getProducts(): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(this.url);
  // }
  // postProduct(body: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(this.url, body);
  // }
  // updateProduct(body: IProduct): Observable<IProduct> {
  //   return this.http.put<IProduct>(`${this.url}/${body.id}`, body);
  // }
  // deleteProduct(id: number | string): Observable<void> {
  //   return this.http.delete<void>(`${this.url}/${id}`);
  // }
  // getProductById(id: string): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.url}/${id}`);
  // }
  // * end methods for fake REST API

  // * start methods for spring REST API
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getProductsUrl);
  }
  postProduct(body: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, body);
  }
  updateProduct(body: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${body.id}`, body);
  }
  deleteProduct(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getFullTextSearchProducts(searchName: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.searchUrl}/${searchName}`);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.getProductsUrl}/${id}`);
  }
  // * end methods for spring REST API

}
