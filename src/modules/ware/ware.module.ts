import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [EquipmentModule, MaterialModule],
})
export class WareModule {}
