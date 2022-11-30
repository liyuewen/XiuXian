import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * ip表, 用于记录用户ip,处理常用ip
 * 会在每次socket连接时记录ip,会在每次socket断开时更新ip
 * 每次新连接时，都会插入一条新的记录，不管是否存在都会插入
 */
@Entity('ip_table')
export default class IpTableEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  ip: string;

}
