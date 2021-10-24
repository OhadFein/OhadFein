import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListPreviewComponent } from './notes-list-preview.component';

describe('NotesListPreviewComponent', () => {
  let component: NotesListPreviewComponent;
  let fixture: ComponentFixture<NotesListPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
