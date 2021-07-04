import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsHolderComponent } from './tags-holder.component';

describe('TagsHolderComponent', () => {
  let component: TagsHolderComponent;
  let fixture: ComponentFixture<TagsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagsHolderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
