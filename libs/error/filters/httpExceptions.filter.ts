import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    //Default values
    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof RpcException) {
      const exceptionContent = exception.getError();
      if (typeof exceptionContent === 'object' && exceptionContent !== null) {
        status = (exceptionContent as { statusCode: number }).statusCode || 500;
        message =
          (exceptionContent as { message: string }).message ||
          'Internal server error';
      }
    }

    response.status(status).json({
      language: 'english',
      time: new Date().toISOString(),
      request: {
        method: request.method,
        url: request.url,
      },
      statusCode: status,
      message,
    });
  }
}
