import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { DSAPP_WINDOW } from '@core/global_variables/token';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'dsapp-custom-lab-controls',
  templateUrl: './custom-lab-controls.component.html',
  styleUrls: ['./custom-lab-controls.component.scss']
})
export class CustomLabControlsComponent implements OnInit, AfterViewInit {
  @Input() isPlaying: boolean;
  @Output() togglePlay = new EventEmitter<void>();
  @Output() pan = new EventEmitter<number>();

  @ViewChild('scroll') scroll: ElementRef<HTMLDivElement>;

  blocks: number[];
  private screenWidth = 0;
  private defaultMobileScreenWidth = 320;
  private blockWidth = 100;
  private scrollPosition = 0;

  private panMoveSource: Observable<number>;

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

  onPanMove(event): void {
    if (!this.panMoveSource) {
      const eventToSend = event;
      this.panMoveSource = timer(50);
      this.panMoveSource.subscribe(() => {
        this.pan.emit(eventToSend.velocityX);
        this.panMoveSource = null;
      })
    }
  }

  private scrollUpdate(shift: number): void {
    if (shift < 0) {
      this.setScrollPosition(-shift);
    } else {
      this.setScrollPosition(this.screenWidth - shift);
    }
  }

  private getScrollBlocks(): number[] {
    const numberOfBlocks = Math.ceil((this.screenWidth || this.defaultMobileScreenWidth) * 3 / this.blockWidth);
    return Array(numberOfBlocks).fill(0);
  }

  private setScrollPosition(value: number): void {
    // need this timeout to assign to a scrollLeft property a shift value
    setTimeout(() => {this.scroll.nativeElement.scrollLeft = value;}, 1);
  }

  private getScrollPosition(): number {
    return this.scroll.nativeElement.scrollLeft - (this.scroll.nativeElement.clientLeft || 0);
  }
}
