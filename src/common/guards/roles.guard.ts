import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {ROLE} from '@config/role'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<ROLE[]>('roles', [context.getClass(), context.getHandler()]) || [];

    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [context.getHandler(), context.getClass()]);
    if (!roles || isPublic) {
      return true;
    }

    const user: { id: string; role: ROLE } = context.switchToHttp().getRequest().user;
    return roles.includes(user.role);
  }
}
