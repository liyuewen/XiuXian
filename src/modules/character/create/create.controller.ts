import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RoleAdmin } from 'src/modules/auth/roleAdmin.service';
import { RequestBody } from 'src/types/request';
import { CreateService } from './create.service';

@UseGuards(RoleAdmin)
@Controller('character/create')
@UseFilters(HttpExceptionFilter)
export class CreateController {
  constructor(private createService: CreateService) {}

  @Post('knapsack')
  async createKnapsack(@Body() body: RequestBody) {
    return await this.createService.createKnapsack(body);
  }
}
