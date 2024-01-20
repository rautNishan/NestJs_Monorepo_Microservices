import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { AdminService } from '../../../apps/micro_services/src/modules/admin/services/admin.service';
@Injectable()
export class MigrationAdminSeed {
  constructor(private readonly adminService: AdminService) {}
  @Command({
    command: 'seed:admin',
    describe: 'Seed admin user',
  })
  async seed(): Promise<void> {
    const adminData = {
      username: 'admin',
      password: 'admin',
    };
    await this.adminService.create(adminData);
  }
}
