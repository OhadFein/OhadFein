import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfraModule } from '@infra/infra.module';
import { TranslateModule } from '@ngx-translate/core';
import {
  VgBufferingModule,
  VgControlsModule,
  VgCoreModule,
  VgOverlayPlayModule
} from 'ngx-videogular';

import { LabPageComponent, LabVideoToolComponent } from '.';
import { LabRoutingModule } from './lab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LabRoutingModule,
    InfraModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule
  ],
  declarations: [LabPageComponent, LabVideoToolComponent],
  exports: []
})
export class LabModule {}
