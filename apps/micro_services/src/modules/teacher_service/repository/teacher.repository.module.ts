import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TeacherEntity,
  TeacherSchema,
} from 'libs/Entities/teacher/teacher.entity';
import { TeacherRepository } from './teacher.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherEntity.name, schema: TeacherSchema },
    ]),
  ],
  controllers: [],
  providers: [TeacherRepository],
  exports: [TeacherRepository],
})
export class TeacherRepositoryModule {}
