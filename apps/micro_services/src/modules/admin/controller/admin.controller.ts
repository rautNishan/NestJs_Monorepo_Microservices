import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ADMIN_TCP } from 'libs/constants/tcp/admin/admin.tcp.constant';
import { FacultyService } from '../../faculty/services/faculty.service';
import { StudentService } from '../../student_service/services/student.service';
import { TeacherService } from '../../teacher_service/services/teacher.service';
import { AdminService } from '../services/admin.service';
import { SECTION_TCP } from 'libs/constants/tcp/section/section.tcp.constant';
import { SectionService } from '../../section/services/section.service';
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly facultyService: FacultyService,
    private readonly sectionService: SectionService,
  ) {}

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_LOGIN })
  async login({ data }) {
    try {
      const query = { email: data.email };
      const existingAdmin = await this.adminService.find(query);
      if (!existingAdmin) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No Admin found',
        });
      }
      const result = await this.adminService.login(data, existingAdmin);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_REGISTER_TEACHER })
  async registerTeacher({ data }) {
    try {
      const existingTeacher = await this.teacherService.findOne({
        email: data.email,
      });
      if (existingTeacher) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Teacher already exists',
        });
      }

      const existingTeacherCollegeId = await this.teacherService.findOne({
        college_id: data.college_id,
      });
      if (existingTeacherCollegeId) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'College Id already exists',
        });
      }
      const existingFaculty = await this.facultyService.find({
        name: data.faculty,
      });
      if (!existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Faculty not found',
        });
      }

      existingFaculty.teacherCounts += 1; //For each new teacher added, teacherCounts will be increased by 1
      const result = await this.teacherService.registerTeacher(data);
      if (!result) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Teacher not registered',
        });
      }
      await this.facultyService.update(existingFaculty);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_REGISTER_STUDENT })
  async registerStudent({ data }) {
    try {
      const query = { email: data.email };
      const existingStudent = await this.studentService.find(query);
      if (existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Student already exists',
        });
      }
      const result = await this.studentService.registerStudent(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_TEACHER })
  async getAllTeacher(options?: Record<string, any>) {
    try {
      const result = await this.teacherService.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_ADD_FACULTY })
  async addFaculty({ faculty }) {
    try {
      const query = { name: faculty.name };
      const existingFaculty = await this.facultyService.find(query);
      if (existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Faculty already exists',
        });
      }
      const result = await this.facultyService.create(faculty);
      result.message = 'Faculty Added Successfully';
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_FACULTY })
  async getAllFaculty() {
    try {
      const result = await this.facultyService.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_EDIT_FACULTY })
  async editFaculty({ data }) {
    try {
      const query = { _id: data.id };
      const existingFaculty = await this.facultyService.find(query);
      if (!existingFaculty) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Faculty not found',
        });
      }
      const result = await this.facultyService.update(existingFaculty, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_FACULTY_BY_ID })
  async deleteFaculty({ id }) {
    const query = { _id: id };
    const existingFaculty = await this.facultyService.find(query);
    if (!existingFaculty) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Faculty not found',
      });
    }
    const result = await this.facultyService.delete(existingFaculty);
    result.message = 'Faculty Deleted Successfully';
    return result;
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_UPDATE_TEACHER_BY_ID })
  async updateTeacherById({ id, data }) {
    try {
      const query = { _id: id };
      const existingData = await this.teacherService.findOne(query);
      if (!existingData) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Teacher not found',
        });
      }
      //If Section is Updated
      if (data.section) {
        if (existingData.section.includes(data.section)) {
          throw new RpcException({
            statusCode: HttpStatus.CONFLICT,
            message: 'Teacher already in this section',
          });
        }
      }

      //if faculty is needed to be updated
      if (data.faculty) {
        console.log('Yes Updated Data has Faculty: ', data.faculty);
        const existingFaculty = await this.facultyService.find({
          name: existingData.faculty,
        });
        console.log('This is Existing Faculty: ', existingFaculty);

        existingFaculty.teacherCounts -= 1;

        await this.facultyService.update(existingFaculty);
        console.log(
          'This is Existing Faculty after Update -1: ',
          existingFaculty,
        );
        const addNewUpdatedFaculty = await this.facultyService.find({
          name: data.faculty,
        });
        console.log('This is New Updated Faculty: ', addNewUpdatedFaculty);
        addNewUpdatedFaculty.teacherCounts += 1;
        await this.facultyService.update(addNewUpdatedFaculty);
      }
      if (data.section) {
        console.log('Yes Updated Data has Section2: ', data.section);
        const previousSection = await this.sectionService.find({
          section: data.section,
        });

        previousSection.teacherCounts += 1;
        await this.sectionService.update(previousSection);
      }
      const result = await this.teacherService.updateTeacherById(
        existingData,
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_TEACHER_BY_ID })
  async deleteTeacher({ id }) {
    const query = { _id: id };
    const existingTeacher = await this.teacherService.findOne(query);
    if (!existingTeacher) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Teacher not found',
      });
    }
    if (existingTeacher.section.length > 0) {
      for (let i = 0; i < existingTeacher.section.length; i++) {
        const section = await this.sectionService.find({
          section: existingTeacher.section[i],
        });
        section.teacherCounts -= 1;
        await this.sectionService.update(section);
      }
    }
    const result = await this.teacherService.delete(id);
    const existingFaculty = await this.facultyService.find({
      name: existingTeacher.faculty,
    });
    if (existingFaculty) {
      existingFaculty.teacherCounts -= 1;
      if (existingFaculty.teacherCounts < 0) {
        existingFaculty.teacherCounts = 0;
      }
      await this.facultyService.update(existingFaculty);
    }
    return result;
  }

  @MessagePattern({ cmd: SECTION_TCP.ADMIN_ADD_SECTION })
  async addSection({ data }) {
    try {
      const existingSection = await this.sectionService.find({
        name: data.section,
      });
      if (existingSection) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Section already exists',
        });
      }
      const result = await this.sectionService.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: SECTION_TCP.ADMIN_GET_ALL_SECTION })
  async getAllSection(options?: Record<string, any>) {
    try {
      const result = await this.sectionService.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: SECTION_TCP.ADMIN_DELETE_SECTION_BY_ID })
  async deleteSection({ id }) {
    const query = { _id: id };
    const existingSection = await this.sectionService.find(query);
    if (!existingSection) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Section not found',
      });
    }
    const result = await this.sectionService.delete(existingSection);
    result.message = 'Faculty Deleted Successfully';
    return result;
  }
}
