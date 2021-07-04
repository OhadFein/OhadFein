import { Test, TestingModule } from '@nestjs/testing';
import { FigureVideoService } from './figure-video.service';

describe('FigureVideoService', () => {
  let service: FigureVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FigureVideoService],
    }).compile();

    service = module.get<FigureVideoService>(FigureVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
