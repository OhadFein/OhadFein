import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoginService, TokenService } from '@core/services/';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      const error = err.error.message || err.statusText;
      return throwError(error);

    }));
  }


}
