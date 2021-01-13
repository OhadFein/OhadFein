import { Component, OnInit, Input, ViewChild , ChangeDetectorRef, AfterViewInit} from '@angular/core';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Figure } from '@app/_infra/core/models';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'dsapp-start-figure-wrapper',
  templateUrl: './start-figure-wrapper.component.html',
  styles: [
  ]
})
export class StartFigureWrapperComponent implements OnInit {
  subs: Subscription[] = []  ;
  star: any;
  content: any;
  selectDance: any[];
  loading: boolean;
  figures: Figure[];
  danceTypes: string[];
  @Input() starId: string; 
  public carouselTileItems: Array<any>;
  public carouselTile: NguCarouselConfig;

  
  slideNo = 0;

  // @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  // carouselConfig: NguCarouselConfig = {
  //   grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
  //   load: 3,
  //   interval: {timing: 4000, initialDelay: 1000}, 
  //   loop: true,
  //   touch: true,
  //   velocity: 0.2
  // }
  // carouselItems = [1, 2, 3];

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) { }


  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
  
    this.getStarContent();;
  }

  manageTypes(){
    this.danceTypes = [...new Set(this.figures.map(item=> item.type))];    
  }

  getStarContent(){
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.starId)).subscribe(
        content => {
          if (content) {
            this.content = { ...content };
            this.figures = this.content.figures;
            console.log("this.figures", this.figures)
            this.manageTypes()
            this.loading = false;
          } else {
            this.store.dispatch(StarContentActions.BeginGetStarsContentAction({ payload: this.starId }));
          }
        }
      )
    );
  }
}
