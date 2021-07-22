import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { ConfigurationService, MenuService, UserService } from '@core/services';
import { BackgroundPosition, BuildType } from '@core/models/';

declare let gtag: any;
declare let $: any;

@Component({
  selector: 'dsapp-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 80%;
        border-radius: 25px 0px 0px 0px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .sidenav-menu-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eaeaea;
        font-size: medium !important;
      }

      .sidenav-menu-text {
        font-family: Poppins;
        font-style: normal;
        font-size: small !important;
      }

      .sidenav-menu-item {
        padding: 0 25px !important;
      }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  state: string;
  route = '';
  subs: Array<Subscription> = [];
  backgroundPositionOne: BackgroundPosition;
  backgroundPositionTwo: BackgroundPosition;
  isDesktop: boolean;
  showModal: boolean = false;
  @ViewChild('myModal') myModal;

  constructor(
    public translate: TranslateService,
    public router: Router,
    public location: Location,
    private menuService: MenuService,
    private modalService: NgbModal,
    private store: Store<any>,
    private userService: UserService,
    private confifurationService: ConfigurationService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  @HostListener('window:resize') updateOrientationState() {
    this.isDesktop = innerWidth > 980;
    if (!this.isDesktop && window.innerHeight < window.innerWidth) {
      this.showModal = true;
      this.state = 'landscape';
    } else {
      this.state = 'portrait';
      this.showModal = false;
    }
  }

  ngOnInit(): void {
    this.updateOrientationState();
    this.changeBgPosition();
    // this.getGeneralInfo();
    this.configureAmplifyAuth();
    this.subs.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.changeBgPosition();
        }
        if (event instanceof NavigationEnd) {
          // sending Google Analitics
          this.route = location.pathname === '/' ? '' : location.pathname;
          gtag('config', environment.googleAnalyticsID, { page_path: event.urlAfterRedirects });

          // closing menu
          this.menuService.setMenuOpenState(false);
        }
      })
    );
  }
  configureAmplifyAuth() {
    const domain: string =
      this.confifurationService.getBuildType() === BuildType.DEV
        ? 'http://localhost:4200/'
        : 'https://dev.danskill.com/';
    Amplify.configure({
      Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_9IvsJvKAY',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '5viisfon23qk9d0ummirte9nrc',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: 'auth.danskill.com',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: domain + 'afterLogin',
          redirectSignOut: domain,
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    });
  }

  // TODO: unfinished work, part of notification task
  // getGeneralInfo() {
  //   this.userService
  //     .getGeneralInfo()
  //     .pipe(
  //       map((res: any) => {
  //         const notificationsNumber = res.notifications.filter((n) => n.isRead === false).length;
  //         sessionStorage.setItem('notifications', JSON.stringify(notificationsNumber));
  //       })
  //     )
  //     .subscribe();
  // }

  changeBgPosition() {
    this.backgroundPositionOne = new BackgroundPosition();
    this.backgroundPositionTwo = new BackgroundPosition();
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
