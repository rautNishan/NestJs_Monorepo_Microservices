import {
  ArgumentsHost,
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
    console.log('All Exception Filter....');
    console.log('This is Exception: ', exception);
    console.log(typeof exception);

    //Default values
    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      console.log('This is Http Exception: ', exception);
      status = exception.getStatus();
      message = exception.message;
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
