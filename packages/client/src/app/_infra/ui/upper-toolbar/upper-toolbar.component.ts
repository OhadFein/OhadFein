import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dsapp-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styles: [
    `
      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .upper-toolbar {
        display: flex;
        justify-content: space-between;
        background: inherit;
        border-bottom: 0.8px solid #ededed;
      }
    `
  ]
})
export class UpperToolbarComponent {
  @Output() public sideMenuOpen = new EventEmitter();

  onOpenSideMenu = (): void => {
    this.sideMenuOpen.emit();
  };
}
