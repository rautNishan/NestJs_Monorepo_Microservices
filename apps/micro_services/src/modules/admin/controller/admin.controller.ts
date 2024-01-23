import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminService } from '../services/admin.service';

@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_LOGIN })
  async login({ data }) {
    try {
      const existingAdmin = await this.adminService.find(data.username);
      if (!existingAdmin) {
        console.log('No Admin found');
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No Admin found',
        });
      }
      const result = await this.adminService.login(data, existingAdmin);
      console.log('This is Result: ', result);
    } catch (error) {
      console.log('This is Error: ', typeof error);
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
