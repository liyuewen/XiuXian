import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import EquipmentEntity from 'src/entity/equipment.entity';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RoleCreate } from '../auth/role_create.service';
import { EquipmentService } from './equipment.service';

@UseGuards(RoleCreate)
@Controller('goods')
@UseFilters(HttpExceptionFilter)
export class GoodsController {
  constructor(private equipmentService: EquipmentService) {}

  @Get()
  async getGoods() {
    return 'goods';
  }

  @Post('createEquipment')
  async createEquipment(@Body() body: Omit<EquipmentEntity, 'id'>) {
    return await this.equipmentService.createEquipment(body);
  }
}
