import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';

import { StudentEditProfilePageComponent, StudentProfilePageComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: StudentProfilePageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'edit',
    component: StudentEditProfilePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class StudentProfileRoutingModule {}
