import { Subject } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpperToolbarService {
  private customButtonsComponentSubject = new Subject<ElementRef>();

  public customButtonsComponent = this.customButtonsComponentSubject.asObservable();

  public setCustomButtonsComponent(elem: ElementRef): void {
    console.log('Publishing new comp');
    this.customButtonsComponentSubject.next(elem);
  }

  public setDefaultButtonsComponent(): void {
    this.customButtonsComponentSubject.next();
  }
}
