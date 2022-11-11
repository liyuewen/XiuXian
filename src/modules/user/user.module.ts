import { MiddlewareConsumer, Module } from '@nestjs/common';
import CharacterDao from 'src/dao/character.dao';
import UserDao from 'src/dao/user.dao';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, CharacterDao, UserDao],
})
export class UserModule {}
