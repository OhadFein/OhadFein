import { Component, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { AlertErrorService } from '@app/_infra/core/services';
import * as PracticesActions from '@app/_infra/store/actions/practices.actions';
import { Practice, PracticeError } from '@core/models';
import * as selectors from '@infra/store/selectors/practices.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsapp-figure-practices',
  templateUrl: './figure-practices.component.html',
  styleUrls: ['./figure-practices.component.scss']

})
export class FigurePracticesComponent implements OnInit {

  loading = true;
  errorMsg: PracticeError | string = null;
  maxMonthLength: number;
  nextBtndisabled = false;
  prevBtndisabled = false;
  practicesData: Practice[] = null;
  practices: Practice[] = null;
  test: Practice[] = [];
  subs: Subscription[] = [];
  searchTerm = '';
  selectedValue = '';
  formattedDate;
  currentMonth: string;
  figureId: string;
  constructor(
      private store: Store<any>,
      private errorService: AlertErrorService,
      private cdRef:ChangeDetectorRef,
      private router: Router, 
  ) {  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  getFigureId(): void {
    this.figureId = this.router.url.split('/')[4]
  }

  ngOnInit() {

    this.getFigureId();
    this.subs.push(
        this.store.select(selectors.selectAllPracticesByFigureId(this.figureId)).subscribe(
            res => {
              if (res) {
                console.log("res", res)
                this.practices = [...res];
                console.log('this.practices :>> ', this.practices);
                this.loading = false;
              } else {
                this.store.dispatch(PracticesActions.BeginGetPracticesAction());
              }
            }
        )
    );

    this.subs.push(
        this.store.select(
            selectors.selectPracticesError()).subscribe(res => {
          if (res && res.type) {
            this.practices = null;
            this.loading = false;
            this.errorMsg = this.errorService.alertStarsError(res.type);
          }
        })
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  deletePractice(e){
    console.log('e :>> ', e);
    console.log(1111)
  
  }
}
