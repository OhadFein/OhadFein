import { Test, TestingModule } from '@nestjs/testing';
import { FiguresController } from './figures.controller';
import { FiguresService } from './figures.service';

describe('FiguresController', () => {
  let controller: FiguresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiguresController],
      providers: [FiguresService],
    }).compile();

    controller = module.get<FiguresController>(FiguresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
