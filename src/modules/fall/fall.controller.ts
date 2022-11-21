import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RequestBody } from 'src/types/request';
import { RoleCreate } from '../auth/role_create.service';
import { FallService } from './fall.service';

@UseGuards(RoleCreate)
@Controller('fall')
@UseFilters(HttpExceptionFilter)
export class FallController {
  constructor(private fallService: FallService) {}

  @Post('create')
  async createFall(@Body() values: RequestBody) {
    return await this.fallService.createFall(values);
  }
}
