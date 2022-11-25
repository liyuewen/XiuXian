import { Injectable } from '@nestjs/common';
import ThrowError from 'src/common/error/throw_error';
import { PublicAttrEntity } from 'src/entity/public/public_attr.entity';
import CharacterEntity from 'src/entity/character.entity';
import { DataSource } from 'typeorm';

export type CharacterEntityType = Omit<
  CharacterEntity & PublicAttrEntity,
  'id' | 'public_attr'
>;

@Injectable()
export default class CharacterDao {
  constructor(private dataSource: DataSource) {}

  async createCharacter(values: Partial<CharacterEntityType>) {
    const dataSource = this.dataSource;
    try {
      const character = await dataSource
        .createQueryBuilder()
        .insert()
        .into<CharacterEntityType>(CharacterEntity)
        .values(values)
        .execute();
      return character;
    } catch (error) {
      throw new ThrowError(`CharacterDao:createCharacter ${error}`);
    }
  }
}
