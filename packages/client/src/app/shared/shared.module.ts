import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DanskillDatePipe} from '@app/pipes/danskill-date.pipe';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [DanskillDatePipe],
 exports:      [ DanskillDatePipe, CommonModule, FormsModule ]
})
export class SharedModule { }