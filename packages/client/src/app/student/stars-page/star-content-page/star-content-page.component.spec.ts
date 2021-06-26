import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarContentPageComponent } from './star-content-page.component';

describe('StarContentPageComponent', () => {
  let component: StarContentPageComponent;
  let fixture: ComponentFixture<StarContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarContentPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
