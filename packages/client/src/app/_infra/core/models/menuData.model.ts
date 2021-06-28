export interface MenuData {
  notificationBtn?: NotificationButton;
  menuItemsGroups?: MenuItemsGroup[];
}

export interface NotificationButton {
  routerLink: string;
}

export interface MenuItemsGroup {
  menuItems: MenuItem[];
  hasSeparator?: boolean;
  title?: string;
}

export interface MenuItem {
  label: string;
  routerLink?: string;
  function?: MenuItemFunction;
  icon?: string;
  isHightLighted?: boolean;
}

export enum MenuItemFunction {
  logout = 'LOGOUT',
  about = 'ABOUT',
  addToHome = 'ADD_TO_HOMESCREEN'
}
