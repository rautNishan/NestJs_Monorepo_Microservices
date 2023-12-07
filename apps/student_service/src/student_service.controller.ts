import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StudentServiceService } from './student_service.service';

@Controller()
export class StudentServiceController {
  constructor(private readonly studentServiceService: StudentServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    console.log('getHello');
    return this.studentServiceService.getHello();
  }
}
