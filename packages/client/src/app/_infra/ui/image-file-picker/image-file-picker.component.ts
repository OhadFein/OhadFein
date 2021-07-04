import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ui-image-file-picker',
  templateUrl: './image-file-picker.component.html'
})
export class ImageFilePickerComponent implements OnInit {
  @Output() pictureChange = new EventEmitter<Event>();

  isDesktop: boolean;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    this.isDesktop = this.deviceService.isDesktop();
  }

  fileChangeEvent(event: Event): void {
    this.pictureChange.emit(event);
  }
}
