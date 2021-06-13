import { Controller } from '@nestjs/common';
import { FigureVideoService } from './figure-video.service';

@Controller('figure-video')
export class FigureVideoController {
  constructor(private readonly figureVideoService: FigureVideoService) {}
}
