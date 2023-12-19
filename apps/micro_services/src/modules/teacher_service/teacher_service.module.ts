import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database/database.module';
import { TeacherController } from './controller/teacher.service.controller';
import { TeacherService } from './services/teacher.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
