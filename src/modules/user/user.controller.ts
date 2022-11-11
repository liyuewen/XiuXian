import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import HttpError from 'src/common/error/http-error';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  login(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    try {
      return this.userService.login(body.username, body.password, req);
    } catch (error) {
      throw new HttpError(error, 10000);
    }
  }

  @Post('/register')
  async register(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    try {
      return await this.userService.register(body.username, body.password, req);
    } catch (error) {
      throw new HttpError(error, 10001);
    }
  }

  @Post('/character')
  async createCharacter(@Body() body: { name: string; sex: number }) {
    try {
      return await this.userService.createCharacter(body.name, body.sex);
    } catch (error) {
      throw new HttpError(error, 10002);
    }
  }
}
