import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ui-video-player-wrapper',
    templateUrl: './video-player-wrapper.component.html',
    styleUrls: ['./video-player-wrapper.component.scss']
})
export class VideoPlayerWrapperComponent implements OnDestroy {
    @Input() src: string;
    @Input() poster: string = null;
    @Input() synchronized = false;
    @Input() preview = true;
    @Input() isMasterVideo = true;

    @Output() durationEvent = new EventEmitter<number>();
    @Output() playerEvent = new EventEmitter();
    @Output() playerStateChange = new EventEmitter<boolean>();
    @Output() isPlayerReady = new EventEmitter<boolean>();

    playerIsReady = false;
    isPlaying = false;
    playerAPI: VgAPI;
    videoPlayed = false;
    timePassed = '0';
    totalTime = '0';
    playbackRate = 1;
    subs: Subscription[] = [];

    onPlayerReady(api: VgAPI) {
        this.playerAPI = api;
        this.playerAPI.getDefaultMedia()
            .subscriptions
            .loadedMetadata
            .subscribe(() => this.initVideo());
    }

    initVideo() {
        this.playerIsReady = true;
        this.isPlayerReady.emit(true);
        const duration = this.getDuration();
        this.totalTime = duration.toFixed(2);
        this.durationEvent.emit(duration);
        this.pushSubscriptions();
        this.forceForward();
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => (sub.unsubscribe()));
    }

    pushSubscriptions() {
        const videoStatusChangedEvent = (event) => {
            this.isPlaying = ('playing' === this.playerAPI.state);
            this.playerEvent.emit(event);
            this.playerStateChange.emit(this.isPlaying);
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

    togglePlay(): void {
        this.isPlaying ? this.pause() : this.play();
    }

    play(): void {
        this.playerAPI.play();
    }

    pause(): void {
        this.playerAPI.pause();
    }

    onPan(timeShift: number): void {
        if (typeof timeShift !== 'number') {
            return;
        }

        if (this.isPlaying) {
            this.pause();
        }

        const currentTime = this.getCurrentTime();
        // control the speed of scroll. set to 1/2 of an actual shift
        const safeShift = ((timeShift * 50) || 1) / 100;
        const seekTo = (currentTime + safeShift).toFixed(2);
        this.seekTo(parseFloat(seekTo));
    }

    seekTo(time: number): void {
        const duration = this.getDuration();
        let seekTo = time;

        if (seekTo > duration) {
            seekTo = duration;
        } else if (seekTo < 0) {
            seekTo = 0;
        }
        this.playerAPI.seekTime(seekTo);
    }

    getCurrentTime(): number {
        return this.playerAPI.getDefaultMedia().currentTime;
    }

    getDuration(): number {
        return this.playerAPI.getDefaultMedia().duration;
    }

    changePlaybackRate(): void {
        switch (this.playbackRate) {
            case 0.5:
            case 1.0:
            case 1.5:
                this.playbackRate = parseFloat((this.playbackRate + 0.5).toFixed(1));
                break;
            case 2.0:
                this.playbackRate = 0.5;
                break;
        }
    }

    // changePLayBackRate(operator: LabPlayerPlaybackOperator) {
    //     switch (operator) {
    //         case 'plus':
    //             const plus = parseFloat((this.playbackRate + 0.1).toFixed(1));
    //             this.playbackRate = plus < 10 ? plus : 10;
    //             break;
    //         case 'minus':
    //             const minus = parseFloat((this.playbackRate - 0.1).toFixed(1));
    //             this.playbackRate = minus > 0.1 ? minus : 0.1;
    //             break;
    //
    //         default:
    //             this.playbackRate = 1;
    //     }
    // }
    //
    // jump(direction) {
    //     // TODO: should we use seekTo instead of .currentTIme = ...?
    //     switch (direction) {
    //         case 'fwd':
    //             this.playerAPI.getDefaultMedia().currentTime += 0.5;
    //             break;
    //         case 'bwd':
    //             this.playerAPI.getDefaultMedia().currentTime -= 0.5;
    //             break;
    //     }
    // }

    /**
     * yes, it is a hack
     * force the player to switch into play mode to initialize scroll bar on iOS devices
     * playerApi on iOS devices cannot handle seekTo event on onPlayerReady event launch
     * @private
     */
    private forceForward() {
        this.play();
        setTimeout(() => this.pause(), 100);
    }

}
