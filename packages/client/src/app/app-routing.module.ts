import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { PageNotFoundComponent } from '@infra/ui/';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then((m) => m.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
