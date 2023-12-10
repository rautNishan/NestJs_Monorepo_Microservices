import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { STUDENT_TCP } from 'libs/constants/tcp/student/student.tcp.constant';

@Controller({
  version: '1',
  path: 'student',
})
export class StudentController {
  @MessagePattern({ cmd: STUDENT_TCP.LOGIN })
  login() {
    return 'login';
  }
}
