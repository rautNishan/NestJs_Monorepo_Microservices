import { Module } from '@nestjs/common';
import { TeacherController } from './controller/teacher.service.controller';
import { TeacherRepositoryModule } from './repository/teacher.repository.module';
import { TeacherService } from './services/teacher.service';
import { AuthenticationModule } from 'libs/authentication/authentication.module';
import { HelperModule } from 'libs/helper/helper.module';
import { SectionModule } from '../section/section.module';
import { StudentModule } from '../student_service/student_service.module';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [
    TeacherRepositoryModule,
    StudentModule,
    SectionModule,
    AttendanceModule,
    AuthenticationModule,
    HelperModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
