import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactUsPageComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ContactUsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule {}
