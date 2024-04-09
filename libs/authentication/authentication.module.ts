import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Joi from 'joi';
import APP_CONFIG from '../../libs/config/app.config';
import { UserProtectedGuard } from './guard/authentication.guard';
import { AuthenticationService } from './services/authentication.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      //Validation for .env files
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        SECRET_KEY: Joi.string().required(),
      }),
      load: [APP_CONFIG],
    }),
  ],
  providers: [AuthenticationService, JwtService, UserProtectedGuard],
  exports: [AuthenticationService, JwtService, UserProtectedGuard],
})
export class AuthenticationModule {}
