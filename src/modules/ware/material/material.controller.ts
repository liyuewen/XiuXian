import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RoleCreate } from 'src/modules/auth/role_create.service';
import { RequestBody } from 'src/types/request';
import { MaterialService } from './material.service';

@UseGuards(RoleCreate)
@Controller('material')
@UseFilters(HttpExceptionFilter)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('create')
  async create(@Body() body: RequestBody) {
    return await this.materialService.createMaterial(body);
  }
}
