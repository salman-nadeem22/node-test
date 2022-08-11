import { ROLE } from '@config/role';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('public', true);
export const RolesAllowed = (...roles: ROLE[]) => SetMetadata('roles', roles);
