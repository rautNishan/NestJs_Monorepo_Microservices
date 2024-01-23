import { HttpStatus, Injectable } from '@nestjs/common';
import { TeacherRepository } from '../repository/teacher.repository';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
import * as bcrypt from 'bcrypt';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { AuthenticationService } from 'libs/authentication/services/authentication.service';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}
  // registerStudent(data: any) {
  //   console.log('This is Data in Service: ', data);
  //   return this.teacherRepository.create(data);
  // }
  async registerTeacher(data: any) {
    try {
      console.log('This is Data in Service: ', data);
      data.role = APP_USER_ROLES.TEACHER;
      data.password = await bcrypt.hash(data.password, 10);
      return this.teacherRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async login(data: TeacherLoginDto) {
    try {
      const result = await this.teacherRepository.find(data.email);
      if (!result) {
        throw new Error('No Teacher Found');
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
      return result;
    } catch (error) {
      throw error;
    }
  }
}
