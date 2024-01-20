import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student_service/student_service.module';
import { TeacherModule } from './modules/teacher_service/teacher_service.module';
import { DatabaseModule } from 'libs/database/database.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [StudentModule, TeacherModule, AdminModule, DatabaseModule],
  providers: [],
})
export class MicroServicesModule {}
