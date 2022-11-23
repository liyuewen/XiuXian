import { Injectable } from '@nestjs/common';
import SynthesisDao from 'src/dao/synthesis.dao';
import DesignDrawingEntity from 'src/entity/design_drawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class SynthesisService {
  constructor(private synthesisDao: SynthesisDao) {}

  async createFormula(values: Omit<FormulaEntity, 'id'>) {
    await Utils.validateError(values, FormulaEntity);
    const formula = await this.synthesisDao.createFormula(values);
    return true;
  }

  async creatDesignDrawing(values: Omit<DesignDrawingEntity, 'id'>) {
    await Utils.validateError(values, DesignDrawingEntity);
    const designDrawing = await this.synthesisDao.creatDesignDrawing(values);
    return true;
  }

}
