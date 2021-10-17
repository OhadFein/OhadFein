import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges } from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { take } from 'rxjs/operators';
import { FigureDto, FigureVideoBaseDto, UserBaseDto } from '@danskill/contract';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnChanges {
  @Input() figure: FigureDto;

  @Input() figureVideo: FigureVideoBaseDto;

  playerAPI: VgAPI;

  participants: string;

  clipName: string;

  constructor(private elRef: ElementRef) {}

  onPlayerReady(api: VgAPI): void {
    this.playerAPI = api;
    this.playerAPI.volume = 0;
    this.playerAPI
      .getDefaultMedia()
      .subscriptions.canPlay.pipe(take(1))
      .subscribe(() => {
        this.playerAPI.play();
      });
  }

  ngOnChanges(): void {
    this.clipName = this.figureVideo ? `${this.figureVideo.shooting_angle} view` : '';
    if (this.figure) {
      this.participants = this.getParticipants(this.figure.stars);
    }
  }

  private getParticipants(stars: UserBaseDto[]): string {
    return stars.reduce((acc: string, star: UserBaseDto) => {
      const starInitials = `${star.firstName} ${star.lastName}`;

      return acc ? `${acc}, ${starInitials}` : `${starInitials}`;
    }, '');
  }
}
