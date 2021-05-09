import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MenuData, MenuItemFunction} from '@core/models/';
import {AlertService, LoginService, MenuService} from '@core/services/';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AboutDanskillModalComponent} from '@ui/about-danskill-modal/about-danskill-modal.component';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Component({
    selector: 'ui-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    @Input() menuData: MenuData;

    menuIsOpen$: Observable<boolean>;
    deferredPrompt: any;
    showAddToHomeButton = false;
    public notificationsNUmber: number;

    constructor(
        private loginService: LoginService,
        private modalService: NgbModal,
        private alertService: AlertService,
        private menuService: MenuService,
        private location: Location
    ) {
        this.notificationsNUmber = JSON.parse(sessionStorage.getItem('notifications'));
    }

    @HostListener('window:beforeinstallprompt', ['$event'])
    onbeforeinstallprompt(e) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        this.showAddToHomeButton = true;
    }

    ngOnInit() {
        this.menuIsOpen$ = this.menuService.menuOpenState$;
    }

    backButtonHandler() {
        this.location.back();
    }

    toggleMenu() {
        this.menuService.toggleMenuOpenState();
    }

    closeMenu() {
        this.menuService.setMenuOpenState(false);
    }

    menuItemFunction(fType: MenuItemFunction) {
        switch (fType) {
            case MenuItemFunction.about:
                const modalRef = this.modalService.open(AboutDanskillModalComponent);
                break;
            case MenuItemFunction.logout:
                this.loginService.logout();
                break;
        }
    }

    addToHomeScreen() {

        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    /// User accepted the A2HS prompt
                    // hide our user interface that shows our A2HS button
                    this.showAddToHomeButton = false;
                    this.deferredPrompt = null;
                    this.alertService.success('COMMON.AddToHomeSuccess');
                    this.closeMenu();
                } else {
                    // User dismissed the A2HS prompt
                    this.alertService.error('COMMON.AddToHomeError');
                }
            });
    }

}
