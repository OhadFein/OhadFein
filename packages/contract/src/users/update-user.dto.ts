import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  constructor(firstName: string, lastName: string, coachSlug?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (coachSlug) this.coachSlug = coachSlug;
  }

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  coachSlug?: string;
}
