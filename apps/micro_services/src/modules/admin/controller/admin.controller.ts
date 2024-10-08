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
      const existingStudent = await this.studentService.findOne({
        email: data.email,
      });
      if (existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Student already exists',
        });
      }
      const existingStudentCollegeId = await this.studentService.findOne({
        college_id: data.college_id,
      });
      if (existingStudentCollegeId) {
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

      existingFaculty.studentCounts += 1;
      const result = await this.studentService.registerStudent(data);
      await this.facultyService.update(existingFaculty);

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
        const existingFaculty = await this.facultyService.find({
          name: existingData.faculty,
        });

        existingFaculty.teacherCounts -= 1;

        await this.facultyService.update(existingFaculty);
        const addNewUpdatedFaculty = await this.facultyService.find({
          name: data.faculty,
        });
        addNewUpdatedFaculty.teacherCounts += 1;
        await this.facultyService.update(addNewUpdatedFaculty);
      }
      if (data.section) {
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
        if (section) {
          section.teacherCounts -= 1;
          console.log('After Find: ', section);
          await this.sectionService.update(section);
        }
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
        section: data.section,
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

  @MessagePattern({ cmd: SECTION_TCP.ADMIN_UPDATE_SECTION_BY_ID })
  async updateSectionById({ id, data }) {
    try {
      const query = { _id: id };
      const existingSection = await this.sectionService.find(query);
      if (!existingSection) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Section not found',
        });
      }
      const result = await this.sectionService.update(existingSection, data);
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

    //Delete That section from teacher Data
    await this.teacherService.updateMany(
      { section: existingSection.section },
      { $pull: { section: existingSection.section } },
    );

    //Delete That section from section Data
    await this.studentService.updateMany(
      { section: existingSection.section },
      { $pull: { section: existingSection.section } },
    );

    return result;
  }

  @MessagePattern({
    cmd: SECTION_TCP.ADMIN_FIND_ALL_TEACHER_ACCORDING_TO_SECTION,
  })
  async findAllTeacherAccordingToSection(options?: Record<string, any>) {
    try {
      const result =
        await this.teacherService.findAllAccordingToSection(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_TEACHER_SECTION })
  async deleteTeacherSectionById({ id, data }) {
    try {
      const query = { _id: id };

      const existingData = await this.teacherService.findOne(query);
      if (!existingData) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Teacher not found',
        });
      }

      if (data.section) {
        const previousSection = await this.sectionService.find({
          section: data.section,
        });
        previousSection.teacherCounts -= 1;
        await this.sectionService.update(previousSection);
      }
      const result = await this.teacherService.deleteSectionFromTeacher(
        id,
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_STUDENT })
  async getAllStudent(options?: Record<string, any>) {
    try {
      const result = await this.studentService.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_GET_ALL_NON_SECTION_STUDENT })
  async getAllNonSectionStudent(options?: Record<string, any>) {
    try {
      options = { where: { section: [] } };
      console.log('This is Options....', options);
      const result = await this.studentService.findAll(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_UPDATE_STUDENT_BY_ID })
  async updateStudentById({ id, data }) {
    try {
      const query = { _id: id };
      const existingStudent = await this.studentService.findOne(query);
      if (!existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Student not found',
        });
      }
      //If Section is Updated
      if (data.section) {
        if (existingStudent.section.includes(data.section)) {
          throw new RpcException({
            statusCode: HttpStatus.CONFLICT,
            message: 'Student already in this section',
          });
        }
      }

      //if faculty is needed to be updated
      if (data.faculty) {
        const existingFaculty = await this.facultyService.find({
          name: existingStudent.faculty,
        });

        existingFaculty.studentCounts -= 1;

        await this.facultyService.update(existingFaculty);
        const addNewUpdatedFaculty = await this.facultyService.find({
          name: data.faculty,
        });
        addNewUpdatedFaculty.studentCounts += 1;
        await this.facultyService.update(addNewUpdatedFaculty);
      }
      if (data.section) {
        const previousSection = await this.sectionService.find({
          section: data.section,
        });

        previousSection.studentCounts += 1;
        await this.sectionService.update(previousSection);
      }
      const result = await this.studentService.updateStudentById(
        existingStudent,
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_STUDENT_BY_ID })
  async deleteStudent({ id }) {
    const query = { _id: id };
    const existingStudent = await this.studentService.findOne(query);
    if (!existingStudent) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Student not found',
      });
    }

    if (existingStudent.section.length > 0) {
      for (let i = 0; i < existingStudent.section.length; i++) {
        const section = await this.sectionService.find({
          section: existingStudent.section[i],
        });
        section.studentCounts -= 1;
        await this.sectionService.update(section);
      }
    }
    const result = await this.studentService.delete(id);
    const existingFaculty = await this.facultyService.find({
      name: existingStudent.faculty,
    });
    if (existingFaculty) {
      existingFaculty.studentCounts -= 1;
      if (existingFaculty.studentCounts < 0) {
        existingFaculty.studentCounts = 0;
      }
      await this.facultyService.update(existingFaculty);
    }
    return result;
  }

  @MessagePattern({
    cmd: SECTION_TCP.ADMIN_FIND_ALL_STUDENT_ACCORDING_TO_SECTION,
  })
  async findAllStudentAccordingToSection(options?: Record<string, any>) {
    try {
      console.log('This is Options', options);

      const result =
        await this.studentService.findAllAccordingToSection(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: ADMIN_TCP.ADMIN_DELETE_STUDENT_SECTION })
  async deleteStudentSectionById({ id, data }) {
    try {
      const query = { _id: id };

      const existingData = await this.studentService.findOne(query);
      if (!existingData) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Student not found',
        });
      }

      if (data.section) {
        const previousSection = await this.sectionService.find({
          section: data.section,
        });
        previousSection.studentCounts -= 1;
        await this.sectionService.update(previousSection);
      }
      const result = await this.studentService.deleteSectionFromStudent(
        id,
        data,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
