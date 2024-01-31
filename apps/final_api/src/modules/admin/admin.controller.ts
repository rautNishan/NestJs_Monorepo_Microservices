import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { FacultyDto } from 'libs/dtos/facultyDTO/faculty.dto';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
import { TeacherResponseSerialization } from 'libs/response/serialization/Teacher/teacher.response.serialization';
import { firstValueFrom } from 'rxjs';
import {
  AdminAddFacultyDoc,
  AdminGetAllFacultyDoc,
  AdminGetAllTeacherDoc,
  AdminRegisterStudentDoc,
  AdminRegisterTeacherDoc,
} from './docs/admin.docs';

@ApiTags('Admin')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Post('/login')
  async login(@Body() data: AdminDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_LOGIN }, { data }),
      );
      return result;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }

  @AdminRegisterTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/register-teacher')
  async registerTeacher(@Body() data: TeacherCreateDto) {
    try {
      console.log('This is Data: ', data);
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminRegisterStudentDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/register-student')
  async registerStudent(@Body() data: StudentCreateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT }, { data }),
      );
      return result.map((teacher) =>
        instanceToPlain(new TeacherResponseSerialization(teacher)),
      );
    } catch (error) {
      throw error;
    }
  }

  @AdminAddFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/add-faculty')
  async addCourse(@Body() faculty: FacultyDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_ADD_FACULTY }, { faculty }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-faculty')
  async getAllFaculty() {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_GET_ALL_FACULTY }, {}),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-teacher')
  async getAllTeacher(): Promise<TeacherResponseSerialization[]> {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_GET_ALL_TEACHER }, {}),
      );
      return result.map((teacher) =>
        instanceToPlain(new TeacherResponseSerialization(teacher)),
      );
    } catch (error) {
      throw error;
    }
  }
}
