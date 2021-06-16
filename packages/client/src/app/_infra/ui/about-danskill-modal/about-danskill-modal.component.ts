import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '@core/services/configuration.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ui-about-danskill-modal',
  templateUrl: './about-danskill-modal.component.html',
  styles: []
})
export class AboutDanskillModalComponent implements OnInit {


  version = '';

  constructor(public activeModal: NgbActiveModal, protected configService: ConfigurationService) {
    const version: string = configService.getVersionString();
    this.version = version ? version : '';
  }

  ngOnInit() {
  }

}
