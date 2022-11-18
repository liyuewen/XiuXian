import { MiddlewareConsumer, Module } from '@nestjs/common';
import EquipmentDao from 'src/dao/equipment.dao';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AttributeService } from './attribute/attribute.service';
import AttributeDao from 'src/dao/attribute.dao';

@Module({
  imports: [],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    AttributeService,
    EquipmentDao,
    AttributeDao,
  ],
})
export class EquipmentModule {}
