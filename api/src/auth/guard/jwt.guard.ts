import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Constants } from 'src/utils/constant';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (Constants.BY_PASS_URLS.includes(req.url)) {
      return true;
    }

    return super.canActivate(context);
  }
}
