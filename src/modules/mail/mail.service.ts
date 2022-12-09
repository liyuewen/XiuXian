import { Injectable } from '@nestjs/common';
import HttpError from 'src/common/error/httpError';
import CharacterDao from 'src/dao/character.dao';
import MailDao from 'src/dao/mail.dao';
import MailEntity from 'src/entity/mail.entity';
import MailThingEntity from 'src/entity/mailThing.entity';
import AssociateThingEntity from 'src/entity/public/associateThing.entity';
import EntityCommon from 'src/common/typeorm/entityCommon';
import Utils from 'src/utils/utils';
import AuthRedis from 'src/common/redis/auth';

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

  /**
   * 获取收件人的所有邮件
   * 不传收件人id默认查询自己的
   * @param receiverId 收件人id
   * @param page
   * @param size
   * @returns
   */
  async getMailList(
    receiverId: number,
    page: number,
    size: number,
    token: string,
  ) {
    const user = await AuthRedis.getToken(token);
    const character = await this.characterDao.getCharacterByUserId(user.id);
    const temp = character.findIndex((item) => item.id === Number(receiverId));
    if (temp !== -1) {
      return await this.mailDao.getMailByReceiverId(receiverId, page, size);
    }
    throw new HttpError('收件人不是当前用户');
  }
}
