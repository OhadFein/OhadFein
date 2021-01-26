import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurePrinciplesComponent } from './figure-principles.component';

describe('FigurePrinciplesComponent', () => {
  let component: FigurePrinciplesComponent;
  let fixture: ComponentFixture<FigurePrinciplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurePrinciplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurePrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
