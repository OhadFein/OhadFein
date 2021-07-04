import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@core/services';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'dsapp-login-page',
  template: ''
})
export class LoginPageComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  async ngOnInit() {
    /// if token exist - redirect user
    if (await this.tokenService.checkStoredAccessToken()) {
      this.router.navigate(['/student']);
    } else {
      Auth.federatedSignIn();
    }
  }
}
