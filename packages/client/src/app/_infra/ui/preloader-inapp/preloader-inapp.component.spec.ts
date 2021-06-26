import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderInappComponent } from './preloader-inapp.component';

describe('PreloaderInappComponent', () => {
  let component: PreloaderInappComponent;
  let fixture: ComponentFixture<PreloaderInappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreloaderInappComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderInappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
