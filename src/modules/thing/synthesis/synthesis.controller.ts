import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RoleAdmin } from 'src/modules/auth/roleAdmin.service';
import { RequestBody } from 'src/types/request';
import { SynthesisService } from './synthesis.service';

@UseGuards(RoleAdmin)
@Controller('/thing/synthesis')
@UseFilters(HttpExceptionFilter)
export class SynthesisController {
  constructor(private synthesisService: SynthesisService) {}

}
