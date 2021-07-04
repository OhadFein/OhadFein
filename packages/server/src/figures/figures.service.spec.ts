import { Test, TestingModule } from '@nestjs/testing';
import { FiguresService } from './figures.service';

describe('FiguresService', () => {
  let service: FiguresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiguresService],
    }).compile();

    service = module.get<FiguresService>(FiguresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
