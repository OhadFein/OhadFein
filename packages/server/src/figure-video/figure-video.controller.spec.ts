import { Test, TestingModule } from '@nestjs/testing';
import { FigureVideoController } from './figure-video.controller';
import { FigureVideoService } from './figure-video.service';

describe('FigureVideoController', () => {
  let controller: FigureVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FigureVideoController],
      providers: [FigureVideoService],
    }).compile();

    controller = module.get<FigureVideoController>(FigureVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
