import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import {
  ForgotPasswordPageComponent,
  LoginLayoutComponent,
  LoginPageComponent,
  RegisterPageComponent,
  ResetPasswordPageComponent
} from '.';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'reset', component: ForgotPasswordPageComponent },
      { path: 'reset/:token', component: ForgotPasswordPageComponent },
      { path: 'reset/edit/:token', component: ResetPasswordPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
