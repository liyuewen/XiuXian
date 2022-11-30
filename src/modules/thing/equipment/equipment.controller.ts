import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { NoRootAuth } from 'src/decorator/auth';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RequestBody } from 'src/types/request';
import { RoleAdmin } from '../../auth/roleAdmin.service';
import { AttributeService } from './attribute.service';
import { EquipmentService } from './equipment.service';

@UseGuards(RoleAdmin)
@Controller('/thing/equipment')
@UseFilters(HttpExceptionFilter)
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
    private attributeService: AttributeService,
  ) {}

  @Post('create')
  async createEquipment(@Body() body: RequestBody) {
    return await this.equipmentService.createEquipment(body);
  }

  @NoRootAuth()
  @Get('getList')
  async getEquipmentList() {
    return await this.equipmentService.getEquipmentList();
  }

  @Post('createAttribute')
  async createAttribute(@Body() body: RequestBody) {
    return await this.attributeService.createAttribute(body);
  }
}
