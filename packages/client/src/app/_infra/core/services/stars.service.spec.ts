import { TestBed, inject } from '@angular/core/testing';
import { StarsService } from './stars.service';

describe('Service: Stars', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarsService]
    });
  });

  it('should ...', inject([StarsService], (service: StarsService) => {
    expect(service).toBeTruthy();
  }));
});
