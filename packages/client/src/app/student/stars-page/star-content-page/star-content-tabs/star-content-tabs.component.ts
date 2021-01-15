import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { IStar, IStarContent, StarContentDance } from '@core/models';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-star-content-tabs',
  templateUrl: './star-content-tabs.component.html'
})
export class StarContentTabsComponent implements OnInit, OnDestroy {

  @Input() star: IStar;

  content: IStarContent = null;
  loading = true;
  selectDance: any = null;
  subs: Subscription[] = [];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    margin: 5,
    navText: ['<i class="icon-left-open-big"></i>', '<i class="icon-right-open-big"></i>'],

    nav: true,
    responsive: {
      0: {
        items: 2
      },
      300: {
        items: 3
      },
      500: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 9
      }
    }
  }

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.star._id)).subscribe(
        content => {
          if (content) {
            // this.content = { ...content };
            // this.selectDance = this.content.dances && this.content.dances.length > 0 ? [...this.content.dances]  : null;
            // console.log("this.selectDance", this.selectDance)
            this.loading = false;
          } else {
            this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.star._id }));
          }

        }
      )
    );
  }

  onDanceSelection(dance: StarContentDance): void {
    // this.selectDance = { ...dance };
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
