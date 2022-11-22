import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicAttrEntity } from './base/basic_attr.entity';

/**
 * 怪物
 * TODO: 怪物的技能
 */
@Entity('monster')
export default class MonsterEntity extends BasicAttrEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  /**
   * 怪物描述
   * 一般不展示
   */
  @Column()
  @IsNotEmpty()
  desc: string;

  /**
   * 修为等级
   */
  @Column()
  @IsNotEmpty()
  xw_level: number;

  // /**
  //  * 科技等级
  //  */
  // @Column()
  // kj_level: number;

  /**
   * 怪物可以触发的特效"1,2,3,4"这种形式存储
   */
  @Column({
    default: '',
  })
  attribute_id: string;
}
