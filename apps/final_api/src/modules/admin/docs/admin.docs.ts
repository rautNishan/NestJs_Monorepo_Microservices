import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth, DocRequest } from 'libs/doc/decorators/doc.decorators';
import {
  ID,
  PAGE,
  SEARCH,
  SEARCH_SECTION,
  SECTION_NAME,
} from './constants/admin.doc.constants';

export function AdminGetAllListTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Register Teacher',
      description: 'This API is for admin to Register Teacher',
      operation: 'Admin Register Teacher',
    }),
    DocRequest({
      queries: [SEARCH, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminRegisterTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Register Teacher',
      description: 'This API is for admin to Register Teacher',
      operation: 'Admin Register Teacher',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminRegisterStudentDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Register Student',
      description: 'This API is for admin to Register Student',
      operation: 'Admin Register Student',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminAddFacultyDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin add Faculty',
      description: 'This API is for admin to add Faculty',
      operation: 'Admin add Course',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin add Course',
      description: 'This API is for admin to add Course',
      operation: 'Admin add Course',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllFacultyDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Get Faculty',
      description: 'This API is for admin to get Faculty',
      operation: 'Admin get Faculty',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminEditFacultyDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Edit Faculty',
      description: 'This API is for admin to Edit Faculty',
      operation: 'Admin Edit Faculty',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminDeleteByIDFacultyDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Delete Faculty',
      description: 'This API is for admin to Edit Faculty',
      operation: 'Admin Edit Faculty',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminUpdateByIDTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Edit Teacher',
      description: 'This API is for admin to Edit Teacher',
      operation: 'Admin Edit Teacher',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminDeleteByIDTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Edit Teacher',
      description: 'This API is for admin to Edit Teacher',
      operation: 'Admin Edit Teacher',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminAddSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin add Section',
      description: 'This API is for admin to add Section',
      operation: 'Admin add Section',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Get Section',
      description: 'This API is for admin to get Section',
      operation: 'Admin get Section',
    }),
    DocRequest({
      queries: [SEARCH_SECTION, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminDeleteByIDSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Delete Section',
      description: 'This API is for admin to Edit Section',
      operation: 'Admin Edit Section',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminUpdateByIDSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin update Section',
      description: 'This API is for admin to update Section',
      operation: 'Admin update Section',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllListTeacherAccordingToSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Get  Teacher data according to Section',
      description:
        'This API is for admin to get Teacher data according to Section',
      operation: 'Admin get Teacher data according to Section',
    }),
    DocRequest({
      params: [SECTION_NAME],
      queries: [SEARCH, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllListStudentDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Register Teacher',
      description: 'This API is for admin to Register Teacher',
      operation: 'Admin Register Teacher',
    }),
    DocRequest({
      queries: [SEARCH, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminUpdateByIDStudentDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Edit Student',
      description: 'This API is for admin to Edit Student',
      operation: 'Admin Edit Student',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminDeleteByIDStudentDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin delete Student',
      description: 'This API is for admin to delete Student',
      operation: 'Admin delete Student',
    }),
    DocRequest({
      params: [ID],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}

export function AdminGetAllListStudentAccordingToSectionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Get  Student data according to Section',
      description:
        'This API is for admin to get Student data according to Section',
      operation: 'Admin get Student data according to Section',
    }),
    DocRequest({
      params: [SECTION_NAME],
      queries: [SEARCH, PAGE],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}
