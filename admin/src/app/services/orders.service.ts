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
    return this.http.get<any>(`/api/orders/adminsummary`);
  }
  notDeliverd(data:any){
    return this.http.put<any>(`/api/orders/notDeliverd/${data._id}`,data);

  }
  deliverd(data:any){
    return this.http.put<any>(`/api/orders/deliverd/${data._id}`,data);

  }
  getOrder(id:any){
    return this.http.get<any>(`/api/orders/${id}`);

  }
}
