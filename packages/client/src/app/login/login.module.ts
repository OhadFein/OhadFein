import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  LoginPageComponent,
} from '.';
import { LoginRoutingModule } from './login-routing.module';
import {InfraModule} from "@infra/infra.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoginRoutingModule,
    InfraModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
