import { TestBed, inject } from '@angular/core/testing';
import { AlertErrorService } from './alert-error.service';

describe('Service: AlertError', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertErrorService]
    });
  });

  it('should ...', inject([AlertErrorService], (service: AlertErrorService) => {
    expect(service).toBeTruthy();
  }));
});
