import { Body, Controller, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { GiftThingOptions, GiftThingService } from './giftThing.service';
import { Request } from 'express';
import { RoleAdmin } from 'src/modules/auth/roleAdmin.service';

@UseGuards(RoleAdmin)
@Controller('admin/giftThing')
@UseFilters(HttpExceptionFilter)
export class GiftThingController {
  constructor(private thingService: GiftThingService) {}

  @Post('send')
  async send(@Body() body: GiftThingOptions, @Req() req: Request) {
    return await this.thingService.send(body, req);
  }
}
