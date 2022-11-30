import { Injectable } from '@nestjs/common';
import ThrowError from 'src/common/error/throwError';
import { PublicAttrEntity } from 'src/entity/public/publicAttr.entity';
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
