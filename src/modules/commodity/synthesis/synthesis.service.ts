import { Injectable } from '@nestjs/common';
import SynthesisDao from 'src/dao/synthesis.dao';
import DesignDrawingEntity from 'src/entity/designDrawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import EntityCommon from 'src/utils/entityCommon';

@Injectable()
export class SynthesisService {
  constructor(private synthesisDao: SynthesisDao) {}

  async createFormula(options: Omit<FormulaEntity, 'id'>) {
    const values = await EntityCommon.verifyEntity(
      new FormulaEntity(),
      options,
    );
    const formula = await this.synthesisDao.createFormula(values);
    return {
      id: formula.id,
    };
  }

  async creatDesignDrawing(options: Omit<DesignDrawingEntity, 'id'>) {
    const values = await EntityCommon.verifyEntity(
      new DesignDrawingEntity(),
      options,
    );
    const designDrawing = await this.synthesisDao.creatDesignDrawing(values);
    return {
      id: designDrawing.id,
    };
  }
}
