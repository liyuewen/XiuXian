import { Injectable } from '@nestjs/common';
import Paging from 'src/common/typeorm/paging';
import MailEntity from 'src/entity/mail.entity';
import MailThingEntity from 'src/entity/mailThing.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class MailDao {
  mail = this.dataSource.getRepository(MailEntity);
  mailThing = this.dataSource.getRepository(MailThingEntity);

  constructor(private dataSource: DataSource) {}

  async createMail(values: MailEntity) {
    try {
      const equipment = await this.mail.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 查询接收人所有邮件，并且是未删除的
   * @param receiverId 接收人id
   * @param page 当前页码
   * @param size 每页数据量
   */
  async getMailByReceiverId(receiverId: number, page: number, size: number) {
    try {
      const [data, total] = await this.mail.findAndCount({
        where: { receiverId, deletedAt: null },
        order: { createdAt: 'DESC' },
        ...Paging.handlePagingParams(page, size),
      });
      return Paging.getPagingData(data, page, size, total);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 获取邮件详情
   * @param mailId 
   * @returns 
   */
  async getMailById(mailId: number) {
    try {
      const data = await this.mail.findOne({
        where: { id: mailId },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 获取邮件物品
   * @param mailId 
   * @returns 
   */
  async getMailThingByMailId(mailId: number) {
    try {
      const data = await this.mailThing.find({
        where: { mailId },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createMailThing(values: MailThingEntity) {
    try {
      const equipment = await this.mailThing.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
