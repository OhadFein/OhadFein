import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_infra/core/guards/auth.guard';

import { StarContentPageComponent, StarFigurePageComponent, StarsPageComponent } from '.';


const routes: Routes = [
  { path: '', component: StarsPageComponent, canActivate: [AuthGuard] },
  { path: ':slug', component: StarContentPageComponent, canActivate: [AuthGuard] },
  { path: ':slug/:figureId', component: StarFigurePageComponent, children: [
    {path:'preview', component: StarFigurePageComponent},
    {path:'Movements', component: StarFigurePageComponent},
    {path:'Principles', component: StarFigurePageComponent},
    {path:'Practices', component: StarFigurePageComponent},
  ],canActivate: [AuthGuard] }
  /* {
    path: ':starId', component: StarInfoPageComponent,
    children: [
      { path: 'figures', component: StarContentListComponent, pathMatch: 'full' },
      { path: 'figures/test', component: StarFigureContentComponent,  pathMatch: 'full' },

    ]
  }, */
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStarRoutingModule { }
