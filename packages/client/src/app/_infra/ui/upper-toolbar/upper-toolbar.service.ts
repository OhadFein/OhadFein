import { Subject } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpperToolbarService {
  private customButtonsComponentSubject = new Subject<ElementRef>();

  private pageNameSubject = new Subject<string>();

  public customButtonsComponent = this.customButtonsComponentSubject.asObservable();

  public pageName = this.pageNameSubject.asObservable();

  public setCustomButtonsComponent(elem: ElementRef): void {
    this.customButtonsComponentSubject.next(elem);
  }

  public setDefaultButtonsComponent(): void {
    this.customButtonsComponentSubject.next();
  }

  public setPageName(pageName: string): void {
    this.pageNameSubject.next(pageName);
  }
}
