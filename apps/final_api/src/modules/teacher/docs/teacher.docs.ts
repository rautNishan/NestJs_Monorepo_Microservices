import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth } from 'libs/doc/decorators/doc.decorators';

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
