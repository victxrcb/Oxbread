import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest()
    const auth: string = req.headers.authorization ?? ''
    const token = auth.replace('Bearer ', '').trim()

    if (!token || token !== this.config.get('ADMIN_PASSWORD')) {
      throw new UnauthorizedException('Acesso não autorizado')
    }
    return true
  }
}
