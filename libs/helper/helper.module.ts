import { Module } from '@nestjs/common';
import { HelperNumberService } from './services/helper.number.service';
import { HelperStringService } from './services/helper.string.service';
import { HelperObjectService } from './services/helper.object.service';

@Module({
  providers: [HelperNumberService, HelperStringService, HelperObjectService],
  exports: [HelperNumberService, HelperStringService, HelperObjectService],
})
export class HelperModule {}
