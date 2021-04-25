import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {AuthTokens, MenuData, MenuItemFunction, NavButton} from '../models';

@Injectable({
    providedIn: 'root'
})
export class MenuItemsService {

    constructor() { }


    getMenuData(): MenuData {
        return {
            notificationBtn: { routerLink: '/student/notifications' },
            menuItemsGroups: [
                {
                    menuItems: [
                        { label: 'COMMON.Profile', routerLink: '/student/profile' }
                    ],
                    hasSeparator: true
                },
                {
                    menuItems: [
                        { label: 'COMMON.About', function: MenuItemFunction.about }
                    ],
                    hasSeparator: true
                },
                {
                    menuItems: [
                        { label: 'LOGIN.Logout', function: MenuItemFunction.logout }
                    ],
                    hasSeparator: false
                }
            ]
        };
    }

    getNavItems(): NavButton[] {
        return [
            { label: 'STUDENT.NAV.Stars', routerLink: '/student/star', icon: 'icon-stars' },
            { label: 'STUDENT.NAV.MyLab', routerLink: '/student/lab', icon: ' icon-lab' },
            { label: 'STUDENT.NAV.Practices', routerLink: '/student/practices', icon: 'icon-practices' }
        ];
    }
}
