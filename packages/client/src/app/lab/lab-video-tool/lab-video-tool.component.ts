import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LabPlayerType, LabStarVideo, LabUserVideo } from '@app/_infra/core/models';
import { VideoPlayerWrapperComponent } from '@app/_infra/ui';
import { FigureVideoBaseDto } from '@danskill/contract';
import { VgEvents } from 'ngx-videogular';

enum PlayerType {
  master = 'master',
  student = 'student'
}

@Component({
  selector: 'dsapp-lab-video-tool',
  templateUrl: './lab-video-tool.component.html',
  styleUrls: ['./lab-video-tool.component.scss']
})
export class LabVideoToolComponent {
  @Input() masterVideo: FigureVideoBaseDto = null;

  @Input() studentVideoUrl: string = null;

  @Input() studentVideoFile: File = null;

  @Input() disableSavePracticesButton: boolean;

  @Output() masterPlayerDurationReady = new EventEmitter<number>();

  @Output() clearVideo = new EventEmitter<LabPlayerType>();

  @Output() isPlayerReady = new EventEmitter<boolean>();

  @Output() saveToPractices = new EventEmitter<void>();

  @ViewChild('masterPLayer', { static: false })
  masterPLayer: VideoPlayerWrapperComponent;

  @ViewChild('studentPLayer', { static: false })
  studentPLayer: VideoPlayerWrapperComponent;

  synchronized = false;

  timeDiff = 0;

  playing = false;

  playbackRate = 1;

  fullscreen = false;

  /**
   * duration of a shortest video clip
   */
  videoDurationSync: number;

  /**
   * reference to a player in a sync mode (the one which holds a shortest video)
   */
  syncPlayer: VideoPlayerWrapperComponent;

  /**
   * start points for each video during a sync mode
   * @private
   */
  private videoStartTimeSync = {
    master: null,
    student: null
  };

  /**
   * duration of each video
   * @private
   */
  private videoDuration = {
    master: null,
    student: null
  };

  toggleVideos(): void {
    if (this.playing) {
      [this.masterPLayer, this.studentPLayer].map((p) => p.pause());
    } else {
      [this.masterPLayer, this.studentPLayer].map((p) => p.play());
    }
  }

  toggleFullScreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  masterPlayerDuration(duration: number) {
    this.masterPlayerDurationReady.emit(duration);
    this.videoDuration.master = duration;
  }

  studentPlayerDuration(duration: number): void {
    this.videoDuration.student = duration;
  }

  onPlayerEvent(event: Event): void {
    if (!this.synchronized) {
      return;
    }
    switch (event.type) {
      case VgEvents.VG_ENDED:
        this.syncPlayersOnStart();
        break;
    }
  }

  masterPLayerStateChange(event) {
    this.playing = event;
  }

  /**
   * this method check synchronized parameter and based on that
   * sync or un-sync two videos
   *
   * the logic behind should follow the next rule:
   * !!! the sync video duration has to be taken from the shortest video !!!
   * same rule applies in regards to the sync video totalTimePassed or currentTime properties
   */
  toggleSync() {
    if (!this.studentVideoUrl) {
      return;
    }

    this.synchronized ? this.unsynchronize() : this.synchronize();
    this.resetPlaybackRate();
  }

  synchronize() {
    this.synchronized = true;
    const { master, student } = this.videoDuration;
    master > student
      ? this.applySyncParameters(PlayerType.student)
      : this.applySyncParameters(PlayerType.master);
    this.timeDiff = Math.abs(
      this.masterPLayer.getCurrentTime() - this.studentPLayer.getCurrentTime()
    );
  }

  unsynchronize() {
    this.synchronized = false;
    this.videoDurationSync = 0;
    this.syncPlayer = null;
    this.videoStartTimeSync = {
      master: null,
      student: null
    };
    this.timeDiff = 0;
  }

  seekToSyncTime(masterTimeSeconds: number, studentTimeInSeconds: number): void {
    let masterTime = masterTimeSeconds ?? Math.round(this.masterPLayer.getCurrentTime());
    let studentTime = studentTimeInSeconds ?? masterTime - this.timeDiff;

    if (studentTime < 0) {
      studentTime = 0;
      masterTime = this.timeDiff;
    }
    this.masterPLayer.seekTo(masterTime);
    this.studentPLayer.seekTo(studentTime);
  }

  resetPlaybackRate(): void {
    [this.masterPLayer, this.studentPLayer].map((p) => {
      p.pause();
      p.playbackRate = 1;
    });
    this.playbackRate = 1;
  }

  syncPlayersOnStart(): void {
    [this.masterPLayer, this.studentPLayer].map((p) => p.pause());
    this.seekToSyncTime(this.videoStartTimeSync.master, this.videoStartTimeSync.student);
  }

  changePlaybackRate() {
    [this.masterPLayer, this.studentPLayer].map((p) => p.changePlaybackRate());
    setTimeout(() => {
      this.playbackRate = this.masterPLayer.playbackRate;
    }, 200);
  }

  onPan(timeShift: number): void {
    this.masterPLayer.onPan(timeShift);
    this.studentPLayer.onPan(timeShift);
  }

  onJump(time: number): void {
    this.masterPLayer.onJump(time);
    this.studentPLayer.onJump(time);
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

  private applySyncParameters(playerType: PlayerType): void {
    if (playerType === PlayerType.master) {
      this.videoDurationSync = this.videoDuration.master;
      this.syncPlayer = this.masterPLayer;
    } else {
      this.videoDurationSync = this.videoDuration.student;
      this.syncPlayer = this.studentPLayer;
    }
    this.videoStartTimeSync = {
      master: this.masterPLayer.timePassed,
      student: this.studentPLayer.timePassed
    };
  }
}
