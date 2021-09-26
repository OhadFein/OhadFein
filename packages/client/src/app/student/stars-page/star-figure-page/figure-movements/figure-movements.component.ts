import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FigureDto, FigureVideoBaseDto, StarDto } from '@danskill/contract';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dsapp-figure-movements',
  templateUrl: './figure-movements.component.html',
  styleUrls: ['./figure-movements.component.scss']
})
export class FigureMovementsComponent implements OnChanges {
  @Input()
  slug: string;

  @Input()
  figure: FigureDto;

  @Input()
  star: StarDto;

  @Input()
  movements: FigureVideoBaseDto[] = [];

  @Output() videoSelected = new EventEmitter<FigureVideoBaseDto>();

  @Output() videoPreview = new EventEmitter<FigureVideoBaseDto>();

  currentVideoId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if ('movements' in changes && this.movements?.length) {
      this.currentVideoId = this.movements[0]._id;
      console.log(this.movements);
      console.log(this.figure);
    }
  }

  onVideoSelectedEvent(video: FigureVideoBaseDto): void {
    this.currentVideoId = video._id;
    this.videoPreview.emit(video);
  }

  openInLab(video: FigureVideoBaseDto): void {
    this.videoSelected.emit(video);
  }
}
