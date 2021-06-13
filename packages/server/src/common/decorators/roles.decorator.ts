import { SetMetadata } from '@nestjs/common';
import { EnumRole } from '../enums/role.enum';

export const Roles = (...roles: EnumRole[]) => SetMetadata('roles', roles);
