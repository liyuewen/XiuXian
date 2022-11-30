import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * 邮件当中的物品
 */
@Entity('mail_thing')
export default class MailThingEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'mail_id',
  })
  @IsNotEmpty()
  mailId: string;

  /**
   * 物品id
   */
  @Column({
    name: 'commodity_id',
  })
  @IsNotEmpty()
  commodityId: number;

  /**
   * 物品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
    name: 'commodity_type',
  })
  @IsNotEmpty()
  commodityType: CommodityTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  @IsNotEmpty()
  quantity: number;

  /**
   * 是否已经领取
   */
  @Column()
  @IsNotEmpty()
  received: boolean;

}
