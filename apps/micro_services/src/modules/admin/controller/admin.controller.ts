import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminService } from '../services/admin.service';
import { TeacherService } from '../../teacher_service/services/teacher.service';

@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
  ) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_LOGIN })
  async login({ data }) {
    try {
      const existingAdmin = await this.adminService.find(data.username);
      if (!existingAdmin) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No Admin found',
        });
      }
      const result = await this.adminService.login(data, existingAdmin);
      return result;
    } catch (error) {
      console.log('This is Error: ', typeof error);
      console.log('This is Error: ', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER })
  async registerTeacher({ data }) {
    console.log('This is Data : ', data);
    try {
      const result = await this.teacherService.registerTeacher(data);
      console.log('This is Result: ', result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
