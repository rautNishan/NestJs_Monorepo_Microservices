import { Module } from '@nestjs/common';
import { AdminModule } from 'apps/micro_services/src/modules/admin/admin.module';
import { MigrationAdminSeed } from './seeds/migration.admin.seed';
import { DatabaseModule } from 'libs/database/database.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [AdminModule, DatabaseModule, CommandModule],
  providers: [MigrationAdminSeed],
  exports: [],
})
export class MigrationModule {}
