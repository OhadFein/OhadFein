import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFigureListItemComponent } from './star-figure-list-item.component';

describe('StarFigureListItemComponent', () => {
  let component: StarFigureListItemComponent;
  let fixture: ComponentFixture<StarFigureListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarFigureListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarFigureListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
