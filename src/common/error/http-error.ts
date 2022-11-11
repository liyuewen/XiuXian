import { HttpStatus } from '@nestjs/common';

export default class HttpError extends Error {
  constructor(
    public error: Error,
    public code: number = 500,
    public status: HttpStatus = HttpStatus.OK,
  ) {
    super();
    if(typeof error === 'string') {
      error = new Error(error);
    }
    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
  }
}
