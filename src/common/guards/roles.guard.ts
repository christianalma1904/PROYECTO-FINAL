// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'; // <-- ¡Importa ForbiddenException!
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no hay roles definidos, permite el acceso.
    }

    const { user } = context.switchToHttp().getRequest();

    // Importante: Asegúrate de que 'user' y 'user.role' existan.
    // Si tu JwtStrategy no adjunta un 'user' o un 'user.role', esto fallará.
    if (!user || !user.role) {
      // Si no hay usuario autenticado o no tiene rol, considera esto como prohibido.
      // AuthGuard('jwt') debería manejar esto antes, pero es una buena salvaguarda.
      throw new ForbiddenException('Acceso denegado: El rol del usuario no está definido o no se ha autenticado correctamente.');
    }

    const hasRequiredRole = requiredRoles.includes(user.role);

    if (!hasRequiredRole) {
      // Si el usuario no tiene el rol requerido, Lanza una ForbiddenException
      throw new ForbiddenException(`Acceso denegado. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}.`);
    }

    return true; // Permite el acceso si el usuario tiene el rol requerido.
  }
}