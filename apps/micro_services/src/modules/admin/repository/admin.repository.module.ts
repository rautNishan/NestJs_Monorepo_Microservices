import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminEntity, AdminSchema } from 'libs/Entities/admin/admin.entity';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminEntity.name, schema: AdminSchema },
    ]),
  ],
  providers: [AdminRepository],
  exports: [AdminRepository],
})
export class AdminRepositoryModule {}
