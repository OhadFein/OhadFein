import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';

import {
  PracticePageComponent,
  PracticesPageComponent,
  NewNotePageComponent,
  ViewNotePageComponent
} from '.';

const routes: Routes = [
  { path: '', component: PracticesPageComponent, canActivate: [AuthGuard] },
  {
    path: ':practiceId',
    component: PracticePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':practiceId/note',
    component: NewNotePageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Add new note'
    }
  },
  {
    path: 'notes/:noteId',
    component: ViewNotePageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Notes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticesRoutingModule {}
