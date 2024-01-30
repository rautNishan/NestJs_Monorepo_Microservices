import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth } from 'libs/doc/decorators/doc.decorators';

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
export function AdminAddCourseDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin add Course',
      description: 'This API is for admin to add Course',
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
