import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import HttpError from 'src/common/error/http-error';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { MapService } from './map.service';

@Controller('map')
@UseFilters(HttpExceptionFilter)
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/test')
  async test(@Query() query: any) {
    try {
      return await this.mapService.test();
    } catch (error) {
      throw new HttpError(error, 10000);
    }
  }

  @Get('/details')
  async getMapDetails(@Query() query: any) {
    try {
      return await this.mapService.getMapDetails(query.id);
    } catch (error) {
      throw new HttpError(error, 10000);
    }
  }
}
