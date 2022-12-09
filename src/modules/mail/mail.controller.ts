import { Controller, Get, Headers, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('getList')
  async getList(
    @Query('receiverId') receiverId: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Headers('token') token: string,
  ) {
    console.log(token);
    return await this.mailService.getMailList(receiverId, page, pageSize, token);
  }
}
