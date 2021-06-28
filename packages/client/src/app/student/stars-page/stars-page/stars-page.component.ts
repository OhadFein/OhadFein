import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertErrorService } from '@app/_infra/core/services';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { IUser, StarError, StarSortingOptions } from '@core/models';
import { ConfigurationService } from '@core/services/configuration.service';
import * as selectors from '@infra/store/selectors/stars.selectors';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html'
})
export class StarsPageComponent implements OnInit, OnDestroy {
  users: IUser[] = null;
  filteredStars: IUser[] = [];
  sorting: StarSortingOptions = StarSortingOptions.NUMBER_OF_FIGURES;
  subs: Subscription[] = [];
  aboutBtnTxt = '';
  aboutVideoURL: string = null;
  loading = true;
  errorMsg: StarError | string = null;
  search: FormControl;
  searchString: string;

  constructor(
    private store: Store<any>,
    private configService: ConfigurationService,
    private translate: TranslateService,
    private errorService: AlertErrorService
  ) {
    translate.get('COMMON.About').subscribe((res: string) => {
      this.aboutBtnTxt = res;
    });
  }

  ngOnInit() {
    this.search = new FormControl('');

    const vURL: string = this.configService.getAboutVideoURL();
    this.aboutVideoURL = vURL ? vURL : '';

    this.subs.push(
      this.store.select(selectors.selectAllStars()).subscribe((res: IUser[]) => {
        if (res) {
          this.users = [...res];
          this.filterStars(null);
          this.loading = false;
        } else {
          this.store.dispatch(StarsActions.BeginGetStarsAction());
        }
      })
    );

    this.subs.push(
      this.store.select(selectors.selectStarsError()).subscribe((res) => {
        if (res && res.type) {
          this.users = null;
          this.loading = false;
          this.errorMsg = this.errorService.alertStarsError(res.type);
        }
      })
    );

    this.subs.push(
      this.search.valueChanges
        .pipe(startWith(''), debounceTime(700), distinctUntilChanged())
        .subscribe((val) => this.filterStars(val))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  filterStars(searchString: string) {
    this.searchString = searchString;

    if (this.users) {
      this.loading = true;

      let tempFiltered = [];
      if (searchString) {
        searchString = searchString.toLocaleLowerCase().trim();
        tempFiltered = this.users.filter((starsUser: IUser) => {
          const starName = this.getStarNameString(starsUser.given_name, starsUser.family_name);
          if (starName.indexOf(searchString) !== -1) {
            return starsUser;
          }
        });
      } else {
        tempFiltered = [...this.users];
      }

      this.filteredStars = tempFiltered;

      this.loading = false;
    }
  }

  sortStars = (user1: IUser, user2: IUser): number => {
    switch (this.sorting) {
      case StarSortingOptions.NUMBER_OF_FIGURES:
        return user2.star.figures.length - user1.star.figures.length;

      case StarSortingOptions.NAME:
        // eslint-disable-next-line no-case-declarations
        const starName1 = this.getStarNameString(user1.given_name, user1.family_name);
        // eslint-disable-next-line no-case-declarations
        const starName2 = this.getStarNameString(user2.given_name, user2.family_name);
        // eslint-disable-next-line no-case-declarations
        let comparison = 0;
        if (starName1 > starName2) {
          comparison = 1;
        } else if (starName1 < starName2) {
          comparison = -1;
        }

        return comparison;
    }
  };

  getStarNameString(givenName: string, familyName: string): string {
    return `${givenName} ${familyName}`.toLocaleLowerCase();
  }

  tryAgain() {
    this.users = null;
    this.errorMsg = null;
    this.loading = true;
    setTimeout(() => {
      this.store.dispatch(StarsActions.BeginGetStarsAction());
    }, 2000);
  }
}
