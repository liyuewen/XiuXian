import { Injectable } from '@nestjs/common';
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

  async getMailByCharacterId(characterId: number) {
    try {
      const equipment = await this.mail.findOne({
        where: { characterId },
      });
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
