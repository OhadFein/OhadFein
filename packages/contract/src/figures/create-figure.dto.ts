import { EnumDanceLevel } from './../common/enums/dance-level.enum';
import { EnumDanceType } from './../common/enums/dance-type.enum';
import { IsMongoId, IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFigureDto {
  @IsMongoId({ each: true })
  stars: Types.ObjectId[];

  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsEnum(EnumDanceType)
  type: EnumDanceType;

  @IsEnum(EnumDanceLevel)
  level: EnumDanceLevel;
}
