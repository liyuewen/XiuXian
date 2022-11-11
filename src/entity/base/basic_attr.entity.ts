import { Column } from 'typeorm';

export abstract class BasicAttrEntity {
  /**
   * 攻击力
   */
  @Column()
  attack: number;

  /**
   * 防御力
   */
  @Column()
  defense: number;

  /**
   * 生命值
   */
  @Column()
  hp: number;

  /**
   * 精神
   */
  @Column()
  spirit: number;

  /**
   * 体力
   */
  @Column()
  physical_strength: number;

  /**
   * 灵巧
   */
  @Column()
  dexterous: number;

  /**
   * 幸运
   */
  @Column({
    default: 0,
  })
  lucky: number;
}
