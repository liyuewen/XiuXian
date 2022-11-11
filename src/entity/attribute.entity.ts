import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 装备特效
 */
@Entity('attribute')
export default class AttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 装备等级
   * 有些特效只有装备到达一定等级出现
   */
  @Column()
  level: number;

  /**
   * 装备特效名称
   */
  @Column({
    length: '15',
  })
  name: string;

  /**
   * 装备特效描述
   */
  @Column({
    length: '50',
  })
  desc: string;

  /**
   * 装备特效类型
   * 1攻击类，2防御类，3辅助类, 4控制类
   */
  @Column({
    default: '0',
    length: '2',
  })
  type: string;

  /**
   * 触发概率
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  probability: number;

  /**
   * 加成比例
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  proportion: number;

  /**
   * 持续回合
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  continuous: number;

  /**
   * 冷却时间
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  cooling_time: number;
}
