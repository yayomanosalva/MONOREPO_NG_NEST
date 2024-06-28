import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log('>>> ', user);
    const userRoles = user?.role;

    if (!userRoles) {
      return false; // No hay roles definidos, denegar acceso
    }

    if (user.role === Role.ADMIN) return true;

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    // console.log('requiredRoles ', requiredRoles);
    // console.log('userRoles ', userRoles);
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
