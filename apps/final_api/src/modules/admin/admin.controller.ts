import {
  Body,
  Controller,
  Delete,
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
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { FacultyDto } from 'libs/dtos/facultyDTO/faculty.dto';
import { FacultyEditDto } from 'libs/dtos/facultyDTO/faculty.edit.dto';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
import { TeacherUpdateDto } from 'libs/dtos/teacherDTO/teacher.update.dto';
import { PAGINATION_PAGE } from 'libs/pagination/constants/pagination.constant';
import { TeacherResponseSerialization } from 'libs/response/serialization/Teacher/teacher.response.serialization';
import { firstValueFrom } from 'rxjs';
import {
  AdminAddFacultyDoc,
  AdminDeleteByIDFacultyDoc,
  AdminDeleteByIDTeacherDoc,
  AdminEditFacultyDoc,
  AdminGetAllFacultyDoc,
  AdminGetAllListTeacherDoc,
  AdminRegisterStudentDoc,
  AdminRegisterTeacherDoc,
  AdminUpdateByIDTeacherDoc,
} from './docs/admin.docs';

@ApiTags('Admin')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(@Inject('MicroService') private readonly client: ClientProxy) {}

  // @AdminGetAllListTeacherDoc()
  // @UseGuards(UserProtectedGuard)
  // @Get('teacher-list')
  // async getAllTeacherList(
  //   @PaginationQuery(PAGINATION_PER_PAGE, AVAILABLE_SEARCH)
  //   pagination: PaginationDto,
  //   // @Query('_search') _search: string,
  // ) {
  //   console.log('This is Search  ', pagination);
  // }
  @Post('/login')
  async login(@Body() data: AdminDto) {
    try {
      console.log('This is Login');

      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_LOGIN }, { data }),
      );
      return result;
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }

  @AdminRegisterTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/register-teacher')
  async registerTeacher(@Body() data: TeacherCreateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminRegisterStudentDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/register-student')
  async registerStudent(@Body() data: StudentCreateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT }, { data }),
      );
      return result.map((teacher) =>
        instanceToPlain(new TeacherResponseSerialization(teacher)),
      );
    } catch (error) {
      throw error;
    }
  }

  @AdminAddFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/add-faculty')
  async addCourse(@Body() faculty: FacultyDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_ADD_FACULTY }, { faculty }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-faculty')
  async getAllFaculty() {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_GET_ALL_FACULTY }, {}),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // @AdminGetAllTeacherDoc()
  @AdminGetAllListTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-teacher')
  async getAllTeacher(
    @Query('search_key') search_key: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);
      console.log('This is Page Number: ', pageNumber);

      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_GET_ALL_TEACHER },
          { search_key, pageNumber },
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

  @AdminEditFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/edit-faculty')
  async editFaculty(@Body() data: FacultyEditDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_EDIT_FACULTY }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminDeleteByIDFacultyDoc()
  @UseGuards(UserProtectedGuard)
  @Delete('/delete-faculty/:id')
  async deleteFaculty(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_DELETE_FACULTY_BY_ID }, { id }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminUpdateByIDTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/update-teacher/:id')
  async editTeacherDataById(@Param('id') id, @Body() data: TeacherUpdateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_UPDATE_TEACHER_BY_ID },
          { id, data },
        ),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  @AdminDeleteByIDTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Delete('/delete-teacher/:id')
  async deleteTeacher(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_DELETE_TEACHER_BY_ID }, { id }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
