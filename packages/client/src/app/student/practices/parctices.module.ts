import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PracticePageComponent, PracticesPageComponent } from '.';
import { PracticesRoutingModule } from './practices-routing.module';
import {FormsModule} from '@angular/forms';
import {DanskillDatePipe} from "@app/pipes/danskill-date.pipe";

@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule, InfraModule, PracticesRoutingModule, FormsModule
  ],
  declarations: [PracticePageComponent, PracticesPageComponent, DanskillDatePipe]
})
export class PracticesModule { }
