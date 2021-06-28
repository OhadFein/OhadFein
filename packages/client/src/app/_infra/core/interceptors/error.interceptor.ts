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
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (!this.refreshTokenInProgress) {
            // refresh token implementation goes here
            return this.handle401Error(request, next);
          }
          // auto logout if 401 response returned from api and token can't be refreshed
          this.alertService.info('ERRORS.SessionIsExpired');
          const error = err.error.message || err.statusText;
          this.loginService.logout(false);

          return throwError(error);
        }
        const error = err.error.message || err.statusText;

        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.refreshTokenInProgress = true;

    return this.loginService.refreshToken().pipe(
      switchMap(() => {
        this.refreshTokenInProgress = false;

        return next.handle(this.tokenService.addToken(request));
      })
    );
  }
}
