import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuOpenStateSource = new BehaviorSubject<boolean>(false);
  menuOpenState$ = this.menuOpenStateSource.asObservable();

  setMenuOpenState(state: boolean) {
	this.menuOpenStateSource.next(state);
  }

  toggleMenuOpenState() {
	const currentState = this.menuOpenStateSource.getValue();
	this.menuOpenStateSource.next(!currentState);
  }
}
