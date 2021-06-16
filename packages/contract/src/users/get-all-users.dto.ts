import { IsNotEmpty, IsEnum, NotEquals } from 'class-validator';
import { EnumRole } from 'src/common/enums/role.enum';

export class GetAllUsersDto {
  @IsNotEmpty()
  @IsEnum(EnumRole)
  @NotEquals(EnumRole.Admin)
  readonly role: EnumRole;
}
