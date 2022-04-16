import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private http: HttpClient,private auth : AuthService) {}

  // apiUrl = 'http://localhost:5000';

  getProduct() {
    return this.http.get<any>(`/api/products`);
  }
  postProduct(data: any) {
    return this.http.post<any>('/api/products/add', data);
  }
  putProduct(data:any,id:any ) {
    return this.http.put<any>(`/api/products/${id}`,data);

  }
  deleteProduct(data:any ) {
    return this.http.delete<any>(`/api/products/${data._id}`,data);
  }
}
