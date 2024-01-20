import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Post('/admin/login')
  async login(@Body() data: any) {
    console.log('This is Data', data);
  }

  @Post('/admin/register-teacher')
  async registerTeacher(@Body() data: any) {
    console.log('This is Data : ', data);
  }
}
