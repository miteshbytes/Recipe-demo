import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string = '';
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = localStorage.getItem('token') || '';  // check Token exist or not..!

    // If User authenticate then set params on url ?auth=token
    if (this.token) {
      request = request.clone({
        params: new HttpParams()
          .set('auth', this.token),
      });
    }

    return next.handle(request);
  }
}
