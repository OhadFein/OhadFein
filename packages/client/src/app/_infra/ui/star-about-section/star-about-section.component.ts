import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dsapp-star-about-section',
  templateUrl: './star-about-section.component.html',
  styleUrls: ['./star-about-section.component.scss']
})
export class StarAboutSectionComponent implements AfterViewInit {
  @Input()
  text: string;

  @ViewChild('aboutSection')
  aboutSection: ElementRef<HTMLParagraphElement>;

  isRolledUp = true;

  isToggleButtonRequired = false;

  private readonly maxUnrolledTextHeight = 64;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.aboutSection) {
      const element = this.aboutSection.nativeElement;
      if (
        element.scrollHeight > this.maxUnrolledTextHeight ||
        element.clientHeight > this.maxUnrolledTextHeight
      ) {
        this.isRolledUp = true;
        this.isToggleButtonRequired = true;
      } else {
        this.isRolledUp = false;
      }
      this.cd.detectChanges();
    }
  }

  toggleText(): void {
    this.isRolledUp = !this.isRolledUp;
  }
}
