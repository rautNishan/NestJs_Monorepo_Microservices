import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
import { firstValueFrom } from 'rxjs';

@ApiTags('Admin')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Post('/login')
  async login(@Body() data: AdminDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_LOGIN }, { data }),
      );
      console.log('This is Result: ', result);
      return result;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }

  @UseGuards(UserProtectedGuard)
  @Post('/register-teacher')
  async registerTeacher(@Body() data: TeacherCreateDto) {
    console.log('This is Data : ', data);
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER }, { data }),
      );
      console.log('This is Result: ', result);
      return result;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
