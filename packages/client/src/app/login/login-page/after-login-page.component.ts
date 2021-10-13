import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Angulartics2 } from 'angulartics2';

import { catchError, filter, finalize, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

import { UserService, TokenService } from '@core/services';
import { UserDto } from '@danskill/contract';

interface IAmplifyInfo {
  id: string | undefined;
  username: string;
  attributes: any;
}

enum IDProvider {
  Google = 'Google',
  Facebook = 'Facebook',
  Manual = 'Manual'
}
@Component({
  selector: 'dsapp-after-login-page',
  template: ''
})
export class AfterLoginPageComponent implements OnInit {
  constructor(
    private usersService: UserService,
    private router: Router,
    private angulartics2: Angulartics2,
    private tokenService: TokenService
  ) {}

  async ngOnInit(): Promise<void> {
    this.usersService
      .userExists()
      .pipe(
        finalize(() => this.finalizeLogin()),
        filter((isUserExist: boolean) => !isUserExist),
        switchMap(() => {
          return fromPromise(Auth.currentUserInfo()).pipe(
            filter((loggedInUser) => this.isAmplifyInfo(loggedInUser)),
            map((loggedInUser: IAmplifyInfo) => [this.extractSlug(loggedInUser), loggedInUser]),
            switchMap(([username, loggedInUser]: [string, IAmplifyInfo]) => {
              this.angulartics2.eventTrack.next({
                action: 'Sign Up',
                properties: { id_provider: this.getIdProvider(loggedInUser) }
              });

              return this.usersService
                .createNewUser(
                  username,
                  loggedInUser.attributes.sub,
                  loggedInUser.attributes.email,
                  loggedInUser.attributes.given_name,
                  loggedInUser.attributes.family_name
                )
                .pipe(catchError((error: any) => this.handleError(error?.message)));
            }),
            catchError((error: any) => this.handleError(error?.message))
          );
        }),
        catchError((error: any) => this.handleError(error?.message))
      )
      .subscribe();
  }

  private finalizeLogin(): void {
    this.usersService
      .getUser()
      .pipe(
        map((user: UserDto) => {
          this.tokenService.setUser(user.slug);
        })
      )
      .subscribe();

    this.router.navigate(['/student']);
  }

  getIdProvider(loggedInUser: IAmplifyInfo): IDProvider {
    if (loggedInUser.username.startsWith('google')) {
      return IDProvider.Google;
    }
    if (loggedInUser.username.startsWith('facebook')) {
      return IDProvider.Facebook;
    }

    return IDProvider.Manual;
  }

  extractSlug(loggedInUser: IAmplifyInfo): string {
    // const email: string | undefined = loggedInUser.attributes.email;
    let slug = '';

    if (loggedInUser.attributes.given_name) {
      slug = (loggedInUser.attributes.given_name as string).trim();
    }
    if (loggedInUser.attributes.family_name) {
      if (loggedInUser.attributes.given_name) slug += '-';
      slug += (loggedInUser.attributes.family_name as string).trim();
    }
    if (!slug) slug = loggedInUser.attributes.email.split('@')[0];

    return slug;
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
