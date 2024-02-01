import { HttpStatus, Injectable } from '@nestjs/common';
import { TeacherRepository } from '../repository/teacher.repository';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
import * as bcrypt from 'bcrypt';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { AuthenticationService } from 'libs/authentication/services/authentication.service';
import { RpcException } from '@nestjs/microservices';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}
  async registerTeacher(data: TeacherCreateDto) {
    try {
      data.role = APP_USER_ROLES.TEACHER;
      data.password = await bcrypt.hash(data.password, 10);
      return await this.teacherRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async login(data: TeacherLoginDto) {
    try {
      const query = { email: data.email };
      const result = await this.teacherRepository.find(query);
      if (!result) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Teacher not found',
        });
      }
      const isAuthenticated =
        await this.authenticationService.checkAuthentication(data, result);
      if (!isAuthenticated) {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Credentials',
        });
      }
      return isAuthenticated;
    } catch (error) {
      throw error;
    }
  }

  async find(query?: Record<string, any>) {
    try {
      const result = await this.teacherRepository.find(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // async getAllTeacher() {
  //   try {
  //     const result = await this.teacherRepository.find();
  //     console.log('This is Result: ', result);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
