import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

import { catchError, filter, finalize, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

import { UserService } from '@core/services';

interface IAmplifyInfo {
  id: string | undefined;
  username: string;
  attributes: any;
}

@Component({
  selector: 'dsapp-after-login-page',
  template: ''
})
export class AfterLoginPageComponent implements OnInit {
  constructor(private usersService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.usersService
      .userExists()
      .pipe(
        finalize(() => this.router.navigate(['/student'])),
        filter((isUserExist: boolean) => !isUserExist),
        switchMap(() => {
          return fromPromise(Auth.currentUserInfo()).pipe(
            filter((loggedInUser) => this.isAmplifyInfo(loggedInUser)),
            map((loggedInUser: IAmplifyInfo) => [this.extractUserName(loggedInUser), loggedInUser]),
            switchMap(([username, loggedInUser]: [string, IAmplifyInfo]) =>
              this.usersService
                .createNewUser(username, loggedInUser.attributes.sub)
                .pipe(catchError((error: any) => this.handleError(error?.message)))
            ),
            catchError((error: any) => this.handleError(error?.message))
          );
        }),
        catchError((error: any) => this.handleError(error?.message))
      )
      .subscribe();
  }

  extractUserName(loggedInUser: IAmplifyInfo): string {
    const email: string | undefined = loggedInUser.attributes.email;

    return email?.split('@')[0];
  }

  private isAmplifyInfo(user: IAmplifyInfo | {} | null): user is IAmplifyInfo {
    return 'username' in user;
  }

  private handleError(error: string): Promise<any> {
    console.log(error);
    console.log('Failed after login logic');

    return Auth.signOut();
  }
}
