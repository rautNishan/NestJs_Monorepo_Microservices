import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { TeacherService } from '../services/teacher.service';

@Controller({})
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  // @MessagePattern({ cmd: TEACHER_TCP.REGISTER_STUDENT })
  // async registerStudent(data: any) {
  //   console.log('THis is Student Data: ', data);
  //   try {
  //     // const result = await this.teacherService.registerStudent(data);
  //     console.log('This is Result in service: ', result);
  //     return result;
  //   } catch (error) {
  //     console.log('This is Error: ', error);
  //     throw error;
  //   }
  // }

  @MessagePattern({ cmd: TEACHER_TCP.LOGIN })
  async login(data: TeacherLoginDto) {
    try {
      const result = await this.teacherService.login(data);
      return result;
    } catch (error) {
      console.log('This is Error in controller: ', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: TEACHER_TCP.GET_PROFILE })
  async getProfile({ id }) {
    const query = { _id: id };
    const existingTeacher = await this.teacherService.findOne(query);
    if (!existingTeacher) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Teacher not found',
      });
    }
    console.log('This is Existing Teacher: ', existingTeacher);
    return existingTeacher;
  }
}
