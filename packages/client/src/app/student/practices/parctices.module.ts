import { MaterialModule } from '@infra/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PracticesPageComponent, PracticePageComponent, NewNotePageComponent } from '.';
import { PracticesRoutingModule } from './practices-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    InfraModule,
    PracticesRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [PracticesPageComponent, PracticePageComponent, NewNotePageComponent]
})
export class PracticesModule {}
