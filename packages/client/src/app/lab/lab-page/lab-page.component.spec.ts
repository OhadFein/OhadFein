import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPageComponent } from './lab-page.component';

describe('LabPageComponent', () => {
  let component: LabPageComponent;
  let fixture: ComponentFixture<LabPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
