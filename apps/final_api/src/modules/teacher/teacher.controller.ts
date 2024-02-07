import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { GetUserInformation } from 'libs/request/decorators/getUserInfo.decorator';
import { IAuthenticatedUser } from 'libs/request/interface/authenticatedUser.interface';
import { TeacherResponseSerialization } from 'libs/response/serialization/Teacher/teacher.response.serialization';
import { firstValueFrom } from 'rxjs';
import { TeacherGetProfile } from './docs/teacher.docs';

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

  @TeacherGetProfile()
  @UseGuards(UserProtectedGuard)
  @Get('/profile')
  async getProfile(
    // @Param('id') id: string,
    @GetUserInformation() user: IAuthenticatedUser,
  ) {
    const id = user.id;
    let result = await firstValueFrom(
      this.client.send({ cmd: TEACHER_TCP.GET_PROFILE }, { id }),
    );
    console.log('This is result', result);
    result = instanceToPlain(new TeacherResponseSerialization(result));
    return result;
  }

  // @Post('/registerStudent')
  // async registerStudent(@Body() data: StudentCreateDto) {
  //   const result = await firstValueFrom(
  //     this.client.send({ cmd: TEACHER_TCP.REGISTER_STUDENT }, data),
  //   );
  //   return result;
  // }
}
