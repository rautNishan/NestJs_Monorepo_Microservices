import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth, DocRequest } from 'libs/doc/decorators/doc.decorators';
import {
  ATTENDANCE_DATE,
  COLLEGE_ID,
  ID,
  PAGE,
  SEARCH,
  SECTION_NAME,
} from './constants/teacher.doc.constants';

export function TeacherGetProfile(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher Get Profile By ID',
      description: 'This API is for teacher to view profile',
      operation: 'Teacher view Profile',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function TeacherGetAllListStudentAccordingToSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher Get  Student data according to Section',
      description:
        'This API is for teacher to get Student data according to Section',
      operation: 'Teacher get Student data according to Section',
    }),
    DocRequest({
      params: [SECTION_NAME],
      queries: [SEARCH, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function TeacherGetAllSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher Get Section',
      description: 'This API is for Teacher to get Section',
      operation: 'Teacher get Section',
    }),
    DocRequest({
      queries: [SECTION_NAME, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function TeacherMakeStudentAttendanceDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher add student attendance',
      description: 'This API is for teacher to add student attendance',
      operation: 'Teacher add student attendance',
    }),
    DocRequest({
      params: [COLLEGE_ID],
    }),
    // DocAuth({ jwtAccessToken: false }),
  );
}

export function TeacherGetStudentAttendanceDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher Get  Attendance data according to Student',
      description:
        'This API is for teacher to get Attendance data according to Student',
      operation: 'Teacher get Attendance data according to Student',
    }),
    DocRequest({
      params: [ID],
      queries: [ATTENDANCE_DATE, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function TeacherUpdateStudentAttendanceDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Teacher update student attendance',
      description: 'This API is for teacher to update student attendance',
      operation: 'Teacher update student attendance',
    }),
    // DocRequest({
    //   params: [COLLEGE_ID],
    // }),
    DocAuth({ jwtAccessToken: false }),
  );
}
