import { AuthserviceService } from './authservice.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService : AuthserviceService
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // console.log("auth token =>", authToken);

    const authRequest = req.clone({
      headers : req.headers.set('Authorization',"Bearer " + authToken) // Authorization name is case sensitive
    })
    return next.handle(authRequest);
  }
}
