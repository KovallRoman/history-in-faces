import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthHttpService } from './auth-http.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthHttpService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    if (token) {
      request = request.clone({
        setHeaders: { token: token },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
        return throwError(err);
      }),
    )
  }
}
