import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DSAPP_WINDOW } from '@core/global_variables/token';
import { Observable, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'dsapp-custom-lab-controls',
  templateUrl: './custom-lab-controls.component.html',
  styleUrls: ['./custom-lab-controls.component.scss']
})
export class CustomLabControlsComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() isPlaying: boolean;
  @Input() totalTimePassed: string;
  @Input() duration: number;
  @Input() playbackRate: number;
  /**
   * required for sync players
   * will trigger progress recalculation
   */
  @Input() isFullScreen: boolean;

  @Output() togglePlay = new EventEmitter<void>();
  @Output() pan = new EventEmitter<number>();
  @Output() jump = new EventEmitter<number>();
  @Output() changePlaybackRate = new EventEmitter<void>();

  @ViewChild('scroll') scroll: ElementRef<HTMLDivElement>;
  @ViewChild('progressBar') progressBar: ElementRef<HTMLDivElement>;
  @ViewChild('progress') progress: ElementRef<HTMLDivElement>;
  @ViewChild('pointer') pointer: ElementRef<HTMLDivElement>;

  formattedTime: string;
  playbackRateText: string;

  /**
   * A Minimum progress shift in pixels
   * The shift has to be bigger than a minimum value in order to change the progress
   * @private
   */
  readonly minJumpShift = 8;

  blocks: number[];
  private screenWidth = 0;
  private defaultMobileScreenWidth = 320;
  private blockWidth = 100;
  private scrollPosition = 0;

  private progressBarWidth = 0;
  private panMoveSource: Observable<number>;

  /**
   * it is important to recalculate amount of blocks necessary for a smooth scrolling on resize
   */
  @HostListener('window:resize')
  onResize() {
    // scroll bar
    this.screenWidth = this.window.innerWidth;
    this.blocks = this.getScrollBlocks();
    this.scrollPosition = this.getScrollPosition();
    if (this.scrollPosition <= 0) {
      this.setScrollPosition(1);
    }
    // progress bar
    this.progressBarWidth = this.getProgressBarWidth();
    this.setProgressInSeconds(parseFloat(this.totalTimePassed));
  }

  constructor(@Inject(DSAPP_WINDOW) private window: Window) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalTimePassed && changes.totalTimePassed.firstChange) {
      this.formattedTime = this.getFormattedTime();
    }

    if (changes.totalTimePassed && !changes.totalTimePassed.firstChange) {
      this.formattedTime = this.getFormattedTime();
      this.setProgressInSeconds(parseFloat(this.totalTimePassed));
    }

    if (changes.playbackRate) {
      this.playbackRateText = `${this.playbackRate}x`;
    }

    if (changes.isFullScreen) {
      this.window.dispatchEvent(new Event('resize'));
    }
  }

  ngOnInit(): void {
    this.screenWidth = this.window.innerWidth;
    this.blocks = this.getScrollBlocks();
  }

  ngAfterViewInit(): void {
    this.scrollPosition = this.getScrollPosition();
    if (this.scrollPosition <= 0) {
      this.setScrollPosition(1);
    }
    this.progressBarWidth = this.getProgressBarWidth();
    this.setProgressInSeconds(parseFloat(this.totalTimePassed));
  }

  onTogglePlay(): void {
    this.togglePlay.emit();
  }

  /**
   * update scroll element position
   * @param event
   */
  onPan(event): void {
    this.window.requestAnimationFrame(() => this.scrollUpdate(event.deltaX));
  }

  /**
   * fire pan event on move
   * @param event
   */
  onPanMove(event): void {
    if (!this.panMoveSource) {
      this.panMoveSource = timer(50); // set a bandwidth to max 20 shift events per a second
      this.panMoveSource
        .pipe(finalize(() => (this.panMoveSource = null)))
        .subscribe(() => this.pan.emit(event.velocityX));
    }
  }

  onChangeProgress(event: MouseEvent): void {
    if (event.offsetX > this.minJumpShift && event.offsetX <= this.progressBarWidth) {
      this.setProgressInPixels(event.offsetX);
      this.jumpToTime(event.offsetX);
    }
  }

  /**
   * update scroll bar position based on the direction
   * @param shift
   * @private
   */
  private scrollUpdate(shift: number): void {
    if (shift < 0) {
      this.setScrollPosition(-shift);
    } else {
      this.setScrollPosition(this.screenWidth - shift);
    }
  }

  /**
   * calculate a necessary number of blocks to be present in the DOM to allow smooth scrolling
   * @private
   */
  private getScrollBlocks(): number[] {
    const numberOfBlocks = Math.ceil(
      ((this.screenWidth || this.defaultMobileScreenWidth) * 3) / this.blockWidth
    );

    return Array(numberOfBlocks).fill(0);
  }

  /**
   * set scroll position with the use of setTimeout
   * not the best option but couldn't find a way to assign to scrollLeft otherwise
   * @param value
   * @private
   */
  private setScrollPosition(value: number): void {
    setTimeout(() => {
      this.scroll.nativeElement.scrollLeft = value;
    }, 1);
  }

  private getScrollPosition(): number {
    return this.scroll.nativeElement.scrollLeft - (this.scroll.nativeElement.clientLeft || 0);
  }

  /**
   * get formatted time like "mm:ss" as a string
   * @private
   */
  private getFormattedTime(): string {
    const seconds = parseInt(this.totalTimePassed, 10) % 60;
    const secondsToMinutes = parseInt(this.totalTimePassed, 10) / 60;
    const minutes = Math.floor(secondsToMinutes);

    return `${this.getFormattedTimeToString(minutes)}:${this.getFormattedTimeToString(seconds)}`;
  }

  /**
   * get two digit formatted number
   * @param time
   * @private
   */
  private getFormattedTimeToString(time: number): string {
    const formattedTime = (Math.round(time * 100) / 100).toFixed(0);

    return time < 10 ? `0${formattedTime}` : `${formattedTime}`;
  }

  /**
   * get width of a progress bar
   * @private
   */
  private getProgressBarWidth(): number {
    return this.progressBar.nativeElement.clientWidth;
  }

  /**
   * convert seconds into a progress and update it together with pointer
   * non-fixed values are used in order to achieve as much smooth transition as possible
   * @param seconds
   * @private
   */
  private setProgressInSeconds(seconds: number): void {
    const totalTimePassedInPercents = parseFloat((seconds / this.duration).toFixed(2));
    const progress = this.progressBarWidth * totalTimePassedInPercents;

    this.progress.nativeElement.style.width = `${progress}px`;
    this.pointer.nativeElement.style.left = `${progress - 4}px`;

    /**
     * weird bug
     * sometimes current time in seconds bigger than a video total time ???
     */
    if (totalTimePassedInPercents > 1) {
      this.progress.nativeElement.style.width = `${this.progressBarWidth}px`;
      this.pointer.nativeElement.style.left = `${this.progressBarWidth - 4}px`;
    }
  }

  /**
   * update progress together with pointer
   * @param offset
   * @private
   */
  private setProgressInPixels(offset: number): void {
    this.progress.nativeElement.style.width = `${offset}px`;
    this.pointer.nativeElement.style.left = `${offset - 4}px`;
  }

  /**
   * convert progress into seconds and emit jump event to update current time value
   * @param offset
   * @private
   */
  private jumpToTime(offset: number): void {
    const totalProgressInPercents = offset / this.progressBarWidth;
    const totalProgressInSeconds = totalProgressInPercents * this.duration;
    this.jump.emit(totalProgressInSeconds);
  }
}
