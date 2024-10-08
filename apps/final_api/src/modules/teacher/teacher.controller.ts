import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserProtectedGuard } from 'libs/authentication/guard/authentication.guard';
import { SECTION_TCP } from 'libs/constants/tcp/section/section.tcp.constant';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { PAGINATION_PAGE } from 'libs/pagination/constants/pagination.constant';
import { GetUserInformation } from 'libs/request/decorators/getUserInfo.decorator';
import { IAuthenticatedUser } from 'libs/request/interface/authenticatedUser.interface';
import { TeacherResponseSerialization } from 'libs/response/serialization/Teacher/teacher.response.serialization';
import { firstValueFrom } from 'rxjs';
import {
  TeacherGetAllListStudentAccordingToSectionDoc,
  TeacherGetAllSectionDoc,
  TeacherGetProfile,
  TeacherGetStudentAttendanceDoc,
  TeacherMakeStudentAttendanceDoc,
  TeacherUpdateStudentAttendanceDoc,
} from './docs/teacher.docs';
import { Cron } from '@nestjs/schedule';
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

  @TeacherGetAllSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-section-related-to-teacher')
  async getSectionRelatedToTeacher(
    @Query('page') page?: string,
    @Query('section') section?: string,
    @GetUserInformation() user?: IAuthenticatedUser,
  ) {
    const id = user.id;
    const pageNumber = Number(page ? page : PAGINATION_PAGE);

    const result = await firstValueFrom(
      this.client.send(
        { cmd: SECTION_TCP.TEACHER_GET_ALL_SECTION },
        { id, section, pageNumber },
      ),
    );
    return result;
  }

  @TeacherGetAllListStudentAccordingToSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-student/:section')
  async getAllStudentAccordingToSection(
    @Param('section') section: string,
    @Query('search_key') search_key?: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);
      const result = await firstValueFrom(
        this.client.send(
          { cmd: SECTION_TCP.TEACHER_FIND_ALL_STUDENT_ACCORDING_TO_SECTION },
          { search_key, pageNumber, section },
        ),
      );
      //Serializing and sending back response
      const teachers = result.existingData.map((teacher) =>
        instanceToPlain(new TeacherResponseSerialization(teacher)),
      );
      return { teachers, totalCount: result.totalCount };
    } catch (error) {
      throw error;
    }
  }

  @TeacherMakeStudentAttendanceDoc()
  // @UseGuards(UserProtectedGuard)
  @Patch('/add-student-attendance/:college_id')
  async addStudentAttendance(
    @Param('college_id') college_id: string,
    @Body() data: any,
  ) {
    console.log('This is College_id', college_id);

    const result = await firstValueFrom(
      this.client.send(
        { cmd: TEACHER_TCP.TEACHER_ADD_STUDENT_ATTENDANCE },
        { college_id, data },
      ),
    );
    return result;
  }

  @TeacherGetStudentAttendanceDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-student-attendance/:id')
  async getStudentAttendance(
    @Param('id') id: string,
    @Query('attendance_date') attendance_date?: string,
    @Query('page') page?: string,
  ) {
    console.log('This is id', id);
    console.log('This is Page', page);

    const result = await firstValueFrom(
      this.client.send(
        { cmd: TEACHER_TCP.TEACHER_GET_STUDENT_ATTENDANCE },
        { id, attendance_date, page },
      ),
    );
    return result;
  }

  //This function will be called automatically every day and make student absent
  //And later when the camera is on and if student is detected
  //then addStudentAttendance function will be called to update those student attendance who are present
  // @Cron(' 1 * * * * *')
  @Get('/automatic-absent-attendance')
  async automaticAbsentAttendance() {
    console.log('This function is called');
    await firstValueFrom(
      this.client.send(
        { cmd: TEACHER_TCP.TEACHER_ADD_ABSENT_STUDENT_ATTENDANCE },
        {},
      ),
    );
  }

  @TeacherUpdateStudentAttendanceDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/update-student-attendance')
  async updateStudentAttendance(@Body() data: any) {
    console.log('This is Data', data);
    const result = await firstValueFrom(
      this.client.send(
        { cmd: TEACHER_TCP.TEACHER_UPDATE_STUDENT_ATTENDANCE },
        { data },
      ),
    );
    return result;
  }
}
