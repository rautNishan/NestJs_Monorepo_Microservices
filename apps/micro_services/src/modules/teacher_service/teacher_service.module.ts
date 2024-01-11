import { Module } from '@nestjs/common';
import { TeacherController } from './controller/teacher.service.controller';
import { TeacherRepositoryModule } from './repository/teacher.repository.module';
import { TeacherService } from './services/teacher.service';

@Module({
  imports: [TeacherRepositoryModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
