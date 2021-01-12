import { Component, OnInit, Input } from '@angular/core';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

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
  @Input() starId: string; 

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.getStarContent();;
  }

  manageTypes(){
    console.log("this.this.content", typeof this.content)
  }

  getStarContent(){
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.starId)).subscribe(
        content => {
          if (content) {
            this.content = { ...content };
            console.log("this.this.content", this.content)
            console.log("this.this.content", typeof this.content)

            this.selectDance = this.content.dances && this.content.dances.length > 0 ? [...this.content.dances]  : null;
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
