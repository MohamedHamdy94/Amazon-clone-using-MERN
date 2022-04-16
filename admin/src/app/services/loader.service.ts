import { Injectable } from '@angular/core';
import {BehaviorSubject , Subject } from 'rxjs';
import { RequestInterceptor } from '../request.interceptor';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public Loading : BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  constructor() { }
  

}
