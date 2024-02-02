import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'libs/authentication/services/authentication.service';
import { APP_USER_ROLES } from 'libs/constants/roles/app.user.roles';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { HelperObjectService } from 'libs/helper/services/helper.object.service';
import { HelperStringService } from 'libs/helper/services/helper.string.service';
import { TeacherRepository } from '../repository/teacher.repository';
@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly authenticationService: AuthenticationService,
    private readonly helperStringServiceString: HelperStringService,
    private readonly helperObjectService: HelperObjectService,
  ) {}
  async registerTeacher(data: any) {
    try {
      data.role = APP_USER_ROLES.TEACHER;
      data.password = await bcrypt.hash(data.password, 10);
      const search = this.helperStringServiceString.concat(
        data.email,
        data.college_id,
        data.name,
      );
      console.log('This is Search: ', search);
      data.search_key = search;
      return await this.teacherRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async login(data: TeacherLoginDto) {
    try {
      const query = { email: data.email };
      const result = await this.teacherRepository.findOne(query);
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

  async findOne(query?: Record<string, any>) {
    try {
      const result = await this.teacherRepository.findOne(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query?: Record<string, any>) {
    try {
      query = { search_key: new RegExp(query?.search_key, 'i') };
      console.log('This is Query: ', query);
      const result = await this.teacherRepository.findAll(query);
      console.log('This is Result: ', result);
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

  async updateTeacherById(existingData, dataToUpdate) {
    try {
      if (dataToUpdate.hasOwnProperty('password')) {
        if (dataToUpdate.password != '') {
          dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
          existingData.password = dataToUpdate.password;
        }
      }
      if (dataToUpdate.hasOwnProperty('email')) {
        existingData.email = dataToUpdate.email;
      }
      if (dataToUpdate.hasOwnProperty('name')) {
        existingData.name = dataToUpdate.name;
      }
      if (dataToUpdate.hasOwnProperty('faculty')) {
        existingData.faculty = dataToUpdate.faculty;
      }
      const result = await this.teacherRepository.update(existingData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.teacherRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
