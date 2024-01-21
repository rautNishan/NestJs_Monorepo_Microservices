import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentController } from './modules/student/student.controller';
import { TeacherController } from './modules/teacher/teacher.controller';
import { AdminController } from './modules/admin/admin.controller';

@Module({
  imports: [
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
})
export class AppModule {}
