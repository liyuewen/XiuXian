import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RoleCreate } from 'src/modules/auth/roleCreate.service';
import { RequestBody } from 'src/types/request';
import { SynthesisService } from './synthesis.service';

@UseGuards(RoleCreate)
@Controller('/ware/synthesis')
@UseFilters(HttpExceptionFilter)
export class SynthesisController {
  constructor(private synthesisService: SynthesisService) {}

  @Post('creatDesignDrawing')
  async creatDesignDrawing(@Body() body: RequestBody) {
    return await this.synthesisService.creatDesignDrawing(body);
  }

  @Post('createFormula')
  async createFormula(@Body() body: RequestBody) {
    return await this.synthesisService.createFormula(body);
  }
}
