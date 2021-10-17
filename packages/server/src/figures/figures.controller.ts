import { CreateFigureDto, FigureDto, FigureBaseDto } from '@danskill/contract';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors
} from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FiguresService } from './figures.service';
import { Figure } from './schemas/figure.schema';

@UseGuards(JwtAuthGuard)
@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @Get('single/:id')
  @UseInterceptors(new TransformInterceptor(FigureDto))
  async findOne(@Param('id') id: Types.ObjectId): Promise<Figure> {
    return this.figuresService.findOne(id);
  }

  // @ApiBody({ type: GetAllFiguresDto })
  @Get('all/:slug')
  @UseInterceptors(new TransformInterceptor(FigureBaseDto))
  async findAll(@Param('slug') starUsername: string): Promise<Figure[]> {
    return this.figuresService.findAll({ starUsername });
  }

  @Get('all/:slug/:type')
  @UseInterceptors(new TransformInterceptor(FigureBaseDto))
  async findAllWithType(
    @Param('slug') starUsername: string,
    @Param('type') figureType: string
  ): Promise<Figure[]> {
    return this.figuresService.findAllByType({ starUsername, figureType });
  }

  // @ApiBody({ type: CreateFigureDto })
  @Roles(EnumRole.Admin)
  @Post()
  @UseInterceptors(new TransformInterceptor(FigureBaseDto))
  async create(@Body() createFigureDto: CreateFigureDto): Promise<Figure> {
    return this.figuresService.create(createFigureDto);
  }

  @Roles(EnumRole.Admin)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    const deletedFigure = await this.figuresService.remove(id);
    if (!deletedFigure) {
      throw new HttpException('Figure not found', HttpStatus.NOT_FOUND);
    }
  }
}
