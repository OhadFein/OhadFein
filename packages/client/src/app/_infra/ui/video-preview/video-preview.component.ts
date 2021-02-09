import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ui-video-preview',
  templateUrl: './video-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPreviewComponent implements OnInit, OnDestroy {

  @Input() path: string;
  @Input() poster: string;

  playerAPI: VgAPI;

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  onPlayerReady(api) {
    console.log('api :>> ', api);
    this.playerAPI = api;
    this.playerAPI.volume = 0;
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlay.subscribe(
        event => {
          this.playerAPI.play();
        }
      )
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.ended.subscribe(
        event => {
          setTimeout(() => {
            this.playerAPI.seekTime(0);
            this.playerAPI.play();
          }, 4000)
        }
      )
    );

  }

  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here
     console.log(this.path);
    //  this.onPlayerReady('');
    }   
}
