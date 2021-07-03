import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BackgroundPosition, BuildType } from '@core/models/';
import { ConfigurationService, MenuService, UserService } from '@core/services';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as selectors from '@store/selectors/user.selectors';
import * as UserAction from '@store/actions/user.actions';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import Amplify from 'aws-amplify';

declare let gtag: any;
declare var $: any;

@Component({
  selector: 'dsapp-root',
  templateUrl: './app.component.html',
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

  @HostListener('window:resize') updateOrientatioState() {
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
    this.updateOrientatioState();
    this.changeBgPosition();
    this.getGeneralInfo();
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
          domain: 'danskill.auth.eu-west-1.amazoncognito.com',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn:
            this.confifurationService.getBuildType() === BuildType.DEV
              ? 'http://localhost:4200/afterLogin'
              : 'https://dev.danskill.com/afterLogin',
          redirectSignOut:
            this.confifurationService.getBuildType() === BuildType.DEV
              ? 'http://localhost:4200/'
              : 'https://dev.danskill.com/',
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    });
  }

  getGeneralInfo() {
    this.userService
      .getGeneralInfo()
      .pipe(
        map((res: any) => {
          const notificationsNumber = res.notifications.filter((n) => n.isRead === false).length;
          sessionStorage.setItem('notifications', JSON.stringify(notificationsNumber));
        })
      )
      .subscribe();
  }

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
