
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // console.log("auth token =>", authToken);


    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse)=>{
        console.log("error", error);
        alert(error.error.message)
        return throwError(error)
      })
    );
  }
}
