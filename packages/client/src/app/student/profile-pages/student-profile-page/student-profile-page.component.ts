import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertErrorService } from '@core/services';
import { User, UserError } from '@infra/core/models';
import * as UserActions from '@infra/store/actions/user.actions';
import * as selectors from '@infra/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-student-profile-page',
  templateUrl: './student-profile-page.component.html'
})
export class StudentProfilePageComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  user: User = null;
  errorMsg: UserError | string = null;

  constructor(private store: Store<any>, private errorService: AlertErrorService) {}

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectCurrentUser()).subscribe((res) => {
        if (res) {
          this.user = { ...res };
          this.errorMsg = null;
        } else {
          this.store.dispatch(UserActions.BeginGetUserAction());
        }
      })
    );

    this.subs.push(
      this.store.select(selectors.selectCurrentUserError()).subscribe((res) => {
        if (res && res.type) {
          this.errorMsg = this.errorService.alertUserError(res.type);
        }
      })
    );
  }

  tryAgain() {
    this.user = null;
    this.errorMsg = null;
    setTimeout(() => {
      this.store.dispatch(UserActions.BeginGetUserAction());
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
