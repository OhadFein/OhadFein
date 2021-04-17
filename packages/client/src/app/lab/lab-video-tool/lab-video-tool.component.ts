import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
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

    videoDurationSync: number;
    private videoDuration = {
        master: null,
        student: null
    }

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
        this.videoDuration.master = duration;
    }

    studentPlayerDuration(duration: number) {
        this.videoDuration.student = duration;
        this.videoDurationSync = this.videoDuration.master > duration ? duration : this.videoDuration.master;
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

        this.synchronized ? this.unsynchronize() : this.synchronize();
        this.resetPlayers();
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

    syncMasterPlayer() {
        const studentTime = this.studentPLayer.getCurrentTime();
        const masterTime = studentTime - this.timeDiff;
        this.masterPLayer.seekTo(masterTime);
    }

    resetPlayers() {
        [this.masterPLayer, this.studentPLayer].map(p => {
            p.pause();
            p.playbackRate = 1;
        });
        this.playbackRate = 1;
    }

    stop() {
        [this.masterPLayer, this.studentPLayer].map(p => p.pause());
        this.seekToSyncTime(0);
    }

    changePlaybackRate() {
        [this.masterPLayer, this.studentPLayer].map(p => p.changePlaybackRate());
        setTimeout(() => {
            this.playbackRate = this.masterPLayer.playbackRate;
        }, 200);
    }

    onPanStart(evt) {
        [this.masterPLayer, this.studentPLayer].map(p => p.pause());
    }

    onPan(timeShift: number): void {
        this.masterPLayer.onPan(timeShift);
        this.studentPLayer.onPan(timeShift);
    }

    syncStudentPlayer() {
        const masterTime = this.masterPLayer.getCurrentTime();
        const studentTime = masterTime - this.timeDiff;
        this.studentPLayer.seekTo(studentTime);
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
