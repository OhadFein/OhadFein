import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ui-video-file-picker',
  templateUrl: './video-file-picker.component.html',
  styleUrls: ['./video-file-picker.component.scss']
})
export class VideoFilePickerComponent implements OnInit {
  @Output() videoChange = new EventEmitter<Event>();
  @Input() disableButtons;
  isDesktop: boolean;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    this.isDesktop = this.deviceService.isDesktop();
  }

  fileChangeEvent(event: Event): void {
    this.videoChange.emit(event);
  }
}
