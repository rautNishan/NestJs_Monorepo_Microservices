import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FacultyEntity,
  FacultySchema,
} from 'libs/Entities/faculty/faculty.entity';
import { FacultyRepository } from './faculty.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FacultyEntity.name, schema: FacultySchema },
    ]),
  ],
  providers: [FacultyRepository],
  exports: [FacultyRepository],
})
export class FacultyRepositoryModule {}
