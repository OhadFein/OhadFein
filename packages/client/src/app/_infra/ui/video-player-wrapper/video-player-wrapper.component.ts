import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LabPlayerPlaybackOperator } from '@app/_infra/core/models';
import { DeviceDetectorService } from 'ngx-device-detector';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-video-player-wrapper',
  templateUrl: './video-player-wrapper.component.html'
})
export class VideoPlayerWrapperComponent implements OnInit {

  @Input() src: string;
  @Input() poster: string = null;
  @Input() synchronized = false;
  @Input() preview = true;

  @Output() durationEvent = new EventEmitter<number>();
  @Output() playerEvent = new EventEmitter();
  @Output() playerStateChange = new EventEmitter();
  @Output() clearVideoFile = new EventEmitter();

  playerIsReady = false;
  playerIsPlaying = false;
  playerAPI: VgAPI;
  videoPlayed = false;
  timePassed = '0';
  totalTime = '0';
  playbackRate = 1;
  subs: Subscription[] = [];


  constructor(private deviceService: DeviceDetectorService) {
  }

  onPlayerReady(api: VgAPI) {
    this.playerAPI = api;
    this.playerAPI.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.initVideo.bind(this)
    );
  }

  initVideo() {
    this.playerIsReady = true;
    const duration = this.getDuration();
    this.totalTime = duration.toFixed(2);
    this.durationEvent.emit(duration);
    this.pushSubscriptions();
  }

  ngOnInit() {

  }


  ngOnDestroy() {
    this.subs.forEach(s => { s.unsubscribe(); });
  }

  pushSubscriptions() {

    const videoStatusChangedEvent = (event) => {
      this.playerIsPlaying = ('playing' === this.playerAPI.state);
      this.playerEvent.emit(event);
      this.playerStateChange.emit(this.playerIsPlaying);
    }

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.abort.subscribe(videoStatusChangedEvent)
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.error.subscribe(videoStatusChangedEvent)
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.ended.subscribe(videoStatusChangedEvent)
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.playing.subscribe(videoStatusChangedEvent)
    );
    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.pause.subscribe(videoStatusChangedEvent)
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.seeked.subscribe(
        event => {
          this.playerEvent.emit(event);
        }
      )
    );

    this.subs.push(
      this.playerAPI.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        event => {
          this.timePassed = (Math.round(this.getCurrentTime() * 100) / 100).toFixed(2);
          this.playerEvent.emit(event);
        }
      )
    );
  }

  togglePlay() {
    if (!this.videoPlayed)
      this.videoPlayed = true;
    if (this.playerIsPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  jump(direction) {
    // TODO: should we use seekTo instead of .currentTIme = ...?
    switch (direction) {
      case 'fwd':
        this.playerAPI.getDefaultMedia().currentTime += 0.5;
        break;
      case 'bwd':
        this.playerAPI.getDefaultMedia().currentTime -= 0.5;
        break;
    }
  }

  play() {
    this.playerAPI.play();
  }

  pause() {
    this.playerAPI.pause();
  }

  stop() {
    this.pause();
    this.seekTo(0);
  }

  onPanStart(evt) {
    this.pause();
  }

  onPan(evt) {
    if (this.videoPlayed) {
      const devVelocity = evt.velocityX / 20;
      const seekRatio = devVelocity;
      const time = this.getCurrentTime();
      const seekTo = seekRatio + time;
      this.seekTo(seekTo);
    }
  }

  onTap(evt) {
    this.togglePlay();
  }

  seekTo(time: number) {
    let seekTo = time;

    if (seekTo > this.getDuration())
      seekTo = this.getDuration();
    else if (seekTo < 0)
      seekTo = 0;

    this.playerAPI.seekTime(seekTo);
  }

  getCurrentTime(): number {
    return this.playerAPI.getDefaultMedia().currentTime;
  }

  getDuration(): number {
    return this.playerAPI.getDefaultMedia().duration;
  }

  changePLayBackRate(operator: LabPlayerPlaybackOperator) {
    switch (operator) {
      case 'plus':
        const plus = parseFloat((this.playbackRate + 0.1).toFixed(1));
        this.playbackRate = plus < 10 ? plus : 10;
        break;
      case 'minus':
        const minus = parseFloat((this.playbackRate - 0.1).toFixed(1));
        this.playbackRate = minus > 0.1 ? minus : 0.1;
        break;

      default:
        this.playbackRate = 1;
    }
  }

  clearVideo(): void {
    this.clearVideoFile.emit();
  }

}
