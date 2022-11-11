import { Injectable } from '@nestjs/common';
import CharacterEntity from 'src/entity/character.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class CharacterDao {
  constructor(private dataSource: DataSource) {}

  async createCharacter(values: Omit<CharacterEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const character = await dataSource
        .createQueryBuilder()
        .insert()
        .into(CharacterEntity)
        .values(values)
        .execute();
      return character;
    } catch (error) {
      throw error;
    }
  }
}
