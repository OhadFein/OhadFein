import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService, UserService } from '@core/services';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'dsapp-after-login-page',
  template: ''
})
export class AfterLoginPageComponent implements OnInit {

  constructor(
    private usersService: UserService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const userExists = await this.usersService.userExists()
    if (!userExists) {
      // Create new user
    }

    this.router.navigate(['/student']);
  }

}
