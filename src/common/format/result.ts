import ErrorStackParser from 'error-stack-parser';
import Utils from 'src/utils/utils';
import HttpError from '../error/httpError';

export interface Result<T = any> {
  statusCode: number;
  timestamp: string;
  message?: string;
  data?: T;
  error?: {
    message?: string;
    stack?: ErrorStackParser.StackFrame[];
  };
}

export default class ResultFormat<T = any> {
  constructor(public result: Result<T>) {}

  static success<T>(options: {
    data?: T;
    statusCode?: number;
    message?: string;
  }): Result<T> {
    const result = new ResultFormat<T>({
      statusCode: options.statusCode || 200,
      timestamp: new Date().toISOString(),
      data: options.data || null,
      message: options.message || '',
    });
    return result.json();
  }

  static error<T>(error: HttpError): Result<T> {
    let err: Result = {
      statusCode: error.code,
      timestamp: new Date().toISOString(),
      error: {}
    };

    if (Utils.isExists(error)) {
      err.error.message = error.message;
      err.error.stack = ErrorStackParser.parse(error);
    }
    const result = new ResultFormat<T>(err);
    return result.json();
  }

  json() {
    return this.result;
  }
}
