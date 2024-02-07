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
import { SECTION_TCP } from 'libs/constants/tcp/section/section.tcp.constant';
import { AdminDto } from 'libs/dtos/adminDTO/admin.dto';
import { FacultyDto } from 'libs/dtos/facultyDTO/faculty.dto';
import { FacultyEditDto } from 'libs/dtos/facultyDTO/faculty.edit.dto';
import { SectionCreateDto } from 'libs/dtos/sectionDTO/section.create.dto';
import { StudentCreateDto } from 'libs/dtos/studentDTO/student.register.dto';
import { TeacherCreateDto } from 'libs/dtos/teacherDTO/teacher.create.dot';
import { TeacherUpdateDto } from 'libs/dtos/teacherDTO/teacher.update.dto';
import { PAGINATION_PAGE } from 'libs/pagination/constants/pagination.constant';
import { StudentResponseSerialization } from 'libs/response/serialization/Student/student.response.serilization';
import { TeacherResponseSerialization } from 'libs/response/serialization/Teacher/teacher.response.serialization';
import { firstValueFrom } from 'rxjs';
import {
  AdminAddFacultyDoc,
  AdminAddSectionDoc,
  AdminDeleteByIDFacultyDoc,
  AdminDeleteByIDSectionDoc,
  AdminDeleteByIDTeacherDoc,
  AdminEditFacultyDoc,
  AdminGetAllFacultyDoc,
  AdminGetAllListStudentAccordingToSectionDoc,
  AdminGetAllListStudentDoc,
  AdminGetAllListTeacherAccordingToSectionDoc,
  AdminGetAllListTeacherDoc,
  AdminGetAllSectionDoc,
  AdminRegisterStudentDoc,
  AdminRegisterTeacherDoc,
  AdminUpdateByIDStudentDoc,
  AdminUpdateByIDTeacherDoc,
} from './docs/admin.docs';
import { StudentUpdateDto } from 'libs/dtos/studentDTO/student.update.dto';

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
      let result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER }, { data }),
      );
      result = instanceToPlain(new TeacherResponseSerialization(result));
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
      let result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT }, { data }),
      );
      result = instanceToPlain(new StudentResponseSerialization(result));
      return result;
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

  @AdminAddSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Post('/add-section')
  async addSection(@Body() data: SectionCreateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: SECTION_TCP.ADMIN_ADD_SECTION }, { data }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-section')
  async getAllSection(
    @Query('section') section?: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);
      const result = await firstValueFrom(
        this.client.send(
          { cmd: SECTION_TCP.ADMIN_GET_ALL_SECTION },
          {
            section,
            pageNumber,
          },
        ),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminDeleteByIDSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Delete('/delete-section/:id')
  async deleteSection(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: SECTION_TCP.ADMIN_DELETE_SECTION_BY_ID },
          { id },
        ),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllListTeacherAccordingToSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-teacher/:section')
  async getAllTeacherAccordingToSection(
    @Param('section') section: string,
    @Query('search_key') search_key: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);
      const result = await firstValueFrom(
        this.client.send(
          { cmd: SECTION_TCP.ADMIN_FIND_ALL_TEACHER_ACCORDING_TO_SECTION },
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

  @AdminUpdateByIDTeacherDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/delete-teacher-section/:id')
  async deleteTeacherSectionById(
    @Param('id') id,
    @Body() data: TeacherUpdateDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_DELETE_TEACHER_SECTION },
          { id, data },
        ),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllListStudentDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-student')
  async getAllStudent(
    @Query('search_key') search_key: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);

      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_GET_ALL_STUDENT },
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

  @AdminUpdateByIDStudentDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/update-student/:id')
  async editStudentDataById(@Param('id') id, @Body() data: StudentUpdateDto) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_UPDATE_STUDENT_BY_ID },
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
  @Delete('/delete-student/:id')
  async deleteStudent(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: ADMIN_TCP.ADMIN_DELETE_STUDENT_BY_ID }, { id }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @AdminGetAllListStudentAccordingToSectionDoc()
  @UseGuards(UserProtectedGuard)
  @Get('/get-all-student/:section')
  async getAllStudentAccordingToSection(
    @Param('section') section: string,
    @Query('search_key') search_key: string,
    @Query('page') page?: string,
  ) {
    try {
      const pageNumber = Number(page ? page : PAGINATION_PAGE);
      const result = await firstValueFrom(
        this.client.send(
          { cmd: SECTION_TCP.ADMIN_FIND_ALL_STUDENT_ACCORDING_TO_SECTION },
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

  @AdminUpdateByIDStudentDoc()
  @UseGuards(UserProtectedGuard)
  @Patch('/delete-student-section/:id')
  async deleteStudentSectionById(
    @Param('id') id,
    @Body() data: TeacherUpdateDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: ADMIN_TCP.ADMIN_DELETE_STUDENT_SECTION },
          { id, data },
        ),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
