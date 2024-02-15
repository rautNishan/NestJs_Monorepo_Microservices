import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'libs/authentication/authentication.module';
import { HelperModule } from 'libs/helper/helper.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { StudentController } from './controller/student.service.controller';
import { StudentRepositoryModule } from './repository/student.repository.module';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    StudentRepositoryModule,
    HelperModule,
    AuthenticationModule,
    AttendanceModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
