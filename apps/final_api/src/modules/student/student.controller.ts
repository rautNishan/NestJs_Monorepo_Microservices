import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { STUDENT_TCP } from 'libs/constants/tcp/student.tcp.constant';
import { firstValueFrom } from 'rxjs';
@Controller({ version: '1', path: '/student' })
export class StudentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getAllStudents() {
    return await firstValueFrom(
      this.client.send({ cmd: STUDENT_TCP.GET_ALL_STUDENTS }, null),
    );
  }
}
