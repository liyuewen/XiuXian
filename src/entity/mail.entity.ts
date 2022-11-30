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

  @Column()
  content: string;

  /**
   * 发送者id
   */
  @Column({
    name: 'created_by',
  })
  @IsNotEmpty()
  createdBy: number;

  /**
   * 接收者id
   */
  @Column({
    name: 'character_id',
  })
  @IsNotEmpty()
  characterId: number;

  /**
   * 是否已读
   */
  @Column()
  @IsNotEmpty()
  read: boolean;

}
