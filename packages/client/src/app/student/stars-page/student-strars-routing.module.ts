import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';
import { StarFigureListComponent } from './star-figure-list/star-figure-list.component';
import { FigureMovementsComponent } from './star-figure-page/figure-movements/figure-movements.component';
import { FigurePreviewComponent } from './star-figure-page/figure-preview/figure-preview.component';
import { FigurePrinciplesComponent } from './star-figure-page/figure-principles/figure-principles.component';
import { FigurePracticesComponent } from './star-figure-page/figure-practices/figure-practices.component';
import { StarContentPageComponent, StarFigurePageComponent, StarsPageComponent } from '.';

const routes: Routes = [
  { path: '', component: StarsPageComponent, canActivate: [AuthGuard] },
  {
    path: ':slug',
    component: StarContentPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug/:type',
    component: StarFigureListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug/:figureId',
    component: StarFigurePageComponent,
    children: [
      { path: '', component: FigureMovementsComponent },
      { path: 'Outline', component: FigurePreviewComponent },
      { path: 'Movements', component: FigureMovementsComponent },
      { path: 'Principles', component: FigurePrinciplesComponent },
      {
        path: 'Practices',
        component: FigurePracticesComponent,
        children: [{ path: 'practiceId', component: StarContentPageComponent }],
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStarRoutingModule {}
