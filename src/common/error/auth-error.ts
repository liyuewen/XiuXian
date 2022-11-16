import { HttpStatus } from '@nestjs/common';
import HttpError from './http-error';

export default class AuthError extends HttpError {
  constructor(public error: string) {
    super(error, HttpStatus.UNAUTHORIZED);
  }
}
