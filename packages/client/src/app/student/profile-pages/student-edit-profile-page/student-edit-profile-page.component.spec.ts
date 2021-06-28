import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditProfilePageComponent } from './student-edit-profile-page.component';

describe('StudentEditProfilePageComponent', () => {
  let component: StudentEditProfilePageComponent;
  let fixture: ComponentFixture<StudentEditProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEditProfilePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
