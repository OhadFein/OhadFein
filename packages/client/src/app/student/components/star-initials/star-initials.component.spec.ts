import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarInitialsComponent } from './star-initials.component';

describe('StarInitialsComponent', () => {
  let component: StarInitialsComponent;
  let fixture: ComponentFixture<StarInitialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarInitialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
