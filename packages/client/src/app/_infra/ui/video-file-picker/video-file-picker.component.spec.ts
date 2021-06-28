import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFilePickerComponent } from './video-file-picker.component';

describe('VideoFilePickerComponent', () => {
  let component: VideoFilePickerComponent;
  let fixture: ComponentFixture<VideoFilePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoFilePickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
