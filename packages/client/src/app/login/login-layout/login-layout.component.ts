import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsapp-login-layout',
  templateUrl: './login-layout.component.html',
  styles: []
})
export class LoginLayoutComponent {
  isLoginSelected: boolean;
  constructor(private router: Router) {
    this.isLoginSelected = true;
    if (this.router.url.split('/')[1] === 'register') {
      this.isLoginSelected = false;
    }
  }

  setSelected() {
    this.isLoginSelected = !this.isLoginSelected;
  }
}
