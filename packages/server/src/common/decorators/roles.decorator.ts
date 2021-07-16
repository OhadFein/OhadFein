import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { EnumRole } from '../enums/role.enum';

export const Roles = (...roles: EnumRole[]): CustomDecorator => SetMetadata('roles', roles);
