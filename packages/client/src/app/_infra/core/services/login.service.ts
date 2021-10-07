import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestResponse, IRestResponse } from '@app/_infra/core/models';
import * as GlobalActions from '@infra/store/actions/global.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  async logout(showMsg = true): Promise<void> {
    this.store.dispatch(GlobalActions.Logout());

    await this.tokenService.deleteStoredTokens();
    if (showMsg) {
      this.alertService.info('LOGIN.LogOutMsg');
    }
    this.router.navigate(['/']);
  }

  afterLoginRoute(): void {
    this.alertService.success('LOGIN.LoginSuccessMsg');
    this.router.navigate(['/student']); // TODO: Smart redirect
  }
}
