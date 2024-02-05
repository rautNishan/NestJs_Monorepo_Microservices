import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SectionEntity,
  SectionSchema,
} from 'libs/Entities/section/section.entity';
import { SectionRepository } from './section.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SectionEntity.name, schema: SectionSchema },
    ]),
  ],
  providers: [SectionRepository],
  exports: [SectionRepository],
})
export class SectionRepositoryModule {}
