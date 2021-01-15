import { Component, OnInit, Input, ViewChild , ChangeDetectorRef, AfterViewInit} from '@angular/core';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Figure } from '@app/_infra/core/models';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper/core';

SwiperCore.use([Pagination, Scrollbar, A11y]);

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

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) { }

  onSwiper(swiper) {
    // console.log(swiper)
  }
  onSlideChange() {
    // console.log('slide change')
  }

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
            console.log("this.content", this.content)
            this.figures = this.content.figures;
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
