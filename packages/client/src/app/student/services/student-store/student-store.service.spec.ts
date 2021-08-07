import { TestBed } from '@angular/core/testing';

import { StudentStoreService } from './student.service';

describe('StudentService', () => {
  let service: StudentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
