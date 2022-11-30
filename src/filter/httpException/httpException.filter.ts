import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import HttpError from 'src/common/error/httpError';
import ResultFormat from 'src/common/format/result';
import LoggerCommon from 'src/common/logger/logger.service';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error: HttpError;
    let status: number;
    if (exception instanceof HttpError) {
      error = exception;
      status = error.status;
    } else {
      status = exception['status'] || 200;
      error = new HttpError(exception as unknown as Error, status, status);
    }
    LoggerCommon.error(
      `status: ${status} \n ${error.message} \n ${error.stack}`,
    );
    response.status(status).json(ResultFormat.error(error));
  }
}
