import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@core/services';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'dsapp-login-page',
})
export class LoginPageComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    /// if token exist in local store - redirect user
    if (this.tokenService.checkStoredAccessToken()) { this.router.navigate(['/student']); }

    Auth.federatedSignIn()
  }

}
