import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth, DocRequest } from 'libs/doc/decorators/doc.decorators';
import { ATTENDANCE_DATE, PAGE } from './constants/student.doc.constant';

export function StudentGetProfile(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Student Get Profile By ID',
      description: 'This API is for student to view profile',
      operation: 'Student view Profile',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function GetStudentAttendanceDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Student Get Attendance data',
      description: 'This API is for student to get Attendance data',
      operation: 'Student get Attendance data',
    }),
    DocRequest({
      queries: [ATTENDANCE_DATE, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}
