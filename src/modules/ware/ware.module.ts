import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';
import { SynthesisModule } from './synthesis/synthesis.module';

@Module({
  imports: [EquipmentModule, MaterialModule, SynthesisModule],
})
export class WareModule {}
