// import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsEnum, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { EnumVideoType } from '../common/enums/video-type.enum';
import { EnumShootingAngle } from '../common/enums/shooting-angle.enum';

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

  @IsEnum(EnumShootingAngle)
  shooting_angle: EnumShootingAngle;
}
