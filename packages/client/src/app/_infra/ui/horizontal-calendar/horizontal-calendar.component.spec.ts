import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCalendarComponent } from './horizontal-calendar.component';

describe('HorizontalCalendarComponent', () => {
  let component: HorizontalCalendarComponent;
  let fixture: ComponentFixture<HorizontalCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
