import { Global, Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';
import { SynthesisModule } from './synthesis/synthesis.module';
import { CommodityService } from './commodity.service';
import MaterialDao from 'src/dao/material.dao';
import EquipmentDao from 'src/dao/equipment.dao';

@Global()
@Module({
  imports: [EquipmentModule, MaterialModule, SynthesisModule],
  providers: [CommodityService],
  exports: [CommodityService],
})
export class CommodityModule {}
