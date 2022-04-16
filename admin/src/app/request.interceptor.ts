import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { LoaderService } from './services/loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.auth.getToken();

    console.log(token);
    let jwtToken = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
       this.loaderService.Loading.next(true);
    return next.handle(jwtToken).pipe(
      finalize(() =>
        this.loaderService.Loading.next(false) )
    );

    // return next.handle(request);
  }
}
