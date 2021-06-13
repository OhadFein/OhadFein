import { Types } from 'mongoose';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetSinglePracticeDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly id: Types.ObjectId;
}
