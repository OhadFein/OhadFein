import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {AuthGuard} from '@app/_infra/core/guards/auth.guard';
// import {Noti} from '.';
import {NotificationsPageComponent} from './notifications-page/notifications-page.component'
import {NotificationsLayoutComponent} from './notifications-layout/notifications-layout.component';

const routes: Routes = [
    {
        path: '', component: NotificationsLayoutComponent, children: [
            {
                path: 'notifications',
                loadChildren: () => import('./notifications.module').then(m => m.NotificationsModule),
                canActivate: [AuthGuard]
            },
            { path: '', redirectTo: 'star', pathMatch: 'full' }
        ]
    }

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
