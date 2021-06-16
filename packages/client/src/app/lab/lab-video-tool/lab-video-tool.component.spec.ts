import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from '@testing/pipes';
import { ToggleSwitchDirective } from '@infra/ui';
import { LabVideoToolComponent } from './lab-video-tool.component';

describe('LabVideoToolComponent', () => {
  let component: LabVideoToolComponent;
  let fixture: ComponentFixture<LabVideoToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabVideoToolComponent, TranslatePipe, ToggleSwitchDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
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
