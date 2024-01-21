import { Module } from '@nestjs/common';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AdminService } from './services/admin.service';
import { AdminController } from './controller/admin.controller';

@Module({
  imports: [AdminRepositoryModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
