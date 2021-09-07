import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFigureListComponent } from './star-figure-list.component';

describe('StarFigureListComponent', () => {
  let component: StarFigureListComponent;
  let fixture: ComponentFixture<StarFigureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarFigureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarFigureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
