import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AttributeService } from './attribute.service';

@Module({
  imports: [],
  controllers: [EquipmentController],
  providers: [EquipmentService, AttributeService],
})
export class EquipmentModule {}
