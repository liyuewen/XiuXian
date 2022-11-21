import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
import { RequestBody } from 'src/types/request';
import { RoleCreate } from '../auth/role_create.service';
import { MonsterService } from './monster.service';

@UseGuards(RoleCreate)
@Controller('monster')
@UseFilters(HttpExceptionFilter)
export class MonsterController {
  constructor(private monsterService: MonsterService) {}

  @Post('create')
  async createMonster(@Body() body: RequestBody) {
    return await this.monsterService.createMonster(body);
  }
}
