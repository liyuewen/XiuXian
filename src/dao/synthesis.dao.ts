import { Injectable } from '@nestjs/common';
import DesignDrawingEntity from 'src/entity/design_drawing.entity';
import FormulaEntity from 'src/entity/formula.entity';
import SynthesisEntity from 'src/entity/synthesis.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class SynthesisDao {
  constructor(private dataSource: DataSource) {}

  async createSynthesis(values: Omit<SynthesisEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const synthesis = await dataSource
        .createQueryBuilder()
        .insert()
        .into(SynthesisEntity)
        .values(values)
        .execute();
      return synthesis;
    } catch (error) {
      throw error;
    }
  }

  async creatDesignDrawing(values: Omit<DesignDrawingEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const designDrawing = await dataSource
        .createQueryBuilder()
        .insert()
        .into(DesignDrawingEntity)
        .values(values)
        .execute();
      return designDrawing;
    } catch (error) {
      throw error;
    }
  }

  async createFormula(values: Omit<FormulaEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const formula = await dataSource
        .createQueryBuilder()
        .insert()
        .into(FormulaEntity)
        .values(values)
        .execute();
      return formula;
    } catch (error) {
      throw error;
    }
  }

  async getSynthesisList(character_id?: number) {
    const dataSource = this.dataSource;
    try {
      const synthesisList = dataSource
        .getRepository(SynthesisEntity)
        .createQueryBuilder('synthesis');
      if (!!character_id) {
        return await synthesisList
          .where('synthesis.character_id = :character_id', { character_id })
          .getMany();
      } else {
        return await synthesisList.getMany();
      }
    } catch (error) {
      throw error;
    }
  }

  async getDesignDrawingList() {
    const dataSource = this.dataSource;
    try {
      const designDrawingList = await dataSource
        .getRepository(DesignDrawingEntity)
        .createQueryBuilder('designDrawing')
        .getMany();
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
