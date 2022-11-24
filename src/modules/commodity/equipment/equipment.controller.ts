import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { NoRootAuth } from 'src/decorator/auth';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RequestBody } from 'src/types/request';
import { RoleCreate } from '../../auth/role_create.service';
import { AttributeService } from './attribute.service';
import { EquipmentService } from './equipment.service';

@UseGuards(RoleCreate)
@Controller('/ware/equipment')
@UseFilters(HttpExceptionFilter)
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
    private attributeService: AttributeService,
  ) {}

  @NoRootAuth()
  @Get()
  async getEquipment() {
    return 'equipment';
  }

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