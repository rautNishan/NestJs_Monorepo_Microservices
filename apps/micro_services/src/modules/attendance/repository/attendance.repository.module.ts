import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttendanceEntity,
  AttendanceSchema,
} from 'libs/Entities/attendance/attendance.entity';
import { AttendanceRepository } from './attendance.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttendanceEntity.name, schema: AttendanceSchema },
    ]),
  ],
  controllers: [],
  providers: [AttendanceRepository],
  exports: [AttendanceRepository],
})
export class AttendanceRepositoryModule {}
