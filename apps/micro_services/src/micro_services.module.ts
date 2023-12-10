import { Module } from '@nestjs/common';
import { StudentServiceModule } from './modules/student_service/student_service.module';
import { TeacherServiceModule } from './modules/teacher_service/teacher_service.module';

@Module({
  imports: [StudentServiceModule, TeacherServiceModule],
  controllers: [],
  providers: [],
})
export class MicroServicesModule {}
