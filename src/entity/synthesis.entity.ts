import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';

/**
 * 角色合成表，用于记录角色已经学习的设计图的信息
 */
@Entity('synthesis')
export default class SynthesisEntity extends BasicTimeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 设计图id
   */
  @Column({
    name: 'design_drawing_id',
  })
  @IsNotEmpty()
  designDrawingId: number;

  /**
   * 角色id
   */
  @Column({
    name: 'character_id',
  })
  @IsNotEmpty()
  characterId: number;

}