import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
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
      const loggedInUser = await Auth.currentUserInfo()
      await this.usersService.createNewUser(loggedInUser.attributes.given_name, loggedInUser.attributes.family_name, loggedInUser.attributes.sub)
    }
    this.router.navigate(['/student']);
  }

}
