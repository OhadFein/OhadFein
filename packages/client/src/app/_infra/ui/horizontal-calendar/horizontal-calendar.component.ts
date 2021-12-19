import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'dsapp-horizontal-calendar',
  templateUrl: './horizontal-calendar.component.html',
  styleUrls: ['./horizontal-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalCalendarComponent implements OnChanges {
  @Input()
  startDate: Date;

  @Input()
  endDate: Date;

  @Output()
  select = new EventEmitter<Date>();

  months: Date[];

  selectedIndex: number;

  ngOnChanges(): void {
    if (this.startDate && this.endDate) {
      this.months = this.getMonthRange(new Date(this.startDate), new Date(this.endDate));
    }
  }

  onMonthSelect(month: Date, index: number): void {
    if (this.selectedIndex !== undefined && this.selectedIndex === index) {
      this.selectedIndex = undefined;
      this.select.emit(month);
    } else {
      this.selectedIndex = index;
      this.select.emit(month);
    }
  }

  private getMonthRange(startDate: Date, endDate: Date): Date[] {
    const result: Date[] = [];
    while (startDate < endDate) {
      result.push(new Date(startDate));
      startDate.setMonth(startDate.getMonth() + 1, 1);
    }

    return result.reverse();
  }
}
