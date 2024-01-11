import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Teacher')
@Controller({
  version: '1',
  path: 'teacher',
})
export class TeacherController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}
  @Post('/registerStudent')
  async registerStudent(@Body() data: StudentCreateDto) {
    console.log('This is Teacher API');
    const result = await firstValueFrom(
      this.client.send({ cmd: TEACHER_TCP.REGISTER_STUDENT }, data),
    );
    console.log('This is DataL ', result);
    return result;
  }
}
