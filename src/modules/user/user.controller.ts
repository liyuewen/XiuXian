import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import HttpError from 'src/common/error/httpError';
import { NoAuth } from 'src/decorator/auth';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @NoAuth()
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

  @NoAuth()
  @Post('/register')
  async register(
    @Body() body: { username: string; password: string },
    @Req() req: Request,
  ) {
    return await this.userService.register(body.username, body.password, req);
  }

  @Post('/character')
  async createCharacter(
    @Body() body: { name: string; sex: number },
    @Req() req: Request,
  ) {
    return await this.userService.createCharacter(body.name, body.sex, req);
  }
}
