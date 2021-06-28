import { Component } from '@angular/core';
import { MenuData, MenuItemFunction, NavButton } from '@core/models/';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dsapp-student-layout',
  templateUrl: './student-layout.component.html'
})
export class StudentLayoutComponent {
  currentRoute: string;
  studentMenuData: MenuData = {
    notificationBtn: { routerLink: '/student/notifications' },
    menuItemsGroups: [
      {
        menuItems: [{ label: 'COMMON.Profile', routerLink: '/student/profile' }],
        hasSeparator: true
      },
      {
        menuItems: [{ label: 'COMMON.About', function: MenuItemFunction.about }],
        hasSeparator: true
      },
      {
        menuItems: [{ label: 'LOGIN.Logout', function: MenuItemFunction.logout }],
        hasSeparator: false
      }
    ]
  };

  studentNavButtons: NavButton[] = [
    {
      label: 'STUDENT.NAV.Stars',
      routerLink: '/student/star',
      icon: 'icon-stars'
    },
    {
      label: 'STUDENT.NAV.MyLab',
      routerLink: '/student/lab',
      icon: ' icon-lab'
    },
    {
      label: 'STUDENT.NAV.Practices',
      routerLink: '/student/practices',
      icon: 'icon-practices'
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const lastRoute = this.router.url.split('/');
        this.currentRoute = lastRoute[lastRoute.length - 1];
      }
    });
  }
}
