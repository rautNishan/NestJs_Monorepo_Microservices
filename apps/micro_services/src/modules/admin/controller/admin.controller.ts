import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { FacultyService } from '../../faculty/services/faculty.service';
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
    private readonly facultyService: FacultyService,
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
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_ADD_FACULTY })
  async addFaculty({ faculty }) {
    try {
      const query = { name: faculty.name };
      const existingFaculty = await this.facultyService.find(query);
      if (existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Faculty already exists',
        });
      }
      const result = await this.facultyService.create(faculty);
      console.log('This is Result: ', result);
      result.message = 'Faculty Added Successfully';
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_FACULTY })
  async getAllFaculty() {
    try {
      const result = await this.facultyService.find();
      return result;
    } catch (error) {
      throw error;
    }
  }
  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_EDIT_FACULTY })
  async editFaculty({ data }) {
    try {
      const query = { _id: data.id };
      const existingFaculty = await this.facultyService.find(query);
      if (!existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Faculty not found',
        });
      }
      const result = await this.facultyService.update(existingFaculty, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_FACULTY_BY_ID })
  async deleteFaculty({ id }) {
    const query = { _id: id };
    const existingFaculty = await this.facultyService.find(query);
    if (!existingFaculty) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Faculty not found',
      });
    }
    const result = await this.facultyService.delete(existingFaculty);
    result.message = 'Faculty Deleted Successfully';
    return result;
  }
}
