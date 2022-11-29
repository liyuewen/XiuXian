import { Injectable } from '@nestjs/common';
import ThrowError from 'src/common/error/throw_error';
import { PublicAttrEntity } from 'src/entity/public/public_attr.entity';
import CharacterEntity from 'src/entity/character.entity';
import { DataSource } from 'typeorm';

export type CharacterEntityType = Omit<
  CharacterEntity & PublicAttrEntity,
  'id'
>;

@Injectable()
export default class CharacterDao {
  character = this.dataSource.getRepository(CharacterEntity);

  constructor(private dataSource: DataSource) {}

  async createCharacter(values: Partial<CharacterEntityType>) {
    try {
      const character = await this.character.save(values);
      return character;
    } catch (error) {
      throw new ThrowError(`CharacterDao:createCharacter ${error}`);
    }
  }
}
