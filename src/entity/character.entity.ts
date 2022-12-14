import { IsNotEmpty, IsIn, Length, Matches } from 'class-validator';
import Regular from 'src/utils/regular';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import { PublicAttrEntity } from './public/attr.entity';

/**
 * 角色
 */
@Entity('character')
export default class CharacterEntity extends BasicTimeEntity {
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
   * 用户id
   */
  @Column({
    name: 'user_id',
  })
  @IsNotEmpty()
  userId: number;

  /**
   * 修为等级
   */
  @Column({name: 'xw_level'})
  xwLevel: number;

  /**
   * 科技等级
   */
  @Column({
    name: 'science_level',
  })
  scienceLevel: number;

  /**
   * 灵魂等级
   */
  @Column({
    name: 'soul_level',
  })
  soulLevel: number;

  /**
   * 修为经验
   */
  @Column({
    name: 'xw_exp',
  })
  xwExp: number;

  /**
   * 科技经验
   */
  @Column({
    name: 'science_exp',
  })
  scienceExp: number;

  /**
   * 灵魂经验
   */
  @Column({
    name: 'soul_exp',
  })
  soulExp: number;

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
  @Column({
    name: 'knapsack_max_capacity',
  })
  knapsackMaxCapacity: number;

  @Column(() => PublicAttrEntity, { prefix: false })
  attr: PublicAttrEntity;
}