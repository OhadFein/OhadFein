import { Component, OnInit } from '@angular/core';
import { MenuData, NavButton } from '@core/models';
import { MenuItemsService } from '@core/services/menu-items.service';

@Component({
  selector: 'dsapp-notifications-layout',
  templateUrl: './notifications-layout.component.html',
  styles: []
})
export class NotificationsLayoutComponent implements OnInit {
  notificationsMenuData: MenuData = null;

  notificationsNavButtons: NavButton[] = null;

  constructor(private menuItemsService: MenuItemsService) {}

  ngOnInit(): void {
    this.notificationsMenuData = this.menuItemsService.getMenuData();
    this.notificationsNavButtons = this.menuItemsService.getNavItems();
  }
}
