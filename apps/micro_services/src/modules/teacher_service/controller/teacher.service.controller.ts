import { Controller } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { MessagePattern } from '@nestjs/microservices';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';

@Controller({})
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @MessagePattern({ cmd: TEACHER_TCP.REGISTER_STUDENT })
  async registerStudent(data: any) {
    console.log('THis is Student Data: ', data);
    try {
      const result = await this.teacherService.registerStudent(data);
      console.log('This is Result in service: ', result);
      return result;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}