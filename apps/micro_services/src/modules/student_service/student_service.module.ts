import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.service.controller';
import { StudentRepositoryModule } from './repository/student.repository.module';
import { StudentService } from './services/student.service';

@Module({
  imports: [StudentRepositoryModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
