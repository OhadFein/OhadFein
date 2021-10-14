import { Component, OnDestroy, OnInit } from '@angular/core';
import { PracticesService, UserService } from '@core/services';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import { combineLatest, finalize, map, switchMap } from 'rxjs/operators';
import { FigureBaseDto, PracticeDto, UserDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-practices-page',
  templateUrl: './practices-page.component.html',
  styleUrls: ['./practices-page.component.scss']
})
export class PracticesPageComponent implements OnInit, OnDestroy {
  practices: PracticeDto[];

  filteredPractices: PracticeDto[];

  currentDate = new Date();

  startDate: Date;

  loading: boolean;

  searchString = '';

  selectedMonthFilter: Date;

  readonly searchPlaceholder = 'Search for a practice';

  private user: UserDto;

  get practicesAmount(): string {
    const len = this.practices.length;
    if (!len) {
      return '';
    }

    return len === 1 ? `${len} Practice` : `${len} Practices`;
  }

  constructor(
    private practicesService: PracticesService,
    private userService: UserService,
    private studentService: StudentStoreService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loading = true;
    this.userService
      .getUser()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        switchMap((user: UserDto) => {
          this.startDate = new Date(user.createdAt);

          return this.practicesService.getPractices(user.slug);
        })
      )
      .subscribe((practices: PracticeDto[]) => {
        this.practices = practices;
        this.filteredPractices = practices;
      });
  }

  onSearch(value: string): void {
    this.filterFigures(value);
  }

  onSelectMonth(month: Date): void {
    this.selectedMonthFilter = month;
    // TODO: filter practices which has been recorded in a selected month
    this.filteredPractices = this.practices.filter((figure: PracticeDto) => {
      const date = new Date(month);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const selectedDay = new Date(figure.createdAt);

      return selectedDay >= firstDay && selectedDay <= lastDay;
    });
  }

  private filterFigures(searchString: string): void {
    this.searchString = searchString;

    if (this.practices) {
      let tempFiltered: PracticeDto[] = [];
      if (searchString) {
        // TODO: no field to search by??
        // need a proper name
        // const search = searchString.toLocaleLowerCase().trim();
        tempFiltered = this.practices.filter((figure: PracticeDto, index: number) =>
          this.searchString.includes(`${index}`)
        );
      } else {
        tempFiltered = [...this.practices];
      }

      this.filteredPractices = tempFiltered;
    }
  }
}
