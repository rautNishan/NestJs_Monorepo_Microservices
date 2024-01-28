import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
import { firstValueFrom } from 'rxjs';
import {
  AdminAddCourseDoc,
  AdminRegisterStudentDoc,
  AdminRegisterTeacherDoc,
} from './docs/admin.docs';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';

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
      console.log('API REQUEST.....');
      console.log('This is Data: ', data);
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminAddCourseDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/add-course')
  async addCourse(@Body() data: any) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_ADD_COURSE }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
