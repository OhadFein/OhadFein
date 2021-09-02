import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarAboutSectionComponent } from './star-about-section.component';

describe('StarAboutSectionComponent', () => {
  let component: StarAboutSectionComponent;
  let fixture: ComponentFixture<StarAboutSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarAboutSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarAboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
