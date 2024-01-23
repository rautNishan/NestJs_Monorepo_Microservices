import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student_service/student_service.module';
import { TeacherModule } from './modules/teacher_service/teacher_service.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import APP_CONFIG from 'libs/config/app.config';
@Module({
  imports: [
    StudentModule,
    TeacherModule,
    AdminModule,
    DatabaseModule,
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
  providers: [],
})
export class MicroServicesModule {}
