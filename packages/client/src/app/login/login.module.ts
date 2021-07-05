import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfraModule } from '@infra/infra.module';
import { LoginRoutingModule } from './login-routing.module';
import { AfterLoginPageComponent } from './login-page/after-login-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoginRoutingModule,
    InfraModule
  ],
  declarations: [LoginPageComponent, AfterLoginPageComponent]
})
export class LoginModule {}
