import { Injectable } from '@nestjs/common';
import MailDao from 'src/dao/mail.dao';
import MailEntity from 'src/entity/mail.entity';
import MailThingEntity from 'src/entity/mailThing.entity';
import AssociateThingEntity from 'src/entity/public/associateThing.entity';
import EntityCommon from 'src/utils/entityCommon';

export interface GiftThingOptions extends MailEntity {
  associateThing?: AssociateThingEntity[];
}

@Injectable()
export class GiftThingService {
  constructor(private mailDao: MailDao) {}

  /**
   * 先创建邮件，再创建邮件物品
   * 邮件的id作为邮件物品的mailId
   * 通过循环associateThing，创建邮件物品
   * @param options
   */
  async send(options: GiftThingOptions) {
    const values = await EntityCommon.verifyEntity(new MailEntity(), options);
    const mail = await this.mailDao.createMail(values);
    const associateThing = options.associateThing;
    const mailThing = await this.createMailThing(associateThing, mail);
    return {
      mailId: mail.id,
    };
  }

  async createMailThing(options: AssociateThingEntity[], mail: MailEntity) {
    const map = options.map(async (thing) => {
      const mailThing = await EntityCommon.verifyEntity(new MailThingEntity(), {
        mailId: mail.id,
        thing,
      });
      return await this.mailDao.createMailThing(mailThing);
    });
    return await Promise.all(map);
  }
}
