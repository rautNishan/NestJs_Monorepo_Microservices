import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student_service/student_service.module';
import { TeacherModule } from './modules/teacher_service/teacher_service.module';

@Module({
  imports: [StudentModule, TeacherModule],
  providers: [],
})
export class MicroServicesModule {}
