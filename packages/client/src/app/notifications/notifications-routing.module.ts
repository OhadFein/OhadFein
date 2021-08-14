import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';
import { NotificationsLayoutComponent } from './notifications-layout/notifications-layout.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsLayoutComponent,
    children: [
      {
        path: 'notifications',
        loadChildren: () => import('./notifications.module').then((m) => m.NotificationsModule),
        canActivate: [AuthGuard],
        data: {
          title: 'Notifications'
        }
      },
      { path: '', redirectTo: 'star', pathMatch: 'full' }
    ],
    data: {
      title: 'Notifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
