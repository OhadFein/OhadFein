import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_VALIDATORS } from '@app/_infra/core/global_variables';
import { UserRegistrationData } from '@core/models/user.model';
import { RegisterService } from '@core/services/register.service';
import { RegisterValidators } from '@core/validators';

@Component({
  selector: 'dsapp-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;

  get formControls() {
    return this.registerForm.controls;
  }

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
        password: ['', Validators.compose(PASSWORD_VALIDATORS)],
        confirmPassword: ['', Validators.compose([Validators.required])],
        name: this.formBuilder.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]]
        })
      },
      {
        validator: RegisterValidators.passwordMatchValidator
      }
    );
  }

  register(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      this.isSubmitted = false;

      return;
    }

    const user: UserRegistrationData = { ...this.registerForm.value };

    this.registerService.register(user);
    setTimeout(() => {
      this.isSubmitted = false;
    }, 3000);
  }
}
