import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundProcessesComponent } from './background-processes.component';

describe('BackgroundProcessesComponent', () => {
  let component: BackgroundProcessesComponent;
  let fixture: ComponentFixture<BackgroundProcessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundProcessesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
