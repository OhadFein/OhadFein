// import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { EnumDanceLevel, EnumDanceLevelValues } from '../common/enums/dance-level.enum';
import { EnumDanceType, EnumDanceTypeValues } from '../common/enums/dance-type.enum';

export class CreateFigureDto {
  // @ApiProperty({ type: [Types.ObjectId] })
  @IsMongoId({ each: true })
  stars: Types.ObjectId[];

  // @ApiProperty({ type: String })
  @IsString()
  name: string;

  // @ApiProperty({ enum: EnumDanceTypeValues })
  @IsString()
  logo: string;

  // @ApiProperty({ enum: EnumDanceTypeValues })
  @IsEnum(EnumDanceType)
  type: EnumDanceType;

  // @ApiProperty({ enum: EnumDanceLevelValues })
  @IsEnum(EnumDanceLevel)
  level: EnumDanceLevel;
}
