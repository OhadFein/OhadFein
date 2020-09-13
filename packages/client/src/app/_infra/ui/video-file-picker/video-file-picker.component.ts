import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ui-video-file-picker',
  templateUrl: './video-file-picker.component.html'
})
export class VideoFilePickerComponent implements OnInit {

  @Output() videoChange = new EventEmitter<Event>();

  isDesktop: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isDesktop = this.deviceService.isDesktop();
  }

  fileChangeEvent(event: Event): void {
    this.videoChange.emit(event);
  }


}
