// import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsEnum, IsNumber, isString } from 'class-validator';
import { Types } from 'mongoose';
import { EnumVideoType } from '../common/enums/video-type.enum';

export class CreateFigureVideoDto {
  // @ApiProperty({ type: [Types.ObjectId] })
  @IsMongoId({ each: true })
  stars: Types.ObjectId[]; // participants stars

  // @ApiProperty({ type: String })
  @IsString()
  key: string;

  // @ApiProperty({ type: String })
  @IsString()
  thumbnail: string;

  // @ApiProperty({ enum: EnumVideoTypeValues })
  @IsEnum(EnumVideoType)
  type: EnumVideoType;

  @IsNumber()
  duration: number;

  @IsString()
  name: string;
}
