import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() bla: string;

  playerAPI: VgAPI;

  subs: Subscription[] = [];

  constructor(private elRef: ElementRef) {
    console.log(1111)

  }

  ngOnInit() {
    console.log(2222);
  }

  onPlayerReady(api) {
    console.log(333333)


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
    console.log(this.playerAPI);
    if(this.playerAPI){
      // this.onPlayerReady(this.playerAPI);    
      // this.playerAPI.getDefaultMedia();
      // const player = this.elRef.nativeElement.querySelector('video');
      // player.load();
  
      // (<VgMedia>api.getDefaultMedia()).loadMedia();

    }
    // (<VgMedia>api.getDefaultMedia()).loadMedia();


  }
}
