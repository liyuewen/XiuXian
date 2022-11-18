import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import EquipmentEntity from 'src/entity/equipment.entity';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RoleCreate } from '../auth/role_create.service';
import { AttributeService } from './attribute/attribute.service';
import { EquipmentService } from './equipment.service';

@UseGuards(RoleCreate)
@Controller('equipment')
@UseFilters(HttpExceptionFilter)
export class EquipmentController {
  constructor(
    private equipmentService: EquipmentService,
    private attributeService: AttributeService,
  ) {}

  @Get()
  async getEquipment() {
    return 'equipment';
  }

  @Post('create')
  async createEquipment(@Body() body: Omit<EquipmentEntity, 'id'>) {
    return await this.equipmentService.createEquipment(body);
  }

  @Get('getList')
  async getEquipmentList() {
    return await this.equipmentService.getEquipmentList();
  }

  @Post('createAttribute')
  async createAttribute(@Body() body: any) {
    return await this.attributeService.createAttribute(body);
  }
}
