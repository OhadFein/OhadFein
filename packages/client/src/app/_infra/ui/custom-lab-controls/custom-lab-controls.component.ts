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
  @Input() isHiddenTime: boolean;
  @Input() isHiddenPlayback: boolean;
  @Input() totalTimePassed: string;
  @Input() duration: number;
  @Input() playbackRate: number;

  @Output() togglePlay = new EventEmitter<void>();
  @Output() pan = new EventEmitter<number>();
  @Output() changePlaybackRate = new EventEmitter<void>();

  @ViewChild('scroll') scroll: ElementRef<HTMLDivElement>;

  formattedTime: string;
  playbackRateText: string;

  blocks: number[];
  private screenWidth = 0;
  private defaultMobileScreenWidth = 320;
  private blockWidth = 100;
  private scrollPosition = 0;

  private panMoveSource: Observable<number>;

  /**
   * it is important to recalculate amount of blocks necessary for a smooth scrolling on resize
   */
  @HostListener('window:resize')
  onResize() {
    this.screenWidth = this.window.innerWidth;
    this.blocks = this.getScrollBlocks();
    this.scrollPosition = this.getScrollPosition();
    if (this.scrollPosition <= 0) {
      this.setScrollPosition(1);
    }
  }

  constructor(@Inject(DSAPP_WINDOW) private window: Window) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalTimePassed) {
      const seconds = parseInt(this.totalTimePassed, 10) % 60;
      const minutes = parseInt(this.totalTimePassed, 10) / 60;
      this.formattedTime = `${this.getFormattedTime(minutes)}:${this.getFormattedTime(seconds)}`;
    }

    if (changes.playbackRate) {
      this.playbackRateText = `${this.playbackRate}x`;
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
  }

  onTogglePlay(): void {
    this.togglePlay.emit();
  }

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
          .subscribe(() => (this.pan.emit(event.velocityX)));
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
    const numberOfBlocks = Math.ceil((this.screenWidth || this.defaultMobileScreenWidth) * 3 / this.blockWidth);
    return Array(numberOfBlocks).fill(0);
  }

  /**
   * set scroll position with the use of setTimeout
   * not the best option but couldn't find a way to assign to scrollLeft otherwise
   * @param value
   * @private
   */
  private setScrollPosition(value: number): void {
    setTimeout(() => {this.scroll.nativeElement.scrollLeft = value;}, 1);
  }

  private getScrollPosition(): number {
    return this.scroll.nativeElement.scrollLeft - (this.scroll.nativeElement.clientLeft || 0);
  }

  /**
   * get two digit formatted number
   * @param time
   * @private
   */
  private getFormattedTime(time: number): string {
    const formattedTime = (Math.round(time * 100) / 100).toFixed(0);
    return time < 10 ? `0${formattedTime}` : `${formattedTime}`;
  }
}
