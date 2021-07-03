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
    try {
      const userExists = await this.usersService.userExists()
      if (!userExists) {
        const loggedInUser = await Auth.currentUserInfo()
        const username = this.extractUserName(loggedInUser)
        await this.usersService.createNewUser(username, loggedInUser.attributes.sub)
      }
    }
    catch (error) {
      console.log("Failed after login logic")
      await Auth.signOut()
    }
    this.router.navigate(['/student']);
  }
  extractUserName(loggedInUser) {
    const cognitoUsername: string= loggedInUser.username
    if (cognitoUsername.includes("facebook")) {
      return loggedInUser.attributes.given_name.toLowerCase() + loggedInUser.attributes.family_name.toLowerCase()
    }
    return cognitoUsername
  }

}
