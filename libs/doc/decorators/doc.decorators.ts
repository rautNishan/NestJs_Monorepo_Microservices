import { applyDecorators } from '@nestjs/common';
import {
  IDocAuthOptions,
  IDocOptions,
  IDocRequestOptions,
} from '../interfaces/doc.interface';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

// Doc
export function Doc(options?: IDocOptions): MethodDecorator {
  const currentTimestamp: number = new Date().valueOf();
  return applyDecorators(
    ApiOperation({
      summary: options?.summary,
      description: options?.description,
      deprecated: options?.deprecated,
      operationId: options?.operation,
    }),
    ApiHeaders([
      {
        name: 'FYP',
        description: 'Final Year Project',
        required: false,
        schema: {
          default: 'FYP',
          example: 'FYP',
          type: 'string',
        },
      },
      {
        name: 'x-custom-lang',
        description: 'Custom language header',
        required: false,
        schema: {
          default: 'en',
          example: 'en',
          type: 'string',
        },
      },
      {
        name: 'x-timestamp',
        description: 'Timestamp header, in microseconds',
        required: false,
        schema: {
          default: currentTimestamp,
          example: currentTimestamp,
          type: 'number',
        },
      },
    ]),
  );
}

export function DocRequest(options?: IDocRequestOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  if (options?.params) {
    const params: MethodDecorator[] = options.params.map((param) => {
      return ApiParam(param);
    });
    docs.push(...params);
  }
  if (options?.query) {
    const query: MethodDecorator[] = options.query.map((query) => {
      return ApiParam(query);
    });
    docs.push(...query);
  }
  return applyDecorators(...docs);
}

export function DocAuth(options?: IDocAuthOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];
  if (options?.jwtAccessToken) {
    docs.push(ApiBearerAuth());
  }
  if (options?.jwtRefreshToken) {
    docs.push(ApiBearerAuth());
  }
  return applyDecorators(...docs);
}
