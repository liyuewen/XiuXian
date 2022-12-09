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
    return await this.mailService.getMailList(
      receiverId,
      page,
      pageSize,
      token,
    );
  }

  @Get('getMail')
  async getMail(@Query('mailId') mailId: number, @Headers('token') token: string) {
    return await this.mailService.getMailById(mailId, token);
  }
}
