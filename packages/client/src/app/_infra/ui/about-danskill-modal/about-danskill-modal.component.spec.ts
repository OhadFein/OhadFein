import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDanskillModalComponent } from './about-danskill-modal.component';

describe('AboutDanskillModalComponent', () => {
  let component: AboutDanskillModalComponent;
  let fixture: ComponentFixture<AboutDanskillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutDanskillModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDanskillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
