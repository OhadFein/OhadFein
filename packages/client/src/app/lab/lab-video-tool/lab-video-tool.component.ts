import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
    LabPlayerJumpDirection,
    LabPlayerPlaybackOperator,
    LabPlayerType,
    LabStarVideo,
    LabUserVideo,
} from '@app/_infra/core/models';
import {VideoPlayerWrapperComponent} from '@app/_infra/ui';
import {VgEvents} from 'ngx-videogular';

@Component({
    selector: 'dsapp-lab-video-tool',
    templateUrl: './lab-video-tool.component.html',
    styleUrls: ['./lab-video-tool.component.scss']
})
export class LabVideoToolComponent {
    @Input() masterVideo: LabStarVideo = null;
    @Input() studentVideo: LabUserVideo = null;
    @Input() disableSavePracticesButton: boolean;

    @Output() masterPlayerDurationReady = new EventEmitter<number>();
    @Output() clearVideo = new EventEmitter<LabPlayerType>();
    @Output() isPlayerReady = new EventEmitter<boolean>();
    @Output() saveToPractices = new EventEmitter<void>();
    @ViewChild('masterPLayer', {static: false}) masterPLayer: VideoPlayerWrapperComponent;
    @ViewChild('studentPLayer', {static: false}) studentPLayer: VideoPlayerWrapperComponent;

    synchronized = false;
    timeDiff = 0;
    playing = false;
    playbackRate = 1;

    fullscreen = false;

    toggleVideos() {
        if (this.playing) {
            [this.masterPLayer, this.studentPLayer].map(p => p.pause());
        } else {
            this.seekToSyncTime();
            [this.masterPLayer, this.studentPLayer].map(p => p.play());
        }
    }

    toggleFullScreen(): void {
        this.fullscreen = !this.fullscreen;
    }

    masterPlayerDuration(duration: number) {
        this.masterPlayerDurationReady.emit(duration);
    }

    masterPLayerEvent(event) {
        if (!this.synchronized) {
            return;
        }
        switch (event.type) {
            case VgEvents.VG_ENDED:
                /// synchronizing when master ended
                this.stop();
                break;
            case VgEvents.VG_SEEKED:
                this.syncStudentPlayer();
                break;
        }
    }

    studentPLayerEvent(event) {
        if (!this.synchronized) {
            return;
        }
        switch (event.type) {
            case VgEvents.VG_ENDED:
                /// synchronizing when master ended
                [this.masterPLayer, this.studentPLayer].map(p => p.pause());
                this.seekToSyncTime(0);
                break;
        }
    }

    masterPLayerStateChange(event) {
        this.playing = event;
    }

    toggleSync() {
        if (!this.studentVideo) {
            return;
        }

        const func = this.synchronized ? this.unsynchronize() : this.synchronize();
    }

    synchronize() {
        this.synchronized = true;
        this.resetPlayers();
        const masterTime = Math.round(this.masterPLayer.getCurrentTime());
        const studentTime = Math.round(this.studentPLayer.getCurrentTime());
        this.timeDiff = masterTime - studentTime;
    }

    unsynchronize() {
        this.synchronized = false;
        this.resetPlayers();
        this.timeDiff = 0;
    }

    seekToSyncTime(time?: number) {
        let masterTime = time !== undefined ? time : Math.round(this.masterPLayer.getCurrentTime());
        let studentTime = masterTime - this.timeDiff;

        if (studentTime < 0) {
            studentTime = 0;
            masterTime = this.timeDiff;
        }
        this.masterPLayer.seekTo(masterTime);
        this.studentPLayer.seekTo(studentTime);
    }

    syncStudentPlayer() {
        const masterTime = this.masterPLayer.getCurrentTime();
        const studentTime = masterTime - this.timeDiff;
        this.studentPLayer.seekTo(studentTime);
    }

    syncMasterPlayer() {
        const studentTime = this.studentPLayer.getCurrentTime();
        const masterTime = studentTime - this.timeDiff;
        this.masterPLayer.seekTo(masterTime);
    }

    resetPlayers() {
        [this.masterPLayer, this.studentPLayer].map(p => {
            p.pause();
            p.changePLayBackRate('def');
        });
        this.playbackRate = 1;
    }

    jump(direction: LabPlayerJumpDirection) {
        [this.masterPLayer, this.studentPLayer].map(p => p.jump(direction));
    }

    stop() {
        [this.masterPLayer, this.studentPLayer].map(p => p.pause());
        this.seekToSyncTime(0);
    }

    changePLayBackRate(operator: LabPlayerPlaybackOperator) {
        [this.masterPLayer, this.studentPLayer].map(p => p.changePLayBackRate(operator));
        setTimeout(() => {
            this.playbackRate = this.masterPLayer.playbackRate;
        }, 200);
    }

    onPanStart(evt) {
        [this.masterPLayer, this.studentPLayer].map(p => p.pause());
    }

    onPan(evt) {
        const devVelocity = evt.velocityX / 20;
        const time = this.masterPLayer.playerAPI.getDefaultMedia().currentTime;
        const seekTo = devVelocity + time;
        this.masterPLayer.seekTo(seekTo);
        this.syncStudentPlayer();
    }


    onTap(evt) {
        this.toggleVideos();
    }

    masterVideoClear() {
        this.clearVideo.emit(LabPlayerType.MASTER);
    }

    masterVideoReady() {
        this.isPlayerReady.emit(true);
    }

    studentVideoClear() {
        this.clearVideo.emit(LabPlayerType.STUDENT);
    }

}
