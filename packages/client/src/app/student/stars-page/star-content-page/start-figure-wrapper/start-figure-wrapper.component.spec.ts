import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFigureWrapperComponent } from './start-figure-wrapper.component';

describe('StartFigureWrapperComponent', () => {
  let component: StartFigureWrapperComponent;
  let fixture: ComponentFixture<StartFigureWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartFigureWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartFigureWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
