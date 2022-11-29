import { Injectable } from '@nestjs/common';
import UserEntity from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

export type UserEntityType = Omit<UserEntity, 'id'>;

@Injectable()
export default class UserDao {
  user = this.dataSource.getRepository(UserEntity);

  constructor(private dataSource: DataSource) {}

  async createUser(values: Partial<UserEntityType>) {
    try {
      const user = await this.user.save(values);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: number,
    values: Partial<Omit<UserEntity, 'id' | 'username' | 'password'>>,
  ) {
    try {
      const user = await this.user.update(id, values);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.user.findOne({
        where: { username, password },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserName(name: string) {
    try {
      const user = await this.user.findOne({ where: { username: name } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
