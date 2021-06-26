import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabControlsComponent } from './custom-lab-controls.component';

describe('CustomLabControlsComponent', () => {
  let component: CustomLabControlsComponent;
  let fixture: ComponentFixture<CustomLabControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabControlsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLabControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
