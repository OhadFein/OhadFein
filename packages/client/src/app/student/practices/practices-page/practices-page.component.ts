import { Component, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { AlertErrorService } from '@app/_infra/core/services';
import * as PracticesActions from '@app/_infra/store/actions/practices.actions';
import { Practice, PracticeError } from '@core/models';
import * as selectors from '@infra/store/selectors/practices.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html'
})

export class PracticesPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  loading = true;
  errorMsg: PracticeError | string = null;
  startDate: Date = new Date('1/1/2020');
  lastDate: Date = new Date();
  currentDate: Date;
  monthLength: number;
  maxMonthLength: number;
  nextBtndisabled = false;
  prevBtndisabled = false;
  practicesData: Practice[] = null;
  practices: Practice[] = null;
  test: Practice[] = [];
  subs: Subscription[] = [];
  searchTerm = '';
  selectedValue = '';
  isPracticesOnThisMonth;
  formattedDate;
  currentMonth: string;

  constructor(
      private store: Store<any>,
      private errorService: AlertErrorService,
      private cdRef:ChangeDetectorRef
  ) {
    this.currentDate = this.lastDate;
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  ngOnInit() {


    // this.setMonthsLength();

    this.maxMonthLength = this.monthLength;

    this.setDisabledBtn();


    this.subs.push(
      this.store.select(selectors.selectPracticestMonth()).subscribe(
        res => {
          if(res){
            this.currentDate = res; 
          }
        }
      )
    )
    this.subs.push(
        this.store.select(selectors.selectAllPracticesSorted()).subscribe(
            res => {
              if (res) {
                this.practices = [...res];
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

  setMonthsLength() {
    const yearDelta = 12 * (this.currentDate.getFullYear() - this.startDate.getFullYear());
    this.monthLength = this.currentDate.getMonth() - this.startDate.getMonth() + yearDelta + 1;
  }

  setDisabledBtn() {
    if (this.monthLength === this.maxMonthLength)
      this.nextBtndisabled = true;
    else if (this.monthLength === 1)
      this.prevBtndisabled = true;
    else {
      this.prevBtndisabled = false;
      this.nextBtndisabled = false;
    }

  }

  increaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.setMonthsLength();
    this.setDisabledBtn();
    this.isPracticesOnThisMonth = false;
    this.currentMonth = this.getCurrentMonth(); 
    this.store.dispatch(PracticesActions.SaveCurrentMonth({payload: this.currentDate}))
  }

  getCurrentMonth(){
    return this.currentDate.toLocaleString('default', { month: 'long' });
  }

  decreaseMonths() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.setMonthsLength();
    this.setDisabledBtn();
    this.isPracticesOnThisMonth = false;
     this.currentMonth = this.getCurrentMonth(); 
     console.log("this.currentDate", this.currentDate)
     console.log("this.currentDate", typeof this.currentDate)
     this.store.dispatch(PracticesActions.SaveCurrentMonth({payload: this.currentDate}))
    }

  compareDates(firstDate, secondDate) {
    firstDate = new Date(firstDate);
    if (firstDate.getMonth() === secondDate.getMonth() && firstDate.getFullYear() === secondDate.getFullYear()){
      this.isPracticesOnThisMonth = true;
      return true;
    }
    else
      return false;
  }


  isHidden(title) {
    return !title.includes(this.selectedValue);
  }

  search() {
    this.selectedValue = this.searchTerm;
  }

  clear() {
    this.searchTerm = '';
    this.selectedValue = '';
  }



}
