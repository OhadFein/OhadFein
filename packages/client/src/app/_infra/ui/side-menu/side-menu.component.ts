import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface MenuItem {
  icon_name: string;
  text: string;
  link: string;
}

@Component({
  selector: 'dsapp-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
    `
      .mat-toolbar {
        background: inherit;
        justify-content: space-between;
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
export class SideMenuComponent {
  menu_items: MenuItem[] = [
    {
      icon_name: 'person_outline',
      text: 'Profile',
      link: ''
    },
    {
      icon_name: 'subscriptions',
      text: 'Subscription',
      link: ''
    },
    {
      icon_name: 'plagiarism',
      text: 'About us',
      link: ''
    },
    {
      icon_name: 'contact_mail',
      text: 'Contact us',
      link: ''
    },
    {
      icon_name: 'question_answer',
      text: 'Help & Support',
      link: ''
    },
    {
      icon_name: 'settings',
      text: 'Settings',
      link: ''
    }
  ];
  @Output() public sideMenuClose = new EventEmitter();

  public onCloseSideMenu = () => {
    this.sideMenuClose.emit();
  };

  constructor() {}
}
