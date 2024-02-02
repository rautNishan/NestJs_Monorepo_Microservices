import { Module } from '@nestjs/common';
import { TeacherController } from './controller/teacher.service.controller';
import { TeacherRepositoryModule } from './repository/teacher.repository.module';
import { TeacherService } from './services/teacher.service';
import { AuthenticationModule } from 'libs/authentication/authentication.module';
import { HelperModule } from 'libs/helper/helper.module';

@Module({
  imports: [TeacherRepositoryModule, AuthenticationModule, HelperModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
