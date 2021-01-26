import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurePracticesComponent } from './figure-practices.component';

describe('FigurePracticesComponent', () => {
  let component: FigurePracticesComponent;
  let fixture: ComponentFixture<FigurePracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurePracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurePracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
