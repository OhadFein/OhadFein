import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { StarDto } from '@danskill/contract';
import { StarsService } from '@core/services';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styleUrls: ['./stars-page.component.scss']
})
export class StarsPageComponent implements OnInit, OnDestroy {
  stars: StarDto[];

  filteredStars: StarDto[] = [];

  searchString: string;

  readonly searchPlaceholder = 'Search for a star';

  private unsubscribe = new Subject<void>();

  constructor(
    private starService: StarsService,
    private studentStoreService: StudentStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllStars();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSearch(value: string): void {
    this.filterStars(value);
  }

  navigateToStarPage(star: StarDto): void {
    this.router.navigate(['/student', 'star', star.slug]);
  }

  private filterStars(searchString: string): void {
    this.searchString = searchString;

    if (this.stars) {
      let tempFiltered: StarDto[] = [];
      if (searchString) {
        const search = searchString.toLocaleLowerCase().trim();
        tempFiltered = this.stars.filter((star: StarDto) => star.slug.includes(search));
      } else {
        tempFiltered = [...this.stars];
      }

      this.filteredStars = tempFiltered;
    }
  }

  private fetchAllStars(): void {
    this.starService.getStars().subscribe((stars: StarDto[]) => {
      this.stars = stars;
      this.filteredStars = stars;
      this.studentStoreService.setStars(stars);
    });
  }
}
