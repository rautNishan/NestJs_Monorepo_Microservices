import { Module } from '@nestjs/common';
import { AttendanceRepositoryModule } from './repository/attendance.repository.module';
import { AttendanceService } from './services/attendance.service';

@Module({
  imports: [AttendanceRepositoryModule],
  controllers: [],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
