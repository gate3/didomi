import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class UsersHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // TODO - Move this conditional to a function
    if (
      request.url === '/users' &&
      request.method === 'POST' &&
      exception.getStatus() === HttpStatus.BAD_REQUEST
    ) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: 'Invalid email address provided',
        message: exception.message,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
