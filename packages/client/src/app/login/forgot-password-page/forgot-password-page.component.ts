import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, LoginService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styles: []
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  isSend = false;
  token: string;

  subs: Subscription[] = [];

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      /// user has reset token from email
      this.subs.push(
        this.loginService.validateResetToken(this.token).subscribe(
          (res) => {
            if (res.message) {
              this.router.navigate(['/reset', 'edit', this.token]);
            } else if (res.message) {
              const errorStr = `${res.message}`;
              this.alertService.error(errorStr);
              this.router.navigate(['/reset']);
            } else {
              this.alertService.error('ERRORS.GeneralBackendError');
              this.router.navigate(['/reset']);
            }
          },
          () => {
            this.alertService.error('ERRORS.GeneralBackendError');
            this.router.navigate(['/reset']);
          }
        )
      );
    }
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  resetPassword() {
    this.isSubmitted = true;

    if (this.forgotPasswordForm.invalid) {
      this.isSubmitted = false;

      return;
    }

    this.subs.push(
      this.loginService.forgotPassword(this.forgotPasswordForm.value).subscribe(
        (res) => {
          if (res.message) {
            this.isSend = true;
            this.isSubmitted = false;
          } else if (res.message) {
            const errorStr = `${res.message}`;
            this.alertService.error(errorStr);
            this.isSubmitted = false;
          } else {
            this.isSubmitted = false;
            this.alertService.error('LOGIN.ResetPasswordFailedMsg');
          }
        },
        () => {
          this.isSubmitted = false;
          this.alertService.error('LOGIN.ResetPasswordFailedMsg');
        }
      )
    );
  }
}
