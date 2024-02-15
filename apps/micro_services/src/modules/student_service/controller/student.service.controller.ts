import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { STUDENT_TCP } from 'libs/constants/tcp/student/student.tcp.constant';
import { StudentLoginDto } from 'libs/dtos/studentDTO/student.login.dto';
import { StudentService } from '../services/student.service';
import { AttendanceService } from '../../attendance/services/attendance.service';

@Controller({
  version: '1',
  path: 'student',
})
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly attendanceService: AttendanceService,
  ) {}

  @MessagePattern({ cmd: STUDENT_TCP.STUDENT_LOGIN })
  async login(data: StudentLoginDto) {
    try {
      console.log('This is data', data);

      const result = await this.studentService.login(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: STUDENT_TCP.GET__STUDENT_PROFILE })
  async getProfile({ id }) {
    const query = { _id: id };
    const existingStudent = await this.studentService.findOne(query);
    if (!existingStudent) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Student not found',
      });
    }
    return existingStudent;
  }

  @MessagePattern({ cmd: STUDENT_TCP.STUDENT_GET_ATTENDANCE })
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
      if (
        attendance_date &&
        /^(\d{4})-(\d{2})-(\d{2})$/.test(attendance_date)
      ) {
        console.log('This is Attendance Date: ', attendance_date);

        const [year, month, day] = attendance_date.split('-').map(Number);

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        const endDate = new Date(
          Date.UTC(year, month - 1, day, 23, 59, 59, 999),
        );

        filter.attendance_date = { $gte: startDate, $lt: endDate } as any;
        console.log('This is Filter: ', filter);
      }
      const attendanceData = await this.attendanceService.findMany(filter, {
        pageNumber: page,
      });
      console.log('This is Attendance Data: ', attendanceData);

      return attendanceData;
    } catch (error) {
      throw error;
    }
  }
}
