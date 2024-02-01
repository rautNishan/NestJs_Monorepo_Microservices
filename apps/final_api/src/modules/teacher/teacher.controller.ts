import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { firstValueFrom } from 'rxjs';

@ApiTags('Teacher')
@Controller({
  version: '1',
  path: 'teacher',
})
export class TeacherController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Post('/login')
  async login(@Body() data: TeacherLoginDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: TEACHER_TCP.LOGIN }, data),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('/registerStudent')
  async registerStudent(@Body() data: StudentCreateDto) {
    const result = await firstValueFrom(
      this.client.send({ cmd: TEACHER_TCP.REGISTER_STUDENT }, data),
    );
    return result;
  }
}
