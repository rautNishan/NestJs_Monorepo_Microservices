import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StudentServiceService } from './student_service.service';
import { STUDENT_TCP } from 'libs/constants/tcp/student.tcp.constant';

@Controller()
export class StudentServiceController {
  constructor(private readonly studentServiceService: StudentServiceService) {}

  @MessagePattern({ cmd: STUDENT_TCP.GET_ALL_STUDENTS })
  getHello(): string {
    console.log('getHello');
    return this.studentServiceService.getHello();
  }
}
