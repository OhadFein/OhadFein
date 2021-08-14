import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@infra/material.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsPageComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    InfraModule,
    FormsModule,
    ContactUsRoutingModule,
    MaterialModule
  ],
  declarations: [ContactUsPageComponent]
})
export class ContactUsModule {}
