import { HttpStatus } from '@nestjs/common';
import HttpError from './httpError';

export default class ThrowError extends HttpError {
  constructor(
    public error: string,
    public code: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(error, code, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
