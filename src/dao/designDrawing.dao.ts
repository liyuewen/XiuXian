import { Injectable } from '@nestjs/common';
import DesignDrawingEntity from 'src/entity/designDrawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class DesignDrawingDao {
  designDrawing = this.dataSource.getRepository(DesignDrawingEntity);

  formula = this.dataSource.getRepository(FormulaEntity);

  constructor(private dataSource: DataSource) {}

  async createDrawing(values: DesignDrawingEntity) {
    try {
      const designDrawing = await this.designDrawing.save(values);
      return designDrawing;
    } catch (error) {
      throw error;
    }
  }

  async createFormula(values: FormulaEntity) {
    try {
      const formula = await this.formula.save(values);
      return formula;
    } catch (error) {
      throw error;
    }
  }
}
