import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPreviewCarouselComponent } from './horizontal-preview-carousel.component';

describe('HorizontalPreviewCarouselComponent', () => {
  let component: HorizontalPreviewCarouselComponent;
  let fixture: ComponentFixture<HorizontalPreviewCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalPreviewCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalPreviewCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
