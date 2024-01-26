import { applyDecorators } from '@nestjs/common';
import { Doc, DocAuth } from 'libs/doc/decorators/doc.decorators';

export function AdminLoginDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Admin Login',
      description: 'Admin Login',
      operation: 'Admin Login',
    }),
    DocAuth({ jwtAccessToken: true }),
  );
}
