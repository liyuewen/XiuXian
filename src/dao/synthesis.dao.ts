import { Injectable } from '@nestjs/common';
import SynthesisEntity from 'src/entity/synthesis.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class SynthesisDao {
  synthesis = this.dataSource.getRepository(SynthesisEntity);

  constructor(private dataSource: DataSource) {}

  async createSynthesis(values: SynthesisEntity) {
    try {
      const synthesis = await this.synthesis.save(values);
      return synthesis;
    } catch (error) {
      throw error;
    }
  }

  async getSynthesisList(characterId?: number) {
    try {
      const synthesisList = await this.synthesis.find({
        where: { characterId },
      });
      return synthesisList;
    } catch (error) {
      throw error;
    }
  }

}
