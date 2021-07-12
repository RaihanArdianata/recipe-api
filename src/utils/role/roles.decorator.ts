import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const Role_Key = 'access';
export const Roles = (role: Role[]) => SetMetadata(Role_Key, role);