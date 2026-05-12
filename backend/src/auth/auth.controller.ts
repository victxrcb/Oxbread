import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(private config: ConfigService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: { password: string }) {
    const adminPassword = this.config.getOrThrow('ADMIN_PASSWORD')
    if (body.password !== adminPassword) {
      throw new UnauthorizedException('Senha incorreta')
    }
    return { token: adminPassword }
  }
}
