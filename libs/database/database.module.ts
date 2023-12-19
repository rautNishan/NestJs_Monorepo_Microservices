import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseService } from './services/database.service';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DatabaseModule {}
