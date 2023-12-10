import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { STUDENT_TCP } from 'libs/constants/tcp/student/student.tcp.constant';
import { firstValueFrom } from 'rxjs';
@Controller({
  version: '1',
  path: 'student',
})
export class StudentController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Get('login')
  async login() {
    return await firstValueFrom(
      this.client.send({ cmd: STUDENT_TCP.LOGIN }, 'login'),
    );
  }
}
