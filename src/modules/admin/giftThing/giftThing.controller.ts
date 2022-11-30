import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RequestBody } from 'src/types/request';
import { GiftThingOptions, GiftThingService } from './giftThing.service';

@Controller('admin/giftThing')
@UseFilters(HttpExceptionFilter)
export class GiftThingController {

  constructor(private thingService: GiftThingService) { }

  @Post("send")
  async send(@Body() body: GiftThingOptions) {
    return await this.thingService.send(body);
  }

}
