import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/httpException/httpException.filter';
import { RequestBody } from 'src/types/request';
import { RoleAdmin } from '../../auth/roleAdmin.service';
import { MonsterService } from './monster.service';

@UseGuards(RoleAdmin)
@Controller('monster')
@UseFilters(HttpExceptionFilter)
export class MonsterController {
  constructor(private monsterService: MonsterService) {}

  @Post('create')
  async createMonster(@Body() body: RequestBody) {
    return await this.monsterService.createMonster(body);
  }
}
