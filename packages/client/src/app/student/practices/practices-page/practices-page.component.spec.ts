import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesPageComponent } from './practices-page.component';

describe('PracticesPageComponent', () => {
  let component: PracticesPageComponent;
  let fixture: ComponentFixture<PracticesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticesPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
