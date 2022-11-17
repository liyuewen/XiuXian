import { MiddlewareConsumer, Module } from '@nestjs/common';
import EquipmentDao from 'src/dao/equipment.dao';
import GoodsDao from 'src/dao/goods.dao';
import { EquipmentService } from './equipment.service';
import { GoodsController } from './goods.controller';

@Module({
  imports: [],
  controllers: [GoodsController],
  providers: [EquipmentService, GoodsDao, EquipmentDao],
})
export class GoodsModule {}
