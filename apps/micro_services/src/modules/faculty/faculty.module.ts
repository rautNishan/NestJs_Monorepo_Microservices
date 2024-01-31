import { Module } from '@nestjs/common';
import { FacultyRepositoryModule } from './repository/faculty.repository.module';
import { FacultyService } from './services/faculty.service';

@Module({
  imports: [FacultyRepositoryModule],
  providers: [FacultyService],
  exports: [FacultyService],
})
export class FacultyModule {}
