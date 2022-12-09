import { Injectable } from '@nestjs/common';
import EntityCommon from 'src/common/typeorm/entityCommon';
import SynthesisDao from 'src/dao/synthesis.dao';
import SynthesisEntity from 'src/entity/synthesis.entity';

@Injectable()
export class SynthesisService {
  constructor(private synthesisDao: SynthesisDao) {}

  async createSynthesis(options: SynthesisEntity) {
    try {
      const values = await EntityCommon.verifyEntity(
        new SynthesisEntity(),
        options,
      );
      const synthesis = await this.synthesisDao.createSynthesis(values);
      return synthesis;
    } catch (error) {
      throw error;
    }
  }

  async getSynthesisList(characterId?: number) {
    try {
      const synthesisList = await this.synthesisDao.getSynthesisList(
        characterId,
      );
      return synthesisList;
    } catch (error) {
      throw error;
    }
  }
}
