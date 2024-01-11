import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DataBaseService } from './services/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from 'libs/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DataBaseService,
    }),
  ],
  providers: [DataBaseService],
  exports: [DataBaseService, MongooseModule],
})
export class DatabaseModule {}
