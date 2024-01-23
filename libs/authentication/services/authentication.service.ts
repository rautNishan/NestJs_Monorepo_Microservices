import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async checkAuthentication(data: any, existingData: any): Promise<string> {
    try {
      const isMatch = await bcrypt.compare(
        data.password,
        existingData.password,
      );
      if (!isMatch) {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Credentials',
        });
      }
      console.log('This is role: ', existingData.role);
      const payload = {
        username: existingData.username,
        role: existingData.role,
      };
      const secret = this.config.get<string>('app.secret');
      const token = await this.jwtService.signAsync(payload, { secret });
      return token;
    } catch (error) {
      throw error;
    }
  }
}