import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dsapp-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styles: ['./upper-toolbar.component.less']
})
export class UpperToolbarComponent {
  @Output() public sideMenuOpen = new EventEmitter();

  public onOpenSideMenu = (): void => {
    this.sideMenuOpen.emit();
  };
}
