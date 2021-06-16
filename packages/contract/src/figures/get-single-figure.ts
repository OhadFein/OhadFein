import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GetSingleFigureDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly id: Types.ObjectId;
}
