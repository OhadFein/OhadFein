import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-video-player-modal',
  templateUrl: './video-player-modal.component.html'
})
export class VideoPlayerModalComponent implements OnInit, OnDestroy {
  @Input() videoURL: string;
  @Input() autoplay = false;
  @Input() title: any;

  isString = true;
  playerAPI: VgAPI;

  isMuted = false;

  subs: Subscription[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.isString = (typeof this.title === 'string');
  }

  onPlayerReady(api) {
    this.playerAPI = api;

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.canPlay.subscribe(
        event => {
          if (this.autoplay) {
            this.playerAPI.play();
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }
}
