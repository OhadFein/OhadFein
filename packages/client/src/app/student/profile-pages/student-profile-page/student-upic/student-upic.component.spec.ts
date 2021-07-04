import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentUpicComponent } from './student-upic.component';

describe('StudentUpicComponent', () => {
  let component: StudentUpicComponent;
  let fixture: ComponentFixture<StudentUpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUpicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
