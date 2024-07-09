import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  private role: string;

  constructor(role: string) {
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest<Request>();

    return this.role === req.user.role;
  }
}
