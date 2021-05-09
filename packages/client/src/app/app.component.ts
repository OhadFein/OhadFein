import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit, HostListener, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BackgroundPosition} from '@core/models/';
import {MenuService, UserService} from '@core/services';
import {environment} from '@environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as selectors from '@store/selectors/user.selectors';
import * as UserAction from '@store/actions/user.actions';
import {Store} from '@ngrx/store';
import {map, mergeMap} from "rxjs/operators";

declare let gtag: any;
declare var $: any;

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
    showModal: boolean = false;
    @ViewChild('myModal') myModal;

    constructor(
        public translate: TranslateService,
        public router: Router,
        public location: Location,
        private menuService: MenuService,
        private modalService: NgbModal,
        private store: Store<any>,
        private userService: UserService
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    @HostListener("window:resize") updateOrientatioState() {
        this.isDesktop = innerWidth > 980;
        if (!this.isDesktop && window.innerHeight < window.innerWidth) {
            this.showModal = true;
            this.state = 'landscape'
        } else {
            this.state = 'portrait'
            this.showModal = false;

        }
    }

    ngOnInit(): void {
        this.updateOrientatioState();
        this.changeBgPosition();
        this.getGeneralInfo();
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

    getGeneralInfo(){
        this.userService.getGeneralInfo().pipe(map((res: any) => {
            const notificationsNumber = res.notifications.filter(n => n.isRead === false).length;
            sessionStorage.setItem('notifications', JSON.stringify(notificationsNumber));
        })).subscribe()
    }

    changeBgPosition() {
        this.backgroundPositionOne = new BackgroundPosition();
        this.backgroundPositionTwo = new BackgroundPosition();
    }

    closeModal() {
        this.showModal = false;

    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

}
