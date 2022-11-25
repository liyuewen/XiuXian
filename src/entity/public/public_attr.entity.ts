import { Column } from 'typeorm';

export class PublicAttrEntity {
  /**
   * 攻击力
   */
  @Column({
    default: 0,
  })
  attack: number;

  /**
   * 防御力
   */
  @Column({
    default: 0,
  })
  defense: number;

  /**
   * 生命值
   */
  @Column({
    default: 0,
  })
  hp: number;

  /**
   * 精神
   */
  @Column({
    default: 0,
  })
  spirit: number;

  /**
   * 体力
   */
  @Column({
    default: 0,
  })
  physical_strength: number;

  /**
   * 灵巧
   */
  @Column({
    default: 0,
  })
  dexterous: number;

  /**
   * 幸运
   */
  @Column({
    default: 0,
  })
  lucky: number;
}
