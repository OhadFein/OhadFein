import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';
import { SharedService } from '@app/_infra/core/services/shared.service';


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

  constructor(private elRef: ElementRef,     private sharedService: SharedService
    ) {}

  ngOnInit() {
  }

  onPlayerReady(api) {
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
