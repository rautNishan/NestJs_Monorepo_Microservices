import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { SECTION_TCP } from 'libs/constants/tcp/section/section.tcp.constant';
import { TEACHER_TCP } from 'libs/constants/tcp/teacher/teacher.tcp.constant';
import { TeacherLoginDto } from 'libs/dtos/teacherDTO/teacher.login.dot';
import { IAttendance } from 'libs/interface/attendance.interface';
import { AttendanceService } from '../../attendance/services/attendance.service';
import { SectionService } from '../../section/services/section.service';
import { StudentService } from '../../student_service/services/student.service';
import { TeacherService } from '../services/teacher.service';
import { ATTENDANCE_STATUS } from 'libs/constants/enums/attendance.status.enum';

@Controller({})
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly sectionService: SectionService,
    private readonly studentService: StudentService,
    private readonly attendanceService: AttendanceService,
  ) {}
  // @MessagePattern({ cmd: TEACHER_TCP.REGISTER_STUDENT })
  // async registerStudent(data: any) {
  //   console.log('THis is Student Data: ', data);
  //   try {
  //     // const result = await this.teacherService.registerStudent(data);
  //     console.log('This is Result in service: ', result);
  //     return result;
  //   } catch (error) {
  //     console.log('This is Error: ', error);
  //     throw error;
  //   }
  // }

  @MessagePattern({ cmd: TEACHER_TCP.LOGIN })
  async login(data: TeacherLoginDto) {
    try {
      const result = await this.teacherService.login(data);
      return result;
    } catch (error) {
      console.log('This is Error in controller: ', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: TEACHER_TCP.GET_PROFILE })
  async getProfile({ id }) {
    const query = { _id: id };
    const existingTeacher = await this.teacherService.findOne(query);
    if (!existingTeacher) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Teacher not found',
      });
    }
    return existingTeacher;
  }

  @MessagePattern({ cmd: SECTION_TCP.TEACHER_GET_ALL_SECTION })
  async getAllSectionByTeacherId(data) {
    try {
      const { id, pageNumber, section } = data;
      const existingTeacher = await this.teacherService.findOne({ _id: id });
      if (!existingTeacher) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Teacher not found',
        });
      }
      const existingSectionTeacher = existingTeacher.section;
      //Finding From Array of Section
      const filter: { section: { $in: string[]; $regex?: RegExp } } = {
        section: { $in: existingSectionTeacher },
      };
      if (section) {
        filter.section.$regex = new RegExp(section, 'i'); // filter the sections
      }
      const dataToBeSent = await this.sectionService.findMany(
        filter,
        pageNumber,
      );
      return dataToBeSent;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({
    cmd: SECTION_TCP.TEACHER_FIND_ALL_STUDENT_ACCORDING_TO_SECTION,
  })
  async findAllStudentAccordingToSection(options?: Record<string, any>) {
    try {
      const result =
        await this.studentService.findAllAccordingToSection(options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: TEACHER_TCP.TEACHER_ADD_STUDENT_ATTENDANCE })
  async addStudentAttendance({ college_id, data }) {
    try {
      console.log('This is Data: ', data);
      const incomingHour = data.time.split(':')[0];
      const incomingMinute = data.time.split(':')[1];

      console.log('This is Incoming Hour: ', incomingHour);
      console.log('This is Incoming Minute: ', incomingMinute);

      const existingStudent = await this.studentService.findOne({
        college_id: college_id,
      });
      if (!existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Student not found',
        });
      }
      const sectionDetails = await this.sectionService.find({
        section: existingStudent.section,
      });
      console.log('This is Section Details: ', sectionDetails);
      const timeTableLength = sectionDetails.timeTable.length;
      console.log('This is Time Table Length: ', timeTableLength);
      for (let i = 0; i < timeTableLength; i++) {
        let startTimeHour;
        let status_;
        if (sectionDetails.timeTable[i].startTime.includes(':')) {
          startTimeHour = parseInt(
            sectionDetails.timeTable[i].startTime.split(':')[0],
          );
        } else {
          startTimeHour = parseInt(sectionDetails.timeTable[i].startTime);
        }
        console.log('This is Start Time Hour: ', startTimeHour);
        if (startTimeHour === parseInt(incomingHour)) {
          if (incomingMinute < 10) {
            status_ = ATTENDANCE_STATUS.PRESENT;
          }
          if (incomingMinute > 10) {
            status_ = ATTENDANCE_STATUS.LATE;
          }
          if (incomingMinute > 20) {
            status_ = ATTENDANCE_STATUS.VERY_LATE;
          }
          console.log('This is sections: ', existingStudent.section);
          const attendanceData: IAttendance = {
            student_id: existingStudent._id.toString(),
            student_name: existingStudent.name,
            section: existingStudent.section,
            attendance_date: new Date(),
            status: status_,
            timeTable: {
              startTime: sectionDetails.timeTable[i].startTime,
              endTime: sectionDetails.timeTable[i].endTime,
            },
          };
          const makeAttendance =
            await this.attendanceService.createAttendance(attendanceData);
          console.log('This is Result: ', makeAttendance);
          return makeAttendance;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: TEACHER_TCP.TEACHER_GET_STUDENT_ATTENDANCE })
  async getStudentAttendance(data: any) {
    try {
      const { id, attendance_date, page } = data;
      console.log('This is ID: ', id);
      console.log('This is Attendance Date: ', attendance_date);
      console.log('This is Page: ', page);

      const existingStudent = await this.studentService.findOne({
        _id: data.id,
      });
      if (!existingStudent) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Student not found',
        });
      }
      const filter: { student_id: string; attendance_date?: Date } = {
        student_id: existingStudent._id.toString(),
      };
      if (attendance_date) {
        const [year, month, day] = attendance_date.split('-').map(Number);

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        const endDate = new Date(
          Date.UTC(year, month - 1, day, 23, 59, 59, 999),
        );

        filter.attendance_date = { $gte: startDate, $lt: endDate } as any;
      }

      const attendanceData = await this.attendanceService.findMany(filter, {
        pageNumber: page,
      });
      return attendanceData;
    } catch (error) {
      throw error;
    }
  }
}
