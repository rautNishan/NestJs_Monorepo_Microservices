import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { StudentService } from '../../student_service/services/student.service';
import { TeacherService } from '../../teacher_service/services/teacher.service';
import { AdminService } from '../services/admin.service';

@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_LOGIN })
  async login({ data }) {
    try {
      const query = { email: data.email };
      const existingAdmin = await this.adminService.find(query);
      if (!existingAdmin) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No Admin found',
        });
      }
      const result = await this.adminService.login(data, existingAdmin);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER })
  async registerTeacher({ data }) {
    try {
      const query = { email: data.email };
      const existingTeacher = await this.teacherService.find(query);
      console.log('This is Existing Teacher: ', existingTeacher);
      if (existingTeacher) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Teacher already exists',
        });
      }
      const result = await this.teacherService.registerTeacher(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT })
  async registerStudent({ data }) {
    try {
      const query = { email: data.email };
      const existingStudent = await this.studentService.find(query);
      console.log('This is Existing Student: ', existingStudent);
      if (existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Student already exists',
        });
      }
      const result = await this.studentService.registerStudent(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_TEACHER })
  async getAllTeacher() {
    try {
      const result = await this.teacherService.find();
      console.log('This is Result: ', result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
