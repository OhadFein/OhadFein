import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';

import { LabPageComponent } from '.';

const routes: Routes = [
  { path: '', component: LabPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule {}
