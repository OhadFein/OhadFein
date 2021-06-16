import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeletePracticeDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly practiceId: string;
}
