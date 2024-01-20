import { Module } from '@nestjs/common';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AdminService } from './services/admin.service';

@Module({
  imports: [AdminRepositoryModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
