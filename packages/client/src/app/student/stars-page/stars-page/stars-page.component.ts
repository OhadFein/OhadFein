import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { StarsService } from '@core/services';
import { StarDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-stars-page',
  templateUrl: './stars-page.component.html',
  styleUrls: ['./stars-page.component.scss']
})
export class StarsPageComponent implements OnInit, OnDestroy {
  stars: StarDto[];

  filteredStars: StarDto[] = [];

  searchString: string;

  searchPlaceholder = 'Search for a star';

  private unsubscribe = new Subject<void>();

  constructor(private starService: StarsService) {}

  ngOnInit(): void {
    this.fetchAllStars();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  filterStars(searchString: string): void {
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

  onSearch(value: string): void {
    this.filterStars(value);
  }

  private fetchAllStars(): void {
    this.starService.getStars().subscribe((stars: StarDto[]) => {
      this.stars = stars;
      this.filteredStars = stars;
    });
  }
}
