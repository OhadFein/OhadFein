import { TestBed, inject } from '@angular/core/testing';
import { BackgroundProcessesService } from './background-processes.service';

describe('Service: BackgroundProcesses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundProcessesService]
    });
  });

  it('should ...', inject([BackgroundProcessesService], (service: BackgroundProcessesService) => {
    expect(service).toBeTruthy();
  }));
});
