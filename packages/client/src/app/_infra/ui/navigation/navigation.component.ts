import { Component, HostListener, Input } from '@angular/core';
import { NavButton } from '@core/models';

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Input() navButtons: NavButton[];
  userScrolled = false;

  constructor() {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.detectScrollPosition();
  }

  detectScrollPosition() {
    // this.userScrolled = document.documentElement.scrollTop > 20; TODO: consider not to do it
  }
}
