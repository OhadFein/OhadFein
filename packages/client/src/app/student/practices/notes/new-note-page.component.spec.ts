import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticePageComponent } from './practice-page.component';

describe('PracticePageComponent', () => {
  let component: PracticePageComponent;
  let fixture: ComponentFixture<PracticePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
