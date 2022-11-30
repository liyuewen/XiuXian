import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import HttpError from 'src/common/error/httpError';
import { NoRootAuth } from 'src/decorator/auth';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RequestBody } from 'src/types/request';
import { RoleCreate } from '../auth/roleCreate.service';
import { MapService } from './map.service';
import { RoomService } from './room.service';

@UseGuards(RoleCreate)
@Controller('map')
@UseFilters(HttpExceptionFilter)
export class MapController {
  constructor(
    private mapService: MapService,
    private roomService: RoomService,
  ) {}

  @NoRootAuth()
  @Get('/getList')
  async getMapList(@Query() query: any) {
    try {
      return await this.mapService.getMapList();
    } catch (error) {
      throw new HttpError(error, 10000);
    }
  }

  @NoRootAuth()
  @Get('/details')
  async getMapDetails(@Query() query: { id: number }) {
    try {
      return await this.mapService.getMapDetails(query.id);
    } catch (error) {
      throw new HttpError(error, 10000);
    }
  }

  @NoRootAuth()
  @Get('/roomList')
  async getRoomList(@Query() query: { game_map_id: number }) {
    return await this.roomService.getList(query.game_map_id);
  }

  @Post('/createMap')
  async createMap(@Body() body: RequestBody) {
    return await this.mapService.createMap(body);
  }

  @Post('/createRoom')
  async createRoom(@Body() body: RequestBody) {
    return await this.roomService.createRoom(body);
  }
}
