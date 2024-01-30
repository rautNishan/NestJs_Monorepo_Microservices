import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from 'libs/authentication/authentication.module';
import { AdminController } from './modules/admin/admin.controller';
import { StudentController } from './modules/student/student.controller';
import { TeacherController } from './modules/teacher/teacher.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'libs/response/interceptors/response.interceptor';

@Module({
  imports: [
    AuthenticationModule,
    ClientsModule.register([
      {
        name: 'MicroService',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [StudentController, TeacherController, AdminController],
  providers: [
    //For Global Guard
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
