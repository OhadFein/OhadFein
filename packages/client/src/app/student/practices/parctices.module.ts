import { MaterialModule } from '@infra/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentStarsModule } from '@app/student/stars-page/student-stars.module';
import { SharedModule } from '@app/shared/shared.module';
import { PracticesRoutingModule } from './practices-routing.module';
import {
  PracticesPageComponent,
  PracticePageComponent,
  NewNotePageComponent,
  NotePageComponent,
  ViewNotePageComponent,
  NotesListPreviewComponent
} from '.';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    InfraModule,
    PracticesRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StudentStarsModule
  ],
  declarations: [
    PracticesPageComponent,
    PracticePageComponent,
    NewNotePageComponent,
    NotePageComponent,
    ViewNotePageComponent,
    NotesListPreviewComponent
  ]
})
export class PracticesModule {}
