import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPreviewItemComponent } from './star-preview-item.component';

describe('StarPreviewItemComponent', () => {
  let component: StarPreviewItemComponent;
  let fixture: ComponentFixture<StarPreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPreviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
