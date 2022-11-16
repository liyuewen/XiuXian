import { Injectable } from '@nestjs/common';
import UserEntity from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class UserDao {
  constructor(private dataSource: DataSource) {}

  async createUser(values: Omit<UserEntity, 'id' | 'last_login_ip'>) {
    const dataSource = this.dataSource;
    try {
      const user = await dataSource
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values(values)
        .execute();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    values: Partial<Omit<UserEntity, 'id' | 'username' | 'password'>>,
  ) {
    const dataSource = this.dataSource;
    try {
      const user = await dataSource
        .createQueryBuilder()
        .update(UserEntity)
        .set(values)
        .where('id = :id', { id })
        .execute();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string) {
    const dataSource = this.dataSource;
    try {
      const user = await dataSource
        .getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .andWhere('user.password = :password', { password })
        .getOne();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserName(name: string) {
    const dataSource = this.dataSource;
    try {
      const user = await dataSource
        .getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :name', { name })
        .getOne();
      return user;
    } catch (error) {
      throw error;
    }
  }
}
