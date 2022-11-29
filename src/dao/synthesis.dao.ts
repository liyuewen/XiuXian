import { Injectable } from '@nestjs/common';
import DesignDrawingEntity from 'src/entity/design_drawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import SynthesisEntity from 'src/entity/synthesis.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class SynthesisDao {
  synthesis = this.dataSource.getRepository(SynthesisEntity);
  designDrawing = this.dataSource.getRepository(DesignDrawingEntity);
  formula = this.dataSource.getRepository(FormulaEntity);

  constructor(private dataSource: DataSource) {}

  async createSynthesis(values: Omit<SynthesisEntity, 'id'>) {
    try {
      const synthesis = await this.synthesis.save(values);
      return synthesis;
    } catch (error) {
      throw error;
    }
  }

  async creatDesignDrawing(values: Omit<DesignDrawingEntity, 'id'>) {
    try {
      const designDrawing = await this.designDrawing.save(values);
      return designDrawing;
    } catch (error) {
      throw error;
    }
  }

  async createFormula(values: Omit<FormulaEntity, 'id'>) {
    try {
      const formula = await this.formula.save(values);
      return formula;
    } catch (error) {
      throw error;
    }
  }

  async getSynthesisList(character_id?: number) {
    try {
      const synthesisList = await this.synthesis.find({
        where: { character_id },
      });
      return synthesisList;
    } catch (error) {
      throw error;
    }
  }

  async getDesignDrawingList() {
    try {
      const designDrawingList = await this.designDrawing.find();
      return designDrawingList;
    } catch (error) {
      throw error;
    }
  }

  async getDesignDrawingById(id: number) {
    const dataSource = this.dataSource;
    try {
      const designDrawing = await dataSource
        .createQueryBuilder(DesignDrawingEntity, 'design_drawing')
        .where('design_drawing.id = :id', { id })
        .leftJoinAndMapMany(
          'design_drawing.options',
          FormulaEntity,
          'formula',
          'design_drawing.id=formula.design_drawing_id',
        )
        .getCount();
      return designDrawing;
    } catch (error) {
      throw error;
    }
  }
}
