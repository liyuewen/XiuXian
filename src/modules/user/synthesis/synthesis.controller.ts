import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RolesGuard } from 'src/modules/auth/roleGuard.service';
import { RequestBody } from 'src/types/request';
import { SynthesisService } from './synthesis.service';

@UseGuards(RolesGuard)
@Controller('/user/synthesis')
@UseFilters(HttpExceptionFilter)
export class SynthesisController {
  constructor(private synthesisService: SynthesisService) {}

  @Post('/create')
  async createSynthesis(@Body() body: RequestBody) {
    const synthesis = await this.synthesisService.createSynthesis(body);
    return synthesis;
  }

  @Get('/list')
  async getSynthesisList(@Query('characterId') characterId: number) {
    const synthesisList = await this.synthesisService.getSynthesisList(
      characterId,
    );
    return synthesisList;
  }
}
