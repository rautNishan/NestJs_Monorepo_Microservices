import { MongooseModule } from '@nestjs/mongoose';
import { AdminEntity, AdminSchema } from 'libs/Entities/admin/admin.entity';
import { AdminRepository } from './admin.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminEntity.name, schema: AdminSchema },
    ]),
  ],
  controllers: [],
  providers: [AdminRepository],
  exports: [AdminRepository],
})
export class AdminRepositoryModule {}
