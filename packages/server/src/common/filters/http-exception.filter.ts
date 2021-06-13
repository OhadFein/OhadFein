import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message = '';

    if (exception instanceof BadRequestException) {
      const httpResponse = (exception as BadRequestException).getResponse();
      status = exception.getStatus();

      if (typeof httpResponse === 'object')
        message = (httpResponse as any).message;
    } else if (exception instanceof HttpException) {
      const httpResponse = (exception as HttpException).getResponse();
      status = exception.getStatus();

      if (typeof httpResponse === 'string') message = httpResponse;
    } else {
      Logger.error(exception); // TODO:
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
