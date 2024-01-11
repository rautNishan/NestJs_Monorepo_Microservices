import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student_service/student_service.module';
import { TeacherModule } from './modules/teacher_service/teacher_service.module';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [StudentModule, TeacherModule, DatabaseModule],
  providers: [],
})
export class MicroServicesModule {}
