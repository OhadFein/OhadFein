import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, finalize, take } from 'rxjs/operators';
import { FigureBaseDto, StarDto } from '@danskill/contract';
import { StarsService } from '@core/services';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';

@Component({
  selector: 'dsapp-star-figure-list',
  templateUrl: './star-figure-list.component.html',
  styleUrls: ['./star-figure-list.component.scss']
})
export class StarFigureListComponent implements OnInit {
  slug: string = null;

  user: StarDto;

  loading = true;

  searchString = '';

  noResultMessage: string;

  figures: FigureBaseDto[] = [];

  filteredFigures: FigureBaseDto[] = [];

  readonly searchPlaceholder = 'Search for a movement';

  constructor(
    private route: ActivatedRoute,
    private studentStoreService: StudentStoreService,
    private starService: StarsService,
    private upperToolbarService: UpperToolbarService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        take(1),
        filter((params: Params) => params.type),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((params: Params) => {
        this.initUser(params);

        if (this.user) {
          this.upperToolbarService.setPageName(
            `${this.user.firstName} ${this.user.lastName}-${params.type}`
          );
          this.initFigureList(params);
        }
      });
  }

  onSearch(value: string): void {
    this.filterFigures(value);
  }

  onSelectFigure(figure: FigureBaseDto): void {
    // TODO: should route to a figure screen
    console.log(figure);
  }

  private initUser(params: Params): void {
    this.slug = params.slug;
    this.user = this.studentStoreService.getStarBySlug(this.slug);

    if (!this.user && this.slug) {
      this.starService.getStarBySlug(this.slug).subscribe(
        (star: StarDto) => {
          this.user = star;
          this.studentStoreService.setStars([star]);
          this.upperToolbarService.setPageName(
            `${this.user.firstName} ${this.user.lastName}-${params.type}`
          );
          this.initFigureList(params);
        },
        () => {
          this.noResultMessage = 'Sorry, there is no practices for this style';
        }
      );
    }
  }

  private initFigureList(params: Params): void {
    this.starService
      .getPracticesByType(params.slug, params.type)
      .subscribe((figures: FigureBaseDto[]) => {
        this.figures = figures;
        this.filteredFigures = figures;
      });
  }

  private filterFigures(searchString: string): void {
    this.searchString = searchString;

    if (this.figures) {
      let tempFiltered: FigureBaseDto[] = [];
      if (searchString) {
        const search = searchString.toLocaleLowerCase().trim();
        tempFiltered = this.figures.filter((figure: FigureBaseDto) => figure.name.includes(search));
      } else {
        tempFiltered = [...this.figures];
      }

      this.filteredFigures = tempFiltered;
    }
  }
}
