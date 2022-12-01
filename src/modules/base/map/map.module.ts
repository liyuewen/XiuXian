import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { RoomService } from './room.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, RoomService],
})
export class MapModule {}
