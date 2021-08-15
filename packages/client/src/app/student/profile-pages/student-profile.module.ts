import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/_infra/material.module';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  StudentEditProfilePageComponent,
  StudentProfilePageComponent,
  StudentUpicComponent
} from '.';
import { StudentProfileRoutingModule } from './student-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StudentProfileRoutingModule,
    InfraModule,
    NgbModule,
    ImageCropperModule,
    MaterialModule
  ],
  declarations: [
    StudentProfilePageComponent,
    StudentEditProfilePageComponent,
    StudentUpicComponent
  ],
  exports: [StudentUpicComponent]
})
export class StudentProfileModule {}
