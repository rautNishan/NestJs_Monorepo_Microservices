import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { AdminService } from '../../../apps/micro_services/src/modules/admin/services/admin.service';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
@Injectable()
export class MigrationAdminSeed {
  constructor(private readonly adminService: AdminService) {}
  @Command({
    command: 'seed:admin',
    describe: 'Seed admin user',
  })
  async seed(): Promise<any> {
    const adminData = {
      email: 'admin@gmail.com',
      password: 'admin',
      role: APP_USER_ROLES.ADMIN,
    };
    const existingData = await this.adminService.find();

    if (existingData) {
      return;
    }
    await this.adminService.create(adminData);
  }
}
