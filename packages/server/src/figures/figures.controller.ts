import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { Figure } from './schemas/figure.schema';
import { FiguresService } from './figures.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetAllFiguresDto } from '@danskill/contract';

@UseGuards(JwtAuthGuard)
@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @Get('single/:id')
  async findOne(@Param() id: Types.ObjectId): Promise<Figure> {
    return await this.figuresService.findOne(id);
  }

  @Get('all')
  async findAll(
    @Query() getAllFiguresDto: GetAllFiguresDto,
  ): Promise<Figure[]> {
    return await this.figuresService.findAll(getAllFiguresDto);
  }
}
