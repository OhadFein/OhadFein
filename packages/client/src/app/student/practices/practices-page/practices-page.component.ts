import { Component, OnDestroy, OnInit } from '@angular/core';
import { PracticesService, UserService } from '@core/services';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import { finalize, switchMap } from 'rxjs/operators';
import { PracticeDto, UserDto } from '@danskill/contract';
import { Router } from '@angular/router';

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
    private studentService: StudentStoreService,
    private router: Router
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
          this.user = user;
          this.startDate = new Date(user.createdAt);

          return this.practicesService.getPractices(user.slug);
        })
      )
      .subscribe((practices: PracticeDto[]) => {
        this.practices = practices;
        this.filteredPractices = practices;
        this.studentService.setPractices(practices);
      });
  }

  onSearch(value: string): void {
    this.filterFigures(value);
  }

  onSelectMonth(month: Date): PracticeDto[] {
    if (this.selectedMonthFilter && month === this.selectedMonthFilter) {
      this.selectedMonthFilter = null;
      this.filteredPractices = this.practices;
      this.startDate = new Date(this.user.createdAt);
    } else {
      this.selectedMonthFilter = month;
      this.filteredPractices =
        this.practices?.filter((figure: PracticeDto) => {
          const date = new Date(month);
          const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          const practiceCreatedAt = new Date(figure.createdAt);

          return practiceCreatedAt >= firstDay && practiceCreatedAt <= lastDay;
        }) ?? [];
    }

    return this.filteredPractices;
  }

  onOpenPractice(practice: PracticeDto): void {
    this.router.navigate(['/student', 'practices', practice._id]);
  }

  private filterFigures(searchString: string = ''): void {
    this.searchString = searchString.toLowerCase();
    const basePractices = this.selectedMonthFilter ? this.filteredPractices : this.practices;
    let tempFiltered: PracticeDto[] = [];

    if (basePractices && searchString) {
      // TODO: no field to search by??
      // need a proper name
      // const search = searchString.toLocaleLowerCase().trim();
      tempFiltered = basePractices.filter((figure: PracticeDto, index: number) =>
        `Practice number ${index + 1}`.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      tempFiltered = this.selectedMonthFilter
        ? this.onSelectMonth(this.selectedMonthFilter)
        : [...this.practices];
    }
    this.filteredPractices = tempFiltered;
  }
}
