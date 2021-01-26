import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurePreviewComponent } from './figure-preview.component';

describe('FigurePreviewComponent', () => {
  let component: FigurePreviewComponent;
  let fixture: ComponentFixture<FigurePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
