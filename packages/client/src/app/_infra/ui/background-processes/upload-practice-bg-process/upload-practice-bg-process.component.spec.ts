import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPracticeBgProcessComponent } from './upload-practice-bg-process.component';

describe('UploadPracticeBgProcessComponent', () => {
  let component: UploadPracticeBgProcessComponent;
  let fixture: ComponentFixture<UploadPracticeBgProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPracticeBgProcessComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPracticeBgProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
