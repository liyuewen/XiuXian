import { Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';

@Controller('admin/thing')
@UseFilters(HttpExceptionFilter)
export class ThingController {

  @Post("gift")
  async gift() {
    return "gift";
  }

}
