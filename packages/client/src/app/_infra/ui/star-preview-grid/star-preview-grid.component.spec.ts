import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPreviewGridComponent } from './star-preview-grid.component';

describe('StarPreviewGridComponent', () => {
  let component: StarPreviewGridComponent;
  let fixture: ComponentFixture<StarPreviewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPreviewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPreviewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
