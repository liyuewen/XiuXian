import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameMapDao from 'src/dao/game_map.dao';
import GameMapEntity from 'src/entity/game_map.entity';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, GameMapDao],
})
export class MapModule {}
