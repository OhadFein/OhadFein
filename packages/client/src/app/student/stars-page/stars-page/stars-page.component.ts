import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { IUser, StarError, StarSortingOptions } from '@core/models';
import { StarsService } from '@core/services';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styleUrls: ['./stars-page.component.scss']
})
export class StarsPageComponent implements OnInit, OnDestroy {
  users: IUser[] = null;

  filteredStars: IUser[] = [];

  sorting: StarSortingOptions = StarSortingOptions.NUMBER_OF_FIGURES;

  subs: Subscription[] = [];

  loading = true;

  errorMsg: StarError | string = null;

  search = new FormControl('');

  searchString: string;

  searchPlaceholder = 'Search for a star';

  private unsubscribe = new Subject<void>();

  constructor(private starService: StarsService) {}

  ngOnInit(): void {
    this.fetchAllStars();

    this.search.valueChanges
      .pipe(takeUntil(this.unsubscribe), startWith(''), debounceTime(700), distinctUntilChanged())
      .subscribe((val) => this.filterStars(val));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  filterStars(searchString: string): void {
    this.searchString = searchString;

    if (this.users) {
      this.loading = true;

      let tempFiltered = [];
      if (searchString) {
        const search = searchString.toLocaleLowerCase().trim();
        tempFiltered = this.users.filter((starsUser: IUser) => {
          const starName = this.getStarNameString(starsUser.given_name, starsUser.family_name);

          return starName.indexOf(search) !== -1;
        });
      } else {
        tempFiltered = [...this.users];
      }

      this.filteredStars = tempFiltered;

      this.loading = false;
    }
  }

  sortStars(user1: IUser, user2: IUser): number | undefined {
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
      default:
        return 0;
    }
  }

  getStarNameString(givenName: string, familyName: string): string {
    return `${givenName} ${familyName}`.toLocaleLowerCase();
  }

  tryAgain(): void {
    this.users = null;
    this.errorMsg = null;
    this.loading = true;
  }

  onSearch(value: string): void {
    this.filterStars(value);
  }

  private fetchAllStars() {
    this.starService.getStars().subscribe((stars: any[]) => {
      console.log('stars', stars);
    });
  }
}
