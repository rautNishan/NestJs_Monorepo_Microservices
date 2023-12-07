import { Module } from '@nestjs/common';
import { StudentServiceController } from './student_service.controller';
import { StudentServiceService } from './student_service.service';

@Module({
  imports: [],
  controllers: [StudentServiceController],
  providers: [StudentServiceService],
})
export class StudentServiceModule {}
