import { IsNotEmpty, IsIn, Length, Matches } from 'class-validator';
import Regular from 'src/utils/regular';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicAttrEntity } from './base/basic_attr.entity';

/**
 * 角色
 */
@Entity('character')
export default class CharacterEntity extends BasicAttrEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * 角色名
   */
  @Column()
  @IsNotEmpty()
  @Matches(Regular.IS_CHINESE_ENGLISH_NUMBERS, {
    message: '角色名只能是中文、英文、数字',
  })
  @Length(2, 10, { message: '角色名长度为2-10个字符' })
  name: string;

  /**
   * 修为等级
   */
  @Column()
  xw_level: number;

  /**
   * 科技等级
   */
  @Column()
  kj_level: number;

  /**
   * 灵魂等级
   */
  @Column()
  soul_level: number;

  /**
   * 修为经验
   */
  @Column()
  xw_exp: number;

  /**
   * 科技经验
   */
  @Column()
  kj_exp: number;

  /**
   * 灵魂经验
   */
  @Column()
  soul_exp: number;

  /**
   * 1:男 2:女
   */
  @Column({
    type: 'tinyint',
  })
  @IsNotEmpty()
  @IsIn([1, 2], {
    message: '性别只能是1:男 2:女',
  })
  sex: number;

  /**
   * 背包最大容量
   */
  @Column()
  knapsack_max: number;

}
