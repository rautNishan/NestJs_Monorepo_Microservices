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
      const existingTeacher = await this.teacherService.findOne({
        email: data.email,
      });
      if (existingTeacher) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Teacher already exists',
        });
      }

      const existingTeacherCollegeId = await this.teacherService.findOne({
        college_id: data.college_id,
      });
      if (existingTeacherCollegeId) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'College Id already exists',
        });
      }
      const existingFaculty = await this.facultyService.find({
        name: data.faculty,
      });
      if (!existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Faculty not found',
        });
      }

      existingFaculty.teacherCounts += 1; //For each new teacher added, teacherCounts will be increased by 1
      const result = await this.teacherService.registerTeacher(data);
      if (!result) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Teacher not registered',
        });
      }
      await this.facultyService.update(existingFaculty);
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
  async getAllTeacher(options?: Record<string, any>) {
    try {
      console.log('This is Options: ', options);
      const result = await this.teacherService.findAll(options);
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

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_UPDATE_TEACHER_BY_ID })
  async updateTeacherById({ id, data }) {
    try {
      const query = { _id: id };
      const existingData = await this.teacherService.findOne(query);
      if (!existingData) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Teacher not found',
        });
      }
      const result = await this.teacherService.updateTeacherById(
        existingData,
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_TEACHER_BY_ID })
  async deleteTeacher({ id }) {
    const query = { _id: id };
    const existingTeacher = await this.teacherService.findOne(query);
    if (!existingTeacher) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Faculty not found',
      });
    }
    const existingFaculty = await this.facultyService.find({
      name: existingTeacher.faculty,
    });
    if (!existingFaculty) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Faculty not found',
      });
    }
    existingFaculty.teacherCounts -= 1;
    const result = await this.teacherService.delete(id);
    await this.facultyService.update(existingFaculty);
    result.message = 'Faculty Deleted Successfully';
    return result;
  }
}
