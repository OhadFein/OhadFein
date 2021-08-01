import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListGridComponent } from './notification-list-grid.component';

describe('NotificationListGridComponent', () => {
  let component: NotificationListGridComponent;
  let fixture: ComponentFixture<NotificationListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
