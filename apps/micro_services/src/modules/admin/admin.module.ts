import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'libs/authentication/authentication.module';
import { AdminController } from './controller/admin.controller';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AdminService } from './services/admin.service';
import { TeacherModule } from '../teacher_service/teacher_service.module';

@Module({
  imports: [AdminRepositoryModule, AuthenticationModule, TeacherModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
