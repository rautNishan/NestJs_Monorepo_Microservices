import { Controller, Get, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  @Get('verify')
  async verifyToken(@Request() req) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const secret = this.config.get<string>('app.secret');
      await this.jwtService.verify(token, { secret });
      return { valid: true };
    } catch (e) {
      console.log('This is Error: ', e);
      return { valid: false, message: e.message };
    }
  }
}
