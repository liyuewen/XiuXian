import { Injectable } from '@nestjs/common';
import ThrowError from 'src/common/error/throwError';
import CharacterEntity from 'src/entity/character.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class CharacterDao {
  character = this.dataSource.getRepository(CharacterEntity);

  constructor(private dataSource: DataSource) {}

  async createCharacter(values: CharacterEntity) {
    try {
      const character = await this.character.save(values);
      return character;
    } catch (error) {
      throw new ThrowError(`CharacterDao:createCharacter ${error}`);
    }
  }

  async getCharacterById(id: number) {
    try {
      const character = await this.character.findOne({
        where: { id },
      });
      return character;
    } catch (error) {
      throw new ThrowError(`CharacterDao:getCharacterById ${error}`);
    }
  }
}
