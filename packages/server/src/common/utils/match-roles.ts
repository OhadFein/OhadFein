import { User } from 'src/users/schemas/user.schema';
import { EnumRole } from '../enums/role.enum';

export const matchRoles = (user: User, roles: EnumRole[]): boolean => {
  const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));

  return user && user.roles && hasRole();
};
