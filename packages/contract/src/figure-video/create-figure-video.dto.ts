import { EnumVideoType } from './../common/enums/video-type.enum';
import { IsMongoId, IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFigureVideoDto {
  @IsMongoId({ each: true })
  stars: Types.ObjectId[]; // participants stars

  @IsString()
  key: string;

  @IsString()
  thumbnail: string;

  @IsEnum(EnumVideoType)
  type: EnumVideoType;
}
