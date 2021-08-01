import { Component } from '@angular/core';

@Component({
  selector: 'dsapp-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styles: [
    `
      .bottom-nav {
        display: flex;
        justify-content: space-around;
        background: white;
        position: fixed;
        bottom: 0px;
        border-top: 0.8px solid #ededed;
      }

      .danskill-btn {
        color: #aeaeae;
        font-size: 12px;
        display: flex;
        justify-content: center;
      }

      .bottom-nav-icon {
        position: absolute;
        top: 9px;
      }

      .bottom-nav-text {
        font-family: Poppins;
        position: relative;
        top: 15px;
      }
    `
  ]
})
export class BottomToolbarComponent {
  constructor() {}
}
