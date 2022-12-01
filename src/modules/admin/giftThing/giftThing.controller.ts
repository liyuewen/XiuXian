import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { GiftThingOptions, GiftThingService } from './giftThing.service';
import { Request } from 'express';

@Controller('admin/giftThing')
@UseFilters(HttpExceptionFilter)
export class GiftThingController {
  constructor(private thingService: GiftThingService) {}

  @Post('send')
  async send(@Body() body: GiftThingOptions, @Req() req: Request) {
    return await this.thingService.send(body, req);
  }
}
