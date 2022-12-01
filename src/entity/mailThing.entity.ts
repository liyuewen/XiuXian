import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import AssociateThingEntity from './public/associateThing.entity';

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
  mailId: number;

  /**
   * 当前配方需要的物品
   */
  @Column(() => AssociateThingEntity, { prefix: false })
  thing: AssociateThingEntity;

  /**
   * 是否已经领取
   */
  @Column({
    default: false,
  })
  received: boolean;
}
