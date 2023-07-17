import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // apiUrl = 'http://localhost:5000';

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
  getProduct() {
    return this.http.get<any>(`/api/products`);
  }
  postProduct(data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('countInStock', data.countInStock);
    formData.append('brand', data.brand);
    // formData.append('rating', data.rating);
    formData.append('description', data.description);
    return this.http.post<any>('/api/products/add', formData);
  }
  putProduct(data: any, editdata: any, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('countInStock', data.countInStock);
    formData.append('brand', data.brand);
    formData.append('rating', data.rating);
    formData.append('description', data.description);
    return this.http.put<any>(`/api/products/${editdata._id}`, formData);
  }
  deleteProduct(data: any) {
    return this.http.delete<any>(`/api/products/${data._id}`, data);
  }
}
