import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * 邮件表
 */
@Entity('mail')
export default class MailEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  @IsNotEmpty()
  title: string;

  @Column({
    default: '',
  })
  content: string;

  /**
   * 发送的角色id
   */
  @Column({
    name: 'character_id',
  })
  @IsNotEmpty()
  characterId: number;

  /**
   * 接收者的角色id
   */
  @Column({
    name: 'receiver_id',
  })
  @IsNotEmpty()
  receiverId: number;

  /**
   * 是否已读
   */
  @Column({
    default: false,
  })
  read: boolean;

  @Column({
    name: 'created_by',
  })
  @IsNotEmpty()
  createdBy: number;
}
