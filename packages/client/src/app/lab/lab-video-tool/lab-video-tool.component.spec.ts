import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabVideoToolComponent } from './lab-video-tool.component';

describe('LabVideoToolComponent', () => {
  let component: LabVideoToolComponent;
  let fixture: ComponentFixture<LabVideoToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabVideoToolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabVideoToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
