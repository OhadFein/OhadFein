import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy} from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPreviewComponent implements OnChanges, OnDestroy {

  @Input() path: string;
  @Input() poster: string;
  @Input() bla: string;
  playerAPI: VgAPI;
  subs: Subscription[] = [];

  constructor(private elRef: ElementRef) {}

  onPlayerReady(api: VgAPI) {
    this.playerAPI = api;
    this.playerAPI.volume = 0;
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlay.subscribe(
        event => {
          this.playerAPI.play();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }

  ngOnChanges() {
    if(this.playerAPI){
      const player = this.elRef.nativeElement.querySelector('video');
      player.load();
    }
  }
}
