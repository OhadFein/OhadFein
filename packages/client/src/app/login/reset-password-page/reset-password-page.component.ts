import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PASSWORD_VALIDATORS } from '@app/_infra/core/global_variables';
import { AlertService, LoginService, RegisterService } from '@core/services';
import { RegisterValidators } from '@core/validators';

@Component({
  selector: 'dsapp-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styles: []
})
export class ResetPasswordPageComponent implements OnInit {
  newPasswordForm: FormGroup;
  token: string;
  isSubmitted = false;

  get formControls() {
    return this.newPasswordForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.alertService.error('ERRORS.SessionIsExpired');
      this.loginService.logout();
    }

    this.newPasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.compose(PASSWORD_VALIDATORS)],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: RegisterValidators.passwordMatchValidator
      }
    );
  }

  newPassword() {
    this.isSubmitted = true;

    if (this.newPasswordForm.invalid) {
      this.isSubmitted = false;

      return;
    }

    this.registerService.changePassword(this.newPasswordForm.value, this.token);
    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
  }
}
