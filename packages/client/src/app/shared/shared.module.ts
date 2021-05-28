import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DanskillDatePipe} from '@app/pipes/danskill-date.pipe';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
 imports:      [ CommonModule, NgPipesModule ],
 declarations: [DanskillDatePipe],
 exports:      [ DanskillDatePipe, CommonModule, FormsModule, NgPipesModule ]
})
export class SharedModule { }