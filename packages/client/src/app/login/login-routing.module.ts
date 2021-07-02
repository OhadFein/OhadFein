import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import {
  LoginPageComponent,
} from '.';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'login', component: LoginPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
