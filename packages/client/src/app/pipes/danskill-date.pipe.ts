import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'danskillDate'
})
export class DanskillDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const dateValue = new Date(value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return `${dateValue.getDate()}${this.nth(dateValue.getDate)},  ${formatDate(
      dateValue,
      'HH:mm',
      'en'
    )}`;
  }

  nth(d) {
    if (d > 3 && d < 21) {
      return 'th';
    }
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
