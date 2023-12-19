import { Controller } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { MessagePattern } from '@nestjs/microservices';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';

@Controller({})
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @MessagePattern({ cmd: TEACHER_TCP.REGISTER_STUDENT })
  registerStudent(data: any) {
    console.log('THis is Student Data: ', data);
  }
}
