import { Module } from '@nestjs/common';
import { PaginationService } from './service/pagination.service';
import { HelperModule } from 'libs/helper/helper.module';

@Module({
  imports: [HelperModule],
  providers: [PaginationService],
  exports: [PaginationService, HelperModule],
})
export class PaginationModule {}
