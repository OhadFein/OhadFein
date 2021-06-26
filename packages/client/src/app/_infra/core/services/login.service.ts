import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestResponse, IRestResponse } from '@app/_infra/core/models';
import * as GlobalActions from '@infra/store/actions/global.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlertService } from './alert.service';
import { BaseRestService } from './base-rest.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private store: Store<any>,
    private tokenService: TokenService,
    private baseRestService: BaseRestService
  ) {}

  login({ email, password }) {
    this.store.dispatch(GlobalActions.Logout());
    this.baseRestService
      .post<AuthRestResponse>('login', { email, password })
      .subscribe(
        (res) => {
          if (res.success) {
            this.tokenService.storeTokens(res.data);
            this.afterLoginRoute();
          } else if (!res.success && res.message) {
            const errorStr = `${res.message}`;
            this.alertService.error(errorStr);
          } else {
            this.alertService.error('LOGIN.LoginFailedMsg');
          }
        },
        () => {
          this.alertService.error('LOGIN.LoginFailedMsg');
        }
      );
  }

  loginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (res) => {
        console.log('FACEBOOK LOGIN: ', res);
      },
      () => {
        this.alertService.error('LOGIN.LoginFailedMsg');
      }
    );
  }

  logout(showMsg = true) {
    this.store.dispatch(GlobalActions.Logout());

    this.tokenService.deleteStoredTokens();
    if (showMsg) {
      this.alertService.info('LOGIN.LogOutMsg');
    }
    this.router.navigate(['/login']);
  }

  afterLoginRoute() {
    this.alertService.success('LOGIN.LoginSuccessMsg');
    this.router.navigate(['/student']); // TODO: Smart redirect
  }

  forgotPassword({ email }): Observable<IRestResponse> {
    return this.baseRestService.post<IRestResponse>('forgot', { email });
  }

  validateResetToken(token: string): Observable<IRestResponse> {
    return this.baseRestService.get<IRestResponse>(`reset/${token}`);
  }

  refreshToken() {
    const refreshToken = this.tokenService.getStoredRefreshToken();

    return this.baseRestService
      .post<AuthRestResponse>(`refreshToken/${refreshToken}`, {})
      .pipe(
        tap((res) => {
          if (res.success) {
            this.tokenService.storeTokens(res.data);
          } else if (!res.success && res.message) {
            const errorStr = `${res.message}`;
            this.alertService.error(errorStr);
          } else {
            this.alertService.error('LOGIN.LoginFailedMsg');
          }
        })
      );
  }
}
