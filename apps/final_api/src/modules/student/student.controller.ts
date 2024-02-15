import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { STUDENT_TCP } from 'libs/constants/tcp/student/student.tcp.constant';
import { StudentLoginDto } from 'libs/dtos/studentDTO/student.login.dto';
import { GetUserInformation } from 'libs/request/decorators/getUserInfo.decorator';
import { IAuthenticatedUser } from 'libs/request/interface/authenticatedUser.interface';
import { firstValueFrom } from 'rxjs';
import {
  GetStudentAttendanceDoc,
  StudentGetProfile,
} from './docs/student.docs';
import { instanceToPlain } from 'class-transformer';
import { StudentResponseSerialization } from 'libs/response/serialization/Student/student.response.serilization';
@ApiTags('Student')
@Controller({
  version: '1',
  path: 'student',
})
export class StudentController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() data: StudentLoginDto) {
    console.log('This is data', data);
    const result = await firstValueFrom(
      this.client.send({ cmd: STUDENT_TCP.STUDENT_LOGIN }, data),
    );
    console.log('This is result', result);
    return result;
  }

  @StudentGetProfile()
  @Get('profile')
  @UseGuards(UserProtectedGuard)
  async getProfile(@GetUserInformation() user: IAuthenticatedUser) {
    const id = user.id;
    console.log('This is id', id);
    let result = await firstValueFrom(
      this.client.send({ cmd: STUDENT_TCP.GET__STUDENT_PROFILE }, { id }),
    );
    result = instanceToPlain(new StudentResponseSerialization(result));
    return result;
  }

  @GetStudentAttendanceDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-student-attendance')
  async getStudentAttendance(
    @GetUserInformation() user: IAuthenticatedUser,
    @Query('attendance_date') attendance_date?: string,
    @Query('page') page?: string,
  ) {
    const id = user.id;
    console.log('This is id', id);
    console.log('This is Page', page);

    const result = await firstValueFrom(
      this.client.send(
        { cmd: STUDENT_TCP.STUDENT_GET_ATTENDANCE },
        { id, attendance_date, page },
      ),
    );
    return result;
  }
}
