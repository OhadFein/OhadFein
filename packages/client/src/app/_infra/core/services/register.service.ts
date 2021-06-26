import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestResponse, UserRegistrationData } from '@core/models';

import { AlertService } from './alert.service';
import { BaseRestService } from './base-rest.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  REST_URL = '';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService,
    private baseRestService: BaseRestService
  ) {}

  register(user: UserRegistrationData) {
    this.baseRestService.post<AuthRestResponse>('signup', user).subscribe(
      (res) => {
        if (res.success) {
          this.tokenService.storeTokens(res.data);
          this.afterLoginRoute();
        } else if (!res.success && res.message) {
          const errorStr = `${res.message}`;
          this.alertService.error(errorStr);
        } else {
          this.alertService.error('LOGIN.RegistrationFailedMsg');
        }
      },
      () => {
        this.alertService.error('LOGIN.RegistrationFailedMsg');
      }
    );
  }

  afterLoginRoute() {
    this.alertService.success('LOGIN.RegisterSuccessMsg');
    this.router.navigate(['/student']); // TODO: smart redirect
  }

  changePassword({ password, confirmPassword }, token: string) {
    const payload = { password, confirm: confirmPassword };

    this.baseRestService
      .post<AuthRestResponse>(`reset/${token}`, payload)
      .subscribe(
        (res) => {
          if (res.success) {
            this.tokenService.storeTokens(res.data);
            this.afterLoginRoute();
          } else if (!res.success && res.message) {
            const errorStr = `${res.message}`;
            this.alertService.error(errorStr);
          } else {
            this.alertService.error('ERRORS.GeneralBackendError');
          }
        },
        () => {
          this.alertService.error('ERRORS.GeneralBackendError');
        }
      );
  }
}
