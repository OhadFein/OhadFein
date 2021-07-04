import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLayoutComponent } from './student-layout.component';

describe('StudentLayoutComponent', () => {
  let component: StudentLayoutComponent;
  let fixture: ComponentFixture<StudentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
