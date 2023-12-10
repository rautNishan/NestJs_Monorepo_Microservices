import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.service.controller';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [],
})
export class StudentServiceModule {}
