import { CreateFigureDto } from '@danskill/contract';
import { Controller, Get, Param, Query, UseGuards, Post, Body } from '@nestjs/common';
import { Types } from 'mongoose';
import { Figure } from './schemas/figure.schema';
import { FiguresService } from './figures.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetAllFiguresDto } from '@danskill/contract';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @Get('single/:id')
  async findOne(@Param('id') id: Types.ObjectId): Promise<Figure> {
    return await this.figuresService.findOne(id);
  }

  @Get('all')
  async findAll(
    @Query() getAllFiguresDto: GetAllFiguresDto,
  ): Promise<Figure[]> {
    return await this.figuresService.findAll(getAllFiguresDto);
  }

  @Roles(EnumRole.Admin)
  @Post()
  async create(
    @Body() createFigureDto: CreateFigureDto,
  ): Promise<Figure> {
    console.log(createFigureDto)
    return await this.figuresService.create(createFigureDto);
  }
}
