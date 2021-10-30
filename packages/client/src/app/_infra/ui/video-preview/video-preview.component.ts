import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { VgAPI } from 'ngx-videogular';
import { take } from 'rxjs/operators';
import { FigureVideoBaseDto, UserBaseDto } from '@danskill/contract';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnChanges {
  @Input() figureVideo: FigureVideoBaseDto;

  @Input() stars: UserBaseDto[];

  playerAPI: VgAPI;

  participants: string;

  clipName: string;

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
    this.clipName = this.figureVideo ? `${this.figureVideo.name} view` : '';
    if (this.stars) {
      this.participants = this.getParticipants(this.stars);
    }
  }

  private getParticipants(stars: UserBaseDto[]): string {
    return stars.reduce((acc: string, star: UserBaseDto) => {
      const starInitials = `${star.firstName} ${star.lastName}`;

      return acc ? `${acc}, ${starInitials}` : `${starInitials}`;
    }, '');
  }
}
