import { Injectable } from '@nestjs/common';
import HttpError from 'src/common/error/httpError';
import CharacterDao from 'src/dao/character.dao';
import MailDao from 'src/dao/mail.dao';
import MailEntity from 'src/entity/mail.entity';
import MailThingEntity from 'src/entity/mailThing.entity';
import AssociateThingEntity from 'src/entity/public/associateThing.entity';
import EntityCommon from 'src/utils/entityCommon';
import Utils from 'src/utils/utils';

export interface MailOptions extends Partial<MailEntity> {
  title: string;
  createdBy: number;
  characterId: number;
  receiverId: number;
  associateThing?: AssociateThingEntity[];
}

@Injectable()
export class MailService {
  constructor(private mailDao: MailDao, private characterDao: CharacterDao) {}

  /**
   * 先创建邮件，再创建邮件物品
   * 邮件的id作为邮件物品的mailId
   * 通过循环associateThing，创建邮件物品
   * @param options
   */
  async send(options: MailOptions) {
    const character = await this.characterDao.getCharacterById(
      options.characterId,
    );
    if (!Utils.isExists(character)) {
      throw new HttpError('角色不存在');
    }
    // 拒绝接收外部发来的创建者id
    const values = await EntityCommon.verifyEntity(new MailEntity(), options, {
      updateValue: {
        createdBy: options.createdBy,
      },
    });
    const mail = await this.mailDao.createMail(values);
    const associateThing = options.associateThing;
    const mailThing = await this.createMailThing(associateThing, mail);
    return {
      mail,
      mailThing,
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

interface Test {
  a: number;
  b: number;
  c: any;
}

let a: Exclude<keyof Test, Test> = 'a';

console.log(a);
