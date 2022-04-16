import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  deleteuser(data:any ) {
    console.log(data)
    return this.http.delete<any>(`/api/users/${data._id}`);
  }
  getusers() {
    return this.http.get<any>(`/api/users`);
  }

  userInfo(order:any){
    console.log(order)
    return this.http.get<any>(`/api/users/${order.user}`)
  }
}
