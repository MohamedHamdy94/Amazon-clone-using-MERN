import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<any>(`/api/orders`);
  }
  deleteOrders(order:any) {
    console.log(order._id);
    return this.http.delete<any>(`/api/orders/${order._id}`,order);
  }
  getInfo() {
    return this.http.get<any>(`/api/orders/summary` );
  }
}
