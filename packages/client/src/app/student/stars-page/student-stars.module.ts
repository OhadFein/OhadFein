import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'swiper/angular';

import {
  StarContentPageComponent,
  StarFigurePageComponent,
  StarInfoComponent,
  StarsPageComponent,
} from '.';
import { StudentStarRoutingModule } from './student-strars-routing.module';
import { StartFigureWrapperComponent } from './star-content-page/start-figure-wrapper/start-figure-wrapper.component';


@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, TranslateModule.forChild(), NgbModule, StudentStarRoutingModule, InfraModule, SwiperModule,

  ],
  declarations: [
    StarsPageComponent, StarInfoComponent, StarContentPageComponent, StarFigurePageComponent, StartFigureWrapperComponent
  ]
})
export class StudentStarsModule { }
