import { Global, Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { MaterialModule } from './material/material.module';
import { SynthesisModule } from './synthesis/synthesis.module';
import { CommodityService } from './commodity.service';
import { DesignDrawingModule } from './design/design.module';

@Global()
@Module({
  imports: [EquipmentModule, MaterialModule, SynthesisModule, DesignDrawingModule],
  providers: [CommodityService],
  exports: [CommodityService],
})
export class CommodityModule {}
