import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RoleAdmin } from 'src/modules/auth/roleAdmin.service';
import { RequestBody } from 'src/types/request';
import { DesignService } from './design.service';

@UseGuards(RoleAdmin)
@Controller('thing/design')
@UseFilters(HttpExceptionFilter)
export class DesignController {
  constructor(private designService: DesignService) {}

  @Post('createDrawing')
  async createDrawing(@Body() body: RequestBody) {
    return await this.designService.createDrawing(body);
  }

  @Post('createFormula')
  async createFormula(@Body() body: RequestBody) {
    return await this.designService.createFormula(body);
  }
}
