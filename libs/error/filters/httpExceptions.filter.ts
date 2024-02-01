import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    //Default values
    let status = 500;
    let message = 'Internal server error';
    if (exception instanceof BadRequestException) {
      console.log('This is BadReq: ', exception);

      status = exception.getStatus();
      const responseData = exception.getResponse();
      message = responseData['message'];
      if (message.length == 1) {
        message = message[0];
        message = message.toUpperCase();
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      message = message.toUpperCase();
    } else if (typeof exception === 'object' && exception !== null) {
      status = (exception as { statusCode: number }).statusCode || 500;
      message =
        (exception as { message: string }).message || 'Internal server error';
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
