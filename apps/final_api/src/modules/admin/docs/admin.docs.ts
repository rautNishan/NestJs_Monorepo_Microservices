import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth, DocRequest } from 'libs/doc/decorators/doc.decorators';

export function AdminGetAllListTeacherDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Register Teacher',
      description: 'This API is for admin to Register Teacher',
      operation: 'Admin Register Teacher',
    }),
    DocRequest({
      query: [
        {
          name: 'page',
          required: true,
          description: 'The page number',
          example: 1,
          type: Number,
        },
        {
          name: '_search',
          required: true,
          description: 'Search value',
          example: 'name',
          type: String,
        },
      ],
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
      summary: 'Admin add Course',
      description: 'This API is for admin to add Course',
      operation: 'Admin add Course',
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
      summary: 'Admin Edit Faculty',
      description: 'This API is for admin to Edit Faculty',
      operation: 'Admin Edit Faculty',
    }),
    DocRequest({
      params: [
        {
          name: 'id',
          required: true,
          description: 'The ID of the faculty',
          example: '60e0a6e1e9d5f7c1b8e5d7a4',
          type: String,
        },
      ],
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
      params: [
        {
          name: 'id',
          required: true,
          description: 'The ID of the Teacher',
          example: '60e0a6e1e9d5f7c1b8e5d7a4',
          type: String,
        },
      ],
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
      params: [
        {
          name: 'id',
          required: true,
          description: 'The ID of the Teacher',
          example: '60e0a6e1e9d5f7c1b8e5d7a4',
          type: String,
        },
      ],
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}
