import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { Name, IStar } from '@core/models/star.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsapp-star-info',
  templateUrl: './star-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarInfoComponent implements OnInit {


  @Input() star: IStar;

  cuttedAchivments: Array<string> = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (this.star && this.star.achievements) {
      this.cuttedAchivments = this.star.achievements.slice(0, 2);
    }
  }

  openPromoModal(starName: Name | string, promoUrl: string) {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = promoUrl;
    modalRef.componentInstance.title = starName;
    modalRef.componentInstance.autoplay = true;
  }

}
