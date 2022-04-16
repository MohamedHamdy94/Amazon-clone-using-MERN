import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  IsLogin() {
    return localStorage.getItem('token') != null;
  }
  login(email: any, password: any) {
    return this.http.post('/api/admin', { email, password });
  }
  getToken() {
    return localStorage.getItem('token') || '';
  }
}
