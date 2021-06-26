import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreloaderIconComponent } from './preloader-icon.component';

describe('PreloaderIconComponent', () => {
  let component: PreloaderIconComponent;
  let fixture: ComponentFixture<PreloaderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreloaderIconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
