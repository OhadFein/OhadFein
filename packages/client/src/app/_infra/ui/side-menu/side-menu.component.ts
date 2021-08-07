import { Component, EventEmitter, Output } from '@angular/core';

export interface MenuItem {
  icon_name: string;
  text: string;
  link: string;
}

@Component({
  selector: 'dsapp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
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

  onCloseSideMenu = (): void => {
    this.sideMenuClose.emit();
  };
}
