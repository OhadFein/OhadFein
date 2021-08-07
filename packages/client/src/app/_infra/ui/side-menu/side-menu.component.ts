import { LoginService } from '@core/services/';
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
  constructor(private loginService: LoginService) {}

  menu_items: MenuItem[] = [
    {
      icon_name: 'person_outline',
      text: 'Profile',
      link: 'student/profile'
    },
    {
      icon_name: 'contact_mail',
      text: 'Contact us',
      link: 'contact'
    }
  ];

  @Output() public sideMenuClose = new EventEmitter();

  onCloseSideMenu = (): void => {
    this.sideMenuClose.emit();
  };

  async logOut(): Promise<void> {
    await this.loginService.logout();
  }
}
