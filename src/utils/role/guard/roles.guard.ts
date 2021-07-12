import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/role.enum';
import { Role_Key } from '../roles.decorator';
// import { Role_Key } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const {user} = await context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Role_Key, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      throw new UnauthorizedException();
    }

    const roles = [user.role]
    
    return requiredRoles.some((role) => roles?.includes(role))
  }
}
