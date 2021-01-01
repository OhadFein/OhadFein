import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit, HostListener, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BackgroundPosition} from '@core/models/';
import {MenuService} from '@core/services';
import {environment} from '@environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
        private modalService: NgbModal
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

    closeModal() {
        this.showModal = false;

    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }

}
