import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class GetAllPracticesDto {
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  readonly figureId?: Types.ObjectId;
}
