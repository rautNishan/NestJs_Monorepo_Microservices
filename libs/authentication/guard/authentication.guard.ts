import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';

@Injectable()
export class UserProtectedGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('This is Token: ', token);
    if (!token) {
      console.log('No token found in header');
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('app.secret'),
      });
      console.log('This is Payload: ', payload);
      request['user'] = payload;
      console.log('This is Request: ', request['user']);
    } catch (error) {
      console.log('Error verifying token: ', error);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
    const url = request.url;
    console.log('This is URL: ', url);
    const urlToCheck = url.split('/')[1];
    console.log('This is URL to Check: ', urlToCheck);
    switch (urlToCheck) {
      case 'admin': {
        if (request['user'].role !== APP_USER_ROLES.ADMIN) {
          throw new HttpException(
            'Not Permission Only Admin can Access.',
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      }
      case 'teacher': {
        if (request['user'].role !== APP_USER_ROLES.TEACHER) {
          throw new HttpException(
            'Not Permission Only Teacher can Access.',
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      }
      case 'student': {
        if (request['user'].role !== APP_USER_ROLES.STUDENT) {
          throw new HttpException(
            'Not Permission Only Student can Access.',
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
