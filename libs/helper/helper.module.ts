import { Module } from '@nestjs/common';
import { HelperNumberService } from './helper.number.service';

@Module({
  providers: [HelperNumberService],
  exports: [HelperNumberService],
})
export class HelperModule {}
