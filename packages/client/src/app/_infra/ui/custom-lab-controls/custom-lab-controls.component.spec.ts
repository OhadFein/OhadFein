import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CustomLabControlsComponent } from './custom-lab-controls.component';
import { DSAPP_WINDOW } from '../../core/global_variables/token';

function windowFactory() {
  return {
    requestAnimationFrame: () => {},
    dispatchEvent: () => {},
    innerWidth: 100
  };
}

describe('CustomLabControlsComponent', () => {
  let component: CustomLabControlsComponent;
  let fixture: ComponentFixture<CustomLabControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabControlsComponent],
      providers: [
        {
          provide: DSAPP_WINDOW,
          useFactory: windowFactory
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
