import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmpty } from 'class-validator';
import { BasicTimeEntity } from './basic/basic_time.entity';

/**
 * 用户
 */
@Entity('user')
export default class UserEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  username: string;

  @Column()
  @IsEmpty()
  password: string;

  @Column()
  @IsEmpty()
  last_login_time: Date;

  /**
   * 0:普通用户
   * 1:管理员
   */
  @Column({
    type: 'enum',
    enum: ['0', '1'],
  })
  create_commodity: string;

  /**
   * 注册地ip
   */
  @Column({
    length: 128,
  })
  @IsEmpty()
  register_ip: string;

  /**
   * 常登陆地ip
   */
  @Column({
    length: 128,
    default: '',
  })
  common_ip: string;

  /**
   * 最后登陆地ip
   */
  @Column({
    length: 128,
    default: '',
  })
  last_login_ip: string;

  /**
   * 用户角色
   */
  @Column()
  character_id: number;
}
