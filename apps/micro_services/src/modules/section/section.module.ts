import { Module } from '@nestjs/common';
import { SectionRepositoryModule } from './repository/section.repository.module';
import { SectionService } from './services/section.service';

@Module({
  imports: [SectionRepositoryModule],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
