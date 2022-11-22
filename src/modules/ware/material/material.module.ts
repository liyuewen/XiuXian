import { Module } from '@nestjs/common';
import MaterialDao from 'src/dao/material.dao';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, MaterialDao],
})
export class MaterialModule {}
