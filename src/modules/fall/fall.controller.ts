import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RequestBody } from 'src/types/request';
import { RoleAdmin } from '../auth/roleAdmin.service';
import { FallService } from './fall.service';

@UseGuards(RoleAdmin)
@Controller('fall')
@UseFilters(HttpExceptionFilter)
export class FallController {
  constructor(private fallService: FallService) {}

  @Post('create')
  async createFall(@Body() values: RequestBody) {
    return await this.fallService.createFall(values);
  }
}
