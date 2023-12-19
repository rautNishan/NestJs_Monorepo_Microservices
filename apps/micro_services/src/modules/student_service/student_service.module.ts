import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.service.controller';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [],
})
export class StudentModule {}
