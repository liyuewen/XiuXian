import { Column } from 'typeorm';
import { BasicTimeEntity } from './basic_time.entity';

export abstract class BasicGoodsEntity extends BasicTimeEntity {

  /**
   * 物品名称
   */
  @Column()
  name: string;

}