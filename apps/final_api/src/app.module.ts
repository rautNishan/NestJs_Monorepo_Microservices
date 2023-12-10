import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentController } from './modules/student/student.controller';
import { TeacherController } from './modules/teacher/teacher.controller';

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
  controllers: [StudentController, TeacherController],
})
export class AppModule {}
