import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';

import { StudentLayoutComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      {
        path: 'star',
        loadChildren: () =>
          import('./stars-page/student-stars.module').then((m) => m.StudentStarsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'lab',
        loadChildren: () => import('../lab/lab.module').then((m) => m.LabModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'practices',
        loadChildren: () => import('./practices/parctices.module').then((m) => m.PracticesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile-pages/student-profile.module').then((m) => m.StudentProfileModule),
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
export class StudentRoutingModule {}
