import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * 用户
 */
@Entity('user')
export default class UserEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    name: 'last_login_time',
  })
  @IsNotEmpty()
  lastLoginTime: Date;

  /**
   * 0:普通用户
   * 1:管理员
   */
  @Column({
    type: 'enum',
    enum: ['0', '1'],
    name: 'create_commodity',
  })
  createCommodity: string;

  /**
   * 注册地ip
   */
  @Column({
    length: 128,
    name: 'register_ip',
  })
  @IsNotEmpty()
  registerIp: string;

  /**
   * 常登陆地ip
   */
  @Column({
    length: 128,
    default: '',
    name: 'common_ip',
  })
  commonIp: string;

  /**
   * 最后登陆地ip
   */
  @Column({
    length: 128,
    default: '',
    name: 'last_login_ip',
  })
  lastLoginIp: string;

}
