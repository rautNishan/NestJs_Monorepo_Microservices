import { Module } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudentEntity,
  StudentSchema,
} from 'libs/Entities/student/student.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentEntity.name, schema: StudentSchema },
    ]),
  ],
  providers: [StudentRepository],
  exports: [StudentRepository],
})
export class StudentRepositoryModule {}
