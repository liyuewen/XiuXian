import { Injectable } from '@nestjs/common';
import DesignDrawingDao from 'src/dao/designDrawing.dao';
import DesignDrawingEntity from 'src/entity/designDrawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import EntityCommon from 'src/common/typeorm/entityCommon';

@Injectable()
export class DesignService {
  constructor(private designDrawingDao: DesignDrawingDao) {}

  async createDrawing(options: DesignDrawingEntity) {
    const values = await EntityCommon.verifyEntity(
      new DesignDrawingEntity(),
      options,
    );
    const result = await this.designDrawingDao.createDrawing(values);
    return {
      id: result.id,
    };
  }

  async createFormula(options: FormulaEntity) {
    const values = await EntityCommon.verifyEntity(
      new FormulaEntity(),
      options,
    );
    const result = await this.designDrawingDao.createFormula(values);
    return {
      id: result.id,
    };
  }
}
