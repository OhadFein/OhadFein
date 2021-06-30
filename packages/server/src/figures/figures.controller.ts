import { CreateFigureDto } from '@danskill/contract';
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Figure } from './schemas/figure.schema';
import { FiguresService } from './figures.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FigureDto, FigureBaseDto, GetAllFiguresDto } from '@danskill/contract';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('figures')
export class FiguresController {
  constructor(private readonly figuresService: FiguresService) {}

  @Get('single/:id')
  @UseInterceptors(new TransformInterceptor(FigureDto))
  async findOne(@Param('id') id: Types.ObjectId): Promise<Figure> {
    return await this.figuresService.findOne(id);
  }

  @Get('all')
  @UseInterceptors(new TransformInterceptor(FigureBaseDto))
  async findAll(
    @Query() getAllFiguresDto: GetAllFiguresDto
  ): Promise<Figure[]> {
    return await this.figuresService.findAll(getAllFiguresDto);
  }

  @Roles(EnumRole.Admin)
  @Post()
  @UseInterceptors(new TransformInterceptor(FigureBaseDto))
  async create(@Body() createFigureDto: CreateFigureDto): Promise<Figure> {
    return await this.figuresService.create(createFigureDto);
  }

  @Roles(EnumRole.Admin)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<Figure> {
    const deletedFigure = await this.figuresService.remove(id);
    if (!deletedFigure) {
      throw new HttpException('Figure not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
