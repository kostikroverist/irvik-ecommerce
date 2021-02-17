import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // * start urls for fake REST API
  // private url = 'http://localhost:3000/categories';
  // * end urls for fake REST API

  // * start urls for spring REST API
  // private url = 'http://localhost:5000/api/test/categories';
  // private getCategoriesUrl = 'http://localhost:5000/api/categories';
  private url = 'http://irvik-env.eba-y4umewgk.us-east-2.elasticbeanstalk.com/api/test/categories';
  private getCategoriesUrl = 'http://irvik-env.eba-y4umewgk.us-east-2.elasticbeanstalk.com/api/categories';
  // * end urls for spring REST API

  public lang = new Subject<string>();
  constructor(private http: HttpClient) { }

  // * start methods for fake REST API
  // getCategories(): Observable<ICategory[]> {
  //   return this.http.get<ICategory[]>(this.url);
  // }
  // postCategory(body: ICategory): Observable<ICategory> {
  //   return this.http.post<ICategory>(this.url, body);
  // }
  // updateCategory(body: ICategory): Observable<ICategory> {
  //   return this.http.put<ICategory>(`${this.url}/${body.id}`, body);
  // }
  // deleteCategory(id: number | string): Observable<void> {
  //   return this.http.delete<void>(`${this.url}/${id}`);
  // }
  // * end methods for fake REST API


  // * start methods for spring REST API
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.getCategoriesUrl);
  }
  postCategory(body: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, body, {
      headers: {
        Authorization: 'testToken',
      },
    });
  }

  updateCategory(body: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${body.id}`, body, {
      headers: {
        Authorization: 'testToken',
      },
    });
  }

  deleteCategory(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, {
      headers: {
        Authorization: 'testToken',
      },
    });
  }
  // * end methods for spring REST API

}
