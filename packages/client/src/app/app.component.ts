import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BackgroundPosition} from '@core/models/';
import {MenuService} from '@core/services';
import {environment} from '@environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

declare let gtag: any;

@Component({
    selector: 'dsapp-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    state: string;
    route = '';
    subs: Array<Subscription> = [];
    backgroundPositionOne: BackgroundPosition;
    backgroundPositionTwo: BackgroundPosition;
    isDesktop: boolean;

    constructor(
        public translate: TranslateService,
        public router: Router,
        public location: Location,
        private menuService: MenuService
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    @HostListener("window:resize") updateOrientatioState() {

        this.isDesktop = innerWidth > 980;
        if (window.innerHeight > window.innerWidth) {
            this.state = 'portrait'
        } else {
            this.state = 'landscape'
        }
    }

    ngOnInit(): void {
        this.updateOrientatioState();
        this.changeBgPosition();
        this.subs.push(
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    this.changeBgPosition();
                }
                if (event instanceof NavigationEnd) {
                    // sending Google Analitics
                    this.route = location.pathname === '/' ? '' : location.pathname;
                    gtag('config', environment.googleAnalyticsID, {'page_path': event.urlAfterRedirects});

                    // closing menu
                    this.menuService.setMenuOpenState(false);
                }
            })
        );

    }

    changeBgPosition() {
        this.backgroundPositionOne = new BackgroundPosition();
        this.backgroundPositionTwo = new BackgroundPosition();
    }


    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

}
