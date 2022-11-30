import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { NoRootAuth } from 'src/decorator/auth';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RoleAdmin } from 'src/modules/auth/roleAdmin.service';
import { RequestBody } from 'src/types/request';
import { MaterialService } from './material.service';

@UseGuards(RoleAdmin)
@Controller('/thing/material')
@UseFilters(HttpExceptionFilter)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('create')
  async create(@Body() body: RequestBody) {
    return await this.materialService.createMaterial(body);
  }

  @Get('get')
  @NoRootAuth()
  async get(@Body() body: RequestBody) {
    return await this.materialService.getMaterialById(body.id);
  }

}
